export const validateUser = ({ name, email, password }) => {
  if (!name || !email || !password) {
    return "Please fill up the missing fields";
  }
  return null;
};