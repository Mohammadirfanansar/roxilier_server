const express = require("express");
const productRouter = require("./router/productRouter");
const app = express();
require('./dbConnection')
app.use(express.json());
const cors = require("cors");


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use('/product',productRouter)



app.listen(4001, () => {
    console.clear();
    console.log(`Server running on port - 4001}`)
})