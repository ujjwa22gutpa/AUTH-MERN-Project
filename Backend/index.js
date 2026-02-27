require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./Models/UserModel.js");
 require("./Models/dbModel.js");
const AuthRouter = require("./Routes/AuthRouter.js")




const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(cors())

app.post('/login',AuthRouter); 
app.post('/signup',AuthRouter);

app.get("/", (req, res) => {
  res.send("hello!!!");
});  


app.listen(PORT, (req, res) => {
  console.log(`server is runnig on ${PORT}`);
});
