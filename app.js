const express = require("express");
const app = express();
app.use(express.json());


// importamos el router de libros
const librosRouter = require("./routes/libros");
// importamos el middleware errror Handler
const errorHandler = require("./middlewares/errorHandler");


app.use("/libros",librosRouter);
app.use(errorHandler)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});