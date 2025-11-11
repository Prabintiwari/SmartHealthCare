import jwt from "jsonwebtoken";

//User authentication middleware

const authUser = async (req, res, next) => {
  try {

      const {token} = req.headers
      if (!token) {
        return res.json({ success: false, message: "Access Denied" });
        
      }
      const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = tokenDecode.id;
      next();
    
  } catch (error) {
    console.log(error);
    // If JWT verification fails, provide a clear message
    if (error.name === 'JsonWebTokenError') {
      return res.json({ success: false, message: "Invalid token. Please login again." });
    }
    if (error.name === 'TokenExpiredError') {
      return res.json({ success: false, message: "Token expired. Please login again." });
    }
    res.json({ success: false, message: error.message });
  }
};

export default authUser;

