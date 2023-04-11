const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());

console.log("Projeto Rodando!!!");

// prerarar para responder ao GET
app.get('/', (req, res) => {
    res.send('✅ Servidor está on');
});

const port = 3000;

app.listen(port, () => {
    console.log('API run in port '+port);
    console.log(`Test: http://localhost:${port}`);
});

// Rotas
app.post('/api/authenticate', (req, res) => {
    let response = req.body

    // Validation
    if(!response.username || !response.password)
    {
        return res.json({ 
            status: "Error" ,
            message: "Incomplete data or we receive more data"
        });
    }

    let user = {
        username: "gustavo",
        password: "12345678"
    }

    if(response.username == user.username && response.password == user.password)
    {
        // Generate JWT TOKEN
        const token = jwt.sign({ response }, 'chave-secreta', { expiresIn: '1h' })

        // Return success
        return res.json({ 
            status: "Success" ,
            message: "Success to make login",
            token: token
        });
    }
    else
    {
        return res.json({ 
            status: "Error" ,
            message: "User not found"
        });
    }

});