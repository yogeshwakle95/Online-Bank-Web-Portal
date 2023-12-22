const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const user = require("./Routes/userRoute");
const transfer = require("./Routes/TransferRoutes");
const chequebook = require("./Routes/ChequebookRoutes")
const userAccount = require("./Routes/userAccountRoute")
const recepients = require("./Routes/RecepientsRoutes")
const userTransaction = require("./Routes/UserTransactionRoutes")


const cors = require("cors");

const errorMiddleware = require("./middleware/error.js");
//config
dotenv.config({ path: "/config/config.env" });

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/v1", user);
app.use("/api/userTransfer", transfer);
app.use("/api/chequebook", chequebook);
app.use("/api/userTransaction", userTransaction);
app.use("/api/userRecepients", recepients);
app.use("/api/userAccount", userAccount);





//middleware for error

app.use(errorMiddleware);

module.exports = app;
