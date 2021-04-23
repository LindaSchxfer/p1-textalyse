function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("demo").innerHTML += this.responseText;
      let r = JSON.parse(this.responseText);
      let filter = document.getElementById("filter");
      let word = filter.value;
      console.log(word);
      const d = r.filter((el) => el.ID == word);

      d.forEach((element) => {
        document.getElementById("demo").innerHTML += generateElement(element);
      });
    }
  };
  xhttp.open("GET", "com", true);
  xhttp.send();
}

function loadHome() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("GET", "home", true);
  xhttp.send();
}

function loadProjects() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("GET", "projects", true);
  xhttp.send();
}

function loadUser() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = xhttp.responseText;
    }
  };

  xhttp.open("GET", "user", true);
  xhttp.send();
}

function loadHelp() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = xhttp.responseText;
    }
  };

  xhttp.open("GET", "help", true);
  xhttp.send();
}

function loadSegmentierer() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = xhttp.responseText;
    }
  };
  xhttp.open("GET", "segmentierer", true);
  xhttp.send();
}

function generateElement(el) {
  return `<h1>${
    el.vortitel
  }</h1>`;
}
