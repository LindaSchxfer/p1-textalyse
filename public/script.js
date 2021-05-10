function renderPage() {
  switch (localStorage.getItem("currentPage")) {
    case "projects":
      loadProjects();
      break;
    case "annotation":
      loadAnnotation();
      break;
    case "help":
      loadHelp();
      break;
    default:
      loadHome();
  }
}

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
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
  localStorage.setItem("currentPage", "home");
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
  setTimeout(function () {
    initDom();
  }, 1000);
  localStorage.setItem("currentPage", "projects");
  xhttp.open("GET", "projects", true);
  xhttp.send();
}

function loadAnnotation(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = xhttp.responseText;
    }
  };
  if(id!=undefined){
    localStorage.setItem("selectedArticle", JSON.stringify(filteredData[id]));
  }

  setTimeout(function () {
    loadAnnotationPage();
  }, 1000);
  localStorage.setItem("currentPage", "annotation");
  xhttp.open("GET", "annotation", true);
  xhttp.send();
}

function loadHelp() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("content").innerHTML = xhttp.responseText;
    }
  };
  localStorage.setItem("currentPage", "help");
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
  return `<h1>${el.vortitel}</h1>`;
}

function scrollToFirstStepps() {
  window.scrollTo({
    top: 900,
    behavior: 'smooth'
  });
}

function scrollToVideo() {
  window.scrollTo({
    top: 1400,
    behavior: 'smooth'
  });
}

function scrollToFaq() {
  window.scrollTo({
    top: 1700,
    behavior: 'smooth'
  });
}