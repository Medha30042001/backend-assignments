import supabase from "../config/supabase.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signupUser = async (req , res) => {
    const {name, email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const {data, error} = await supabase        
        .from('users3')
        .insert([{name, email, password : hashedPassword}])
        .select('name, email')
        .single();
    
    if(error){
        if(error.code === '23505'){
            return res.status(409).json({error : 'Email already exists'});
        }
        return res.status(500).json({error : error.message});
    }

    res.status(201).json({
        message : 'User registered',
        user : data
    });
}

export const loginUser = async  (req, res) => {

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