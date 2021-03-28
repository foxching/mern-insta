const express = require("express");
const mongoose = require("mongoose");
const app = express();

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/post"));
app.use("/api/user", require("./routes/api/user"));

app.get("/", (req, res) => {
  res.send("Server is running!!");
});

//mongodb connection
if (process.env.NODE_ENV !== "production") {
  require("dotenv/config");
}

//mongodb
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("Database connected"))
  .catch(error => console.log(error));

//port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
