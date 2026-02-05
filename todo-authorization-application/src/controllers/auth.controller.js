import supabase from "../config/supabase.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signupUser = async (req , res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({message : 'All fields are required'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const {data, error} = await supabase        
        .from('users3')
        .insert([{name, email, password : hashedPassword}])
        .select();
    
    if(error){
        return res.status(500).json({error : error.message});
    }

    res.status(201).json({
        message : 'User registered',
        user : {id : data[0].id, email : data[0].email}
    });
}

export const loginUser = async  (req, res) => {
    const {email, password} = req.body;

    const {data, error} = await supabase
        .from('users3')
        .select('*')
        .eq('email', email)
        .single();

    if(error || !data){
        return res.status(401).json({message : 'Invalid credentials'})
    }
    const isMatch = await bcrypt.compare(password, data.password);
    if(!isMatch){
        return res.status(401).json({message : 'Invalid credentials'});
    }
    const token = jwt.sign(
        {userId : data.id, email:data.email},
        process.env.JWT_SECRET,
        {expiresIn : '1h'}
    );

    return res.status(200).json({
        message : 'Login successful',
        token
    })
}

export const deleteUser = async (req, res) => {
    const {userId} = req.params;
    if(!userId) return res.status(400).json({error : 'No userid provided'});

    const {data, error} = await supabase
        .from('users3')
        .delete()
        .select('name, email');

    if(error){
        return res.status(500).json({error : error.message});
    }

    if(!data) return res.status(404).json({error : 'User not found'});

    res.status(200).json({
        message : 'User deleted'
    })
}