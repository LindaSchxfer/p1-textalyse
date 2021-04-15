const express = require("express");
const app = express();
const port = 3000;
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/csvtest", (req, res) => {
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
