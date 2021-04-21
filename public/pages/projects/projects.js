let data = [];

function loadCSV() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("project-list").innerHTML = "";
      //document.getElementById("demo").innerHTML += this.responseText;
      let r = JSON.parse(this.responseText);
      let filter = document.getElementById("filter");
      let word = filter.value;
      console.log(word);
      r = r.filter((el) => el.ID == word);

      r.forEach(function (element, i) {
        document.getElementById("project-list").innerHTML += generateElement(
          element,
          i
        );
      });
    }
  };
  xhttp.open("GET", "csv", true);
  xhttp.send();
}

function loadData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("project-list").innerHTML = "";
      //document.getElementById("demo").innerHTML += this.responseText;
      data = JSON.parse(this.responseText);
      //let filter = document.getElementById("filter");
      //let word = filter.value;
      //console.log(word);
      //r = r.filter(el => el.v == word);
    }
  };
  xhttp.open("GET", "xml", true);
  xhttp.send();
}

function generateElement(el, i) {
  let color = "lightgray";
  if (i % 2 == 0) {
    color = "";
  }
  return `<div class="projects-table-row ${color}"><h1>${el.vortitel}</h1></div>`;
}

function initializeData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("project-list").innerHTML = "";
      //document.getElementById("demo").innerHTML += this.responseText;
      data = JSON.parse(this.responseText);
    }
  };

  xhttp.open("GET", "xml", true);
}

function showData() {
  document.getElementById("project-list").innerHTML = "";

  let filter = document.getElementById("filter");
  let word = filter.value;
  console.log(word);
  let copyOfData = data.filter((el) => el.vortitel.includes(word));

  copyOfData.forEach(function (element, i) {
    document.getElementById("project-list").innerHTML += generateElement(
      element,
      i
    );
  });
}
