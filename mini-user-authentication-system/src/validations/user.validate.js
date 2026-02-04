export const validateUser = ({ name, email, age, location, password }) => {
    if( !name || !email || !age || !location || !password ){
        return 'Fill all the fields';
    }
    return null;
}