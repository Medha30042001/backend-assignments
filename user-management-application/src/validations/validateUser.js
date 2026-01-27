export const validateUser = ({ name, email, password, age, role }) => {
  if (!name || !email || !password || !age || !role) {
    return "Please fill all the fields";
  }
  return null;
};
