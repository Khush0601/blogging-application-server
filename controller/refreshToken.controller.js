const jwt = require("jsonwebtoken");
const { User } = require("../model/user.model");
const { generateAccessToken } = require("../utils/jwt");

exports.refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookie.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: "Refresh token not valid" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Token expired" });
        }

        const newAccessToken = generateAccessToken(user._id.toString());

        return res.status(200).json({
          accessToken: newAccessToken
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
