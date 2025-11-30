import jwt from 'jsonwebtoken';

export const authenticateDonor = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type !== 'donor') {
      return res.status(403).json({ error: 'Access denied' });
    }
    req.userId = decoded.id;
    req.userType = 'donor';
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const authenticateNGO = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type !== 'ngo') {
      return res.status(403).json({ error: 'Access denied' });
    }
    req.userId = decoded.id;
    req.userType = 'ngo';
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
