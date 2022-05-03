import React from 'react'

const Error = ({ msg }) => {
    return (
        <div>
            <div className="p-4 mb-4 text-sm text-center my-2 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                <span className="font-medium ">{msg}</span> 
            </div>
        </div>
    )
}

export default Error