const express = require("express");
const app = express();
const port = 3000;
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", (req, res) => {
  const fs = require("fs");
  
  res.send(fs.readFileSync("public/pages/home/home.html"));
});

app.get("/projects", (req, res) => {
  const fs = require("fs");
  
  res.send(fs.readFileSync("public/pages/projects/projects.html"));
});

app.get("/user", (req, res) => {
  const fs = require("fs");
  
  res.send(fs.readFileSync("public/pages/user/user.html"));
});

app.get("/help", (req, res) => {
  const fs = require("fs");
  
  res.send(fs.readFileSync("public/pages/help/help.html"));
});

app.get("/csv", (req, res) => {
  const csv = require("csv-parser");
  const fs = require("fs");
  const results = [];

  fs.createReadStream("csv/Test.csv")
    .pipe(csv({ separator: ';' }))
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log(results);
      res.send(results);
      
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]

    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
