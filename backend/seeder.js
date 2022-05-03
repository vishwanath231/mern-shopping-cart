import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js'
import products from './data/products.js'
import User from './model/userModel.js'
import Product from './model/productModel.js'
import Order from './model/orderModel.js'
import connectDB from './config/db.js';


dotenv.config();

connectDB();


const importData = async () => {

    try {
        
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();


        const createUsers = await User.insertMany(users);

        const adminUser = createUsers[0]._id;

        const sampleProducts = products.map(product => {
            return {
                ...product,
                user: adminUser
            }
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse)
        process.exit()

    } catch (err) {
        
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}


const destroyData = async () => {

    try {
        
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log(`Data Destroyed!`.red.inverse)
        process.exit()

    } catch (err) {
        
        console.log(`${err}`.red.inverse);
        process.exit(1)
    }
}


if (process.argv[2] === '-d') {
    destroyData();
}else{
    importData();
}