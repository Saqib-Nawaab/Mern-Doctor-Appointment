import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const { token } = req.headers;
    // const token = req.headers.atoken || req.headers.aToken;

    if (!token) {
      return res.json({ success: "false", message: "Please login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.json({ success: "false", message: error.message });
  }
};

export default authUser;
