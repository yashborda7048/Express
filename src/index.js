const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

const staticPath = path.join(__dirname, "../public")
// builtin middelware  
app.use(express.static(staticPath));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", (req, res) => {
  res.write("<h1>Hello this is Home page!</h1>");
  res.write("<h1>another text</h1>");
  res.send();
});

app.get("/data", (req, res) => {
  res.send({
    id: 1,
    name: "yash borda",
  });
});

app.get("/json", (req, res) => {
  res.json({
    id: 1,
    name: "yash borda",
  });
});

app.get("/about", (req, res) => {
  res.status(200).send("Hello this is about page!");
});

app.get("/contact", (req, res) => {
  res.status(200).send("Hello this is contact page!");
});

app.get("*", (req, res) => {
  res.status(404).send("Page is not found!!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
