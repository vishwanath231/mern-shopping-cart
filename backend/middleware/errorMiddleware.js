const errorHandler = (err, req, res, next) => {

    const staCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(staCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

const notFound = (req, res, next) => {

    const error = new Error(`Not Found ${req.originalUrl}`);
    res.status(404)
    next(error)
}


export {
    errorHandler,
    notFound
}