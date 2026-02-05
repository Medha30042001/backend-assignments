import supabase from "../config/supabase";

export const addTodo = async (req, res) => {
    const {title} = req.body;

    const {data, error} = await supabase
        .from('todos')
        .insert([{title, user_id : req.user.userId}])
        .select();

    if(error){
        return res.status(400).json({error : 'Failed to create todo'});
    }
    res.status(201).json({
        message : 'Todo added',
        todo : data[0]
    })
}

export const getTodos = async (req, res) => {
    const {data} = await supabase
        .from('todos')
        .select()
        .eq('user_id', req.user.userId);

        res.status(200).json(data);
}

export const updateTodo = async (req, res) => {
    const {id} = req.params;
    if(!id) return res.status(400).json({error : 'Id not provided'});

    const {data} = await supabase
        .from('todos')
        .select()
        .eq('id', id)
        .single();

    if(!data || data.user_id !== req.user.userId){
        return res.status(403).json({message : 'Unauthorized access'});
    }

    const {error} = await supabase
        .from('todos')
        .update(req.body)
        .eq('id', id);

    if(error){
        return res.status(500).json({error : error.message});
    }

    res.status(200).json({
        message : 'Todo updated'
    })
}

export const deleteTodo = async (req, res) => {
    const {id} = req.params;
    if(!id) return res.status(400).json({error : 'Id not provided'});

    const {data} = await supabase
        .from('todos')
        .select()
        .eq('id', id)
        .single();

    if(!data || data.user_id !== req.user.userId){
        return res.status(403).json({message : 'Unauthorized access'});
    }

    await supabase.from('todos').delete().eq('id', id);
    
    res.status(200).json({
        message : 'Todo updated'
    })
}