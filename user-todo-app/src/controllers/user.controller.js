import { validateUser } from '../../validations/validateUser.js';
import pool from '../config/db.js'

export const createUser = async (req, res) => {
    const error = validateUser(req.body);
    if(error) return res.status(400).json({error});
    const {name, email, password} = req.body;
    console.log("BODY:", req.body);
    try {
        const result = await pool.query(
            `INSERT INTO users1(name, email, password)
            VALUES ($1, $2, $3) RETURNING *`,
            [name, email, password]
        )

        res.status(201).json({
            message : 'User signed in successfully',
            user : result.rows[0]
        })
    } catch (error) {
        res.status(500).json({error : 'Server Error'});
    }
}

export const deleteUser = async (req, res) => {
    const {userId} = req.params;
    try {
        const result = await pool.query(
            `DELETE FROM users1 WHERE id = $1 RETURNING *`,
            [userId]
        )

        if(result.rowCount === 0){
            return res.status(404).json({error : 'User not found'})
        }

        res.status(200).json({message : 'User deleted'})
    } catch (error) {
        res.status(500).json({error : 'Server Error'});
    }
}