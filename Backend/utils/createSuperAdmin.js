const bcrypt = require("bcryptjs");
const User = require("../Authentication/models/User");

const createSuperAdmin = async () => {
  try {
    const email = "jaimin@superadmin.gmail.com";
    const password = "SuperAdmin123";

    const existing = await User.findOne({ email });

    if (existing) {
      console.log("Super Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const superAdmin = new User({
      fullName: "Super Admin",
      email,
      password: hashedPassword,
      role: "super-admin", // ✅ FIXED
      vehicleNumber: "SUPERADMIN", // ✅ FIXED
      isVerified: true,
    });

    await superAdmin.save();

    console.log("Super Admin created successfully");
  } catch (err) {
    console.error("SUPER ADMIN ERROR:", err);
  }
};

module.exports = createSuperAdmin;
