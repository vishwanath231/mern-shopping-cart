import React from 'react'

const Message = ({ error,  msg }) => {
    return (
        <div>

            {
                error ? (
                    <div className="p-3 my-4 text-sm text-center my-2 text-red-700 bg-red-100 rounded" role="alert">
                        <span className="font-medium ">{msg}</span> 
                    </div>
                ) : (
                    <div class="p-3 my-4 text-sm text-green-700 bg-green-100 rounded" role="alert">
                        <span class="font-medium">{msg}</span> 
                    </div>
                )
            }
        </div>
    )
}

export default Message;
