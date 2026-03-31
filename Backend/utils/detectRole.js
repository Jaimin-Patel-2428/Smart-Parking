const detectRole = (email) => {
  if (email.endsWith("@superadmin.gmail.com")) return "super-admin";

  if (email.endsWith("@admin.gmail.com")) return "admin";

  return "user";
};

module.exports = detectRole;
