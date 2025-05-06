//const sessionIDToUserMap = new Map(); // statefull Auth
const jwt = require("jsonwebtoken");
const secret = "Pass@123";
function setUser(user) {
  // sessionIDToUserMap.set(id, user); // statefull Auth

  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role:user.role,
    },
    secret
  );
}

function getUser(token) {
  // return sessionIDToUserMap.get(id);
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
