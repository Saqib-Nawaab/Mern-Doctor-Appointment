import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    // const token = req.headers.atoken || req.headers.aToken;

    if (!dtoken) {
      return res.json({ success: false, message: "Please login first" });
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.docId = decoded.id;

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
