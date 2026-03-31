const User = require("../Authentication/models/User");

const generateUserId = async () => {
  const count = await User.countDocuments();
  const id = count + 1;

  return `USR-2026-${id.toString().padStart(4, "0")}`;
};

module.exports = generateUserId;
