require('dotenv').config()
const express = require('express');
const cors = require('cors');
const route = require('./routes');

const app = express();
const listen = process.env.PORT || 3000;


app.use(cors());
app.use(express.json())
app.use(route)


app.listen(listen, () => console.log(`acessando porta ${listen}`));