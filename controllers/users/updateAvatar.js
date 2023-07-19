const User = require("../../models/user");
const cloudinary = require("cloudinary").v2;

const updateAvatar = async (req, res) => {
  const { _id: id } = req.user;
  const { name } = req.body;
  const avatar = req.file;
  console.log(avatar);
  if (!name && !avatar) {
    return res.status(422).json({
      code: 422,
      message: "Missing name and avatar in request",
    });
  }

  const user = await User.findById(id);
  console.log(user);

  if (!user) {
    return res.status(404).json({
      code: 404,
      message: "User not found",
    });
  }

  if (avatar) {
    const { secure_url: avatarURL } = await cloudinary.uploader.upload(
      avatar.path
    );
    user.avatarURL = avatarURL;
    console.log(avatarURL);
  }

  if (name) {
    user.name = name;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    avatarURL: updatedUser.avatarURL,
  });
};
module.exports = updateAvatar;
