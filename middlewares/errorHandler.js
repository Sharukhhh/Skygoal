class CustomError extends Error {
    constructor(statusCode , message){
        super(message);
        this.statusCode = statusCode;
    }
};


export const errorHandler = async (err , req, res , next) => {

    console.error(err, 'initial logged error');

    let statusCode = 500;
    let message = 'Internal Server Error'; 

    if(err instanceof CustomError) {
        statusCode = err.statusCode;
        message = err.message;

    } else if (err.name === 'ValidationError') {  
        statusCode = 400;
        message = err.message

    } else if (err.name === 'JsonWebTokenError') { 
        statusCode = 401;
        message = 'Unauthorized : Invalid Token'

    } else if (err.name === 'TokenExpiredError') { 
        statusCode = 401;
        message = 'Unauthorized : Token Expired'

    } else if(err.name === 'MongoNetworkError') {
        message = err.message
    }

    res.status(statusCode).json({error : message});

}