const express = require("express");
const data = require("./json/xml.json");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const { json } = require("express");
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

app.get("/annotation", (req, res) => {
  const fs = require("fs");

  res.send(fs.readFileSync("public/pages/annotation/annotation.html"));
});

app.get("/help", (req, res) => {
  const fs = require("fs");

  res.send(fs.readFileSync("public/pages/help/help.html"));
});

app.get("/segmentierer", (req, res) => {
  const fs = require("fs");

  res.send(fs.readFileSync("public/pages/segmentierer/segmentierer.html"));
});

app.get("/csv", (req, res) => {
  const csv = require("csv-parser");
  const fs = require("fs");
  const results = [];

  fs.createReadStream("csv/Test.csv")
    .pipe(csv({ separator: ";" }))
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log(results);
      res.send(results);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/xml", (req, res) => {
  res.send(getXML());
});

function getFiles(path) {
  let files = [];
  fs.readdirSync(path).forEach((file) => {
    files.push(file);
  });
  return files;
}

function parseXML(file) {
  let obj = {};
  let content = fs.readFileSync("xml/" + file);

  const $ = cheerio.load(content.toString(), {
    normalizeWhitespace: true,
    xmlMode: true,
  });
  const fields = $("fields field");

  fields.each((index, element) => {
    const value = $("value", element);
    obj[element.attribs["name"]] = value.text();
  });
  return obj;
}

function getXML() {
  let resultArray = new Array();
  let files = getFiles("xml");

  files.forEach((element) => {
    resultArray.push(parseXML(element));
  });
  return resultArray;
}