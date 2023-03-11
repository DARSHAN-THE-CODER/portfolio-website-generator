const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// CORS
app.use(cors());

const defaultRouter = require('./routes/index')

app.get("/", (req, res) => {
    res.json({ message: "Server running" });
});

app.use('/api/v1',defaultRouter)

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});