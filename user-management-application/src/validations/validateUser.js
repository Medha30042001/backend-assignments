export const validateUser = ({ name, email, password, age, role }) => {
  if (!name?.trim()) {
    return "Name is required";
  }

  if(!email.includes('@gmail.com')){
    return "Email must be the right format"
  }

  if(!password || password.length < 8){
    return "Password must be at least 8 characters"
  }

  if(age !== undefined && age < 18){
    return "Age must be at least 18"
  }
  return null;
};
