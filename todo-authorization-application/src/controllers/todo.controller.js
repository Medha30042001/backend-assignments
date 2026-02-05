import supabase from "../config/supabase";

export const addTodo = async (req, res) => {
    const {title, userId} = req.body;

    const {data, error} = await supabase
        .from('todos')
        .insert([{title, userId}])
        .select()
        .single();

    if(error){
        return res.status(500).json({error : error.message});
    }
    res.status(201).json({
        message : 'Todo added',
        todo : data
    })
}

export const getTodos = async (req, res) => {
    
}

export const updateTodo = async (req, res) => {
    const {id} = req.params;
    if(!id) return res.status(400).json({error : 'Id not provided'});

    const updates = req.body;
    const {data, error} = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if(error){
        return res.status(500).json({error : error.message});
    }

    if(!data) return res.status(404).json({error : 'Todo not found'});

    res.status(201).json({
        message : 'Todo updated',
        todo : data
    })
}

export const deleteTodo = async (req, res) => {
    const {id} = req.params;
    if(!id) return res.status(400).json({error : 'Id not provided'});

    const {data, error} = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .select()
        .single();

    if(error){
        return res.status(500).json({error : error.message});
    }

    if(!data) return res.status(404).json({error : 'Todo not found'});
    
    res.status(200).json({
        message : 'Todo updated'
    })
}