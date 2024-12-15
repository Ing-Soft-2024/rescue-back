import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'secret';
  console.log("------AUTH MIDDLEWARE: AUTHENTICATE TOKEN------")
  try {
    // Get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    console.log('Token:', token); // Add logging

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.log('Token verification error:', err); // Add logging
        return res.status(403).json({ message: 'Invalid or expired token' });
      }

      // Add user info to request object
      req.user = user;
      next();
    });
  } catch (error) {
    console.log('Authentication error:', error); // Add logging
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
