let data;

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

function showData() {
  document.getElementById("project-list").innerHTML = "";

  let filter = document.getElementById("suchbegriff");
  let word = filter.value.toLowerCase();
  console.log(word);
  let copyOfData = data.filter((el) => el.vortitel.toLowerCase().includes(word));

  copyOfData.forEach(function (element, i) {
    document.getElementById("project-list").innerHTML += generateElement(
      element,
      i
    );
  });
}

function generateElement(el, i) {
  let color = "lightgray";
  if (i % 2 == 0) {
    color = "";
  }
  return `<div class="projects-table-row ${color}"><p>${el.vortitel}</p><p>${el.titel}</p><p>${el.rubrik}</p><p>${el.publisher}</p></div>`;
}
