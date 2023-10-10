const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/about", (req, res) => {
  res.status(200).send("Hello this is about page!");
});
app.get("/contact", (req, res) => {
  res.status(200).send("Hello this is contact page!");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
