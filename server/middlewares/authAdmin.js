import jwt from "jsonwebtoken";

const authAdmin = (req, res, next) => {
  try {
    // const { atoken } = req.headers;
    const atoken = req.headers.atoken || req.headers.aToken;

    if (!atoken) {
      return res.json({ success: "false", message: "Please login first" });
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: "false", message: "Please login first" });
    }

    next();
  } catch (error) {
    return res.json({ success: "false", message: error.message });
  }
};

export default authAdmin;
