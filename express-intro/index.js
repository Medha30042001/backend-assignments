import express from 'express'

const app = express();

const PORT= 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/home', (req, res) => {
    res.json({message : 'This is home page'});
})

app.get('/contactus', (req, res) => {
    res.json({message:'Contact us at contact@contact.com'});
})

app.get('/about', (req, res) => {
    res.json({message: 'Welcome to About page!'})
})

app.get('/other', (req, res) => {
    res.send('Hello there!it ad');
})
