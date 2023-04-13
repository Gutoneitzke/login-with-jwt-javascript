const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());

const privateKey = '188765'

// Prepare default route
app.get('/', (req, res) => {
    res.send('✅ Server on');
});

const port = 3000;

app.listen(port, () => {
    console.log('API run in port '+port);
    console.log(`Test: http://localhost:${port}`);
});

// Rotas
app.post('/api/test', (req, res) => {
    // JWT Validation
    const token = req.headers.authorization
    if(!token) 
    {
        return res.status(401).send({ auth: false, message: 'Token não informado.' })
    }
    jwt.verify(token, privateKey, (err, decoded) => { 
        if(err) 
        {
            return res.status(500).send({ auth: false, message: 'Invalid Token.' })
        }
        res.status(200).send({ auth: true, message: 'Valid Token.' })
    }); 
})

app.post('/api/authenticate', (req, res) => {
    let response = req.body

    // Validation
    if(!response.username || !response.password)
    {
        return res.json({ 
            status: "Error" ,
            message: "Incomplete data or we receive more data"
        })
    }

    let user = {
        username: "gustavo",
        password: "12345678"
    }

    if(response.username == user.username && response.password == user.password)
    {
        // Generate JWT TOKEN
        const token = jwt.sign({ response }, privateKey, { expiresIn: '1h' })

        // Return success
        return res.json({ 
            status: "Success" ,
            message: "Success to make login - Now you can click in Test JWT Token Button",
            token: token
        })
    }
    else
    {
        return res.json({ 
            status: "Error" ,
            message: "User not found"
        })
    }

});