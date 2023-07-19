const bcrypt = require("bcrypt");
// const gravatar = require("gravatar");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const RequestError = require("../../helpers/RequestError");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  // const avatarURL = gravatar.url(email);
  await User.create({
    ...req.body,
    password: hashPassword,
    // avatarURL,
  });
  const { _id } = await User.findOne({ email });

  const payload = {
    id: _id,
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "24h",
  });

  const newUser = await User.findByIdAndUpdate(
    _id,
    { token },
    {
      new: true,
    }
  );

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      token: newUser.token,
      // avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = register;
