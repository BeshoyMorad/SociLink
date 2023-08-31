import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied" });

    if (token.startWith("Bearer "))
      token = token.slice(7, token.length).trimLeft();

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
