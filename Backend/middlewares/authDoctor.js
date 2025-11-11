import jwt from "jsonwebtoken";

//Doctor authentication middleware

const authDoctor = async (req, res, next) => {
  try {

      const {token} = req.headers
      if (!token) {
        return res.json({ success: false, message: "Access Denied" });
        
      }
      const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
      req.body.docId = tokenDecode.id;
      next();
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
