const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    console.log('🔍 Verifying token:', token.substring(0, 20) + '...');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Decoded user:', decoded.id, decoded.role);
    
    req.user = { id: decoded.id, role: decoded.role };
    
    next();

  } catch (error) {
    console.error('❌ JWT Verify error:', error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
