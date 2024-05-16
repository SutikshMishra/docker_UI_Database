const express = require('express');
const app = express()

const PORT = process.env.PORT || 4000;
app.set("view engine", "ejs");
app.get("/",(req, res) => {
    res.render("Login_Signup");
});

app.get("/pages/Login_Signup",(req, res) => {
    res.render("Login_Signup");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});