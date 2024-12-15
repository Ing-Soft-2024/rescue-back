// src/middleware/error.middleware.js
export const errorHandler = (err, req, res, next) => {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token has expired',
        code: 'TOKEN_EXPIRED'
      });
    }
  
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Invalid token',
        code: 'INVALID_TOKEN'
      });
    }
  
    // Handle other errors
    return res.status(500).json({
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  };
  
