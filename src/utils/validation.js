const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName) {
    throw new Error("Name is required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "age", "emailId", "photoUrl", "about", "skills","gender"];
  const updates = Object.keys(req.body);
  const isEditAllowed = updates.every((update) =>
    allowedEditFields.includes(update)
  );
  return isEditAllowed;
}
module.exports = { validateSignUpData, validateEditProfileData };
