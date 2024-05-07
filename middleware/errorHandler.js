const { constants } = require('../constants.js');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : constants.SERVER_ERROR;

    let errorResponse = {
        message: err.message,
        stack: err.stack
      };

    switch(statusCode)
    {
        case constants.VALIDATION_ERROR:
            errorResponse.title = 'Validation Error';
            break;
        
        case constants.UNAUTHORIZED:
            errorResponse.title = 'Unauthorized';
            break;
        
        case constants.FORBIDDEN:
            errorResponse.title = 'Forbidden';
            break;
        
        case constants.NOT_FOUND:
            errorResponse.title = 'Not Found';
            break;
        
        case constants.SERVER_ERROR:
            errorResponse.title = 'Server Error';
            break;
        
        default:
            errorResponse.title = 'Internal Server Error';
            break;
    }
}

module.exports = errorHandler;