
export const validateTodo = ({title, description, userId}) => {
    if(!title || !description || !userId ){
        return 'Please fill up the missing fields'
    }
    return null
}