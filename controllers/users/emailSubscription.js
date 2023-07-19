const { RequestError, sendEmail } = require("../../helpers");
const User = require("../../models/user");

const emailSubscription = async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw RequestError(401, "Email not found");
  }

  const subscriptionWelcome = {
    to: email,
    subject: "So Yammy subscription confirmation",
    html: `<b>Dear ${user.name}! Welcome to So Yammy subscription!</b>`,
  };

  await sendEmail(subscriptionWelcome);

  res.json({
    message: "Subscription email sent successfully",
  });
};

module.exports = emailSubscription;
