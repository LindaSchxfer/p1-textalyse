let data;
let searchMode;
let filter;
let wordLength;
let radioOne;
let radioTwo;
let radioThree;
let radioFour;

function initDom() {
  filter = document.getElementById("suchbegriff");
  filter.addEventListener("change", function () {
    changeFilterWord(this.value);
  });
  radioOne = document.getElementById("radio1");
  radioOne.addEventListener("change", function () {
    changeSearchMode("vortitel");
  });
  radioTwo = document.getElementById("radio2");
  radioTwo.addEventListener("change", function () {
    changeSearchMode("titel");
  });
  radioThree = document.getElementById("radio3");
  radioThree.addEventListener("change", function () {
    changeSearchMode("abstract");
  });
  radioFour = document.getElementById("radio4");
  radioFour.addEventListener("change", function () {
    changeSearchMode("text");
  });
  filter.value = localStorage.getItem("filterWord");

  lengthOne = document.getElementById("length1");
  lengthOne.addEventListener("change", function () {
    changeWordMode("500");
  });
  lengthTwo = document.getElementById("length2");
  lengthTwo.addEventListener("change", function () {
    changeWordMode("1500");
  });
  lengthThree = document.getElementById("length3");
  lengthThree.addEventListener("change", function () {
    changeWordMode("2500");
  });
  lengthFour = document.getElementById("length4");
  lengthFour.addEventListener("change", function () {
    changeWordMode("more");
  });
  changeWordMode(localStorage.getItem("wordLength"));
  changeSearchMode(localStorage.getItem("searchMode"));
  showData();
}

function changeFilterWord(newFilterWord) {
  localStorage.setItem("filterWord", newFilterWord);

  filter.value = localStorage.getItem("filterWord");
}

function changeSearchMode(mode) {
  switch (mode) {
    case "vortitel":
      localStorage.setItem("searchMode", "vortitel");
      searchMode = localStorage.getItem("searchMode");
      radioOne.checked = true;
      break;
    case "abstract":
      localStorage.setItem("searchMode", "abstract");
      searchMode = localStorage.getItem("searchMode");
      radioThree.checked = true;
      break;
    case "text":
      localStorage.setItem("searchMode", "text");
      searchMode = localStorage.getItem("searchMode");
      radioFour.checked = true;
      break;
    default:
      localStorage.setItem("searchMode", "titel");
      searchMode = localStorage.getItem("searchMode");
      radioTwo.checked = true;
  }
}

function changeWordMode(mode) {
  switch (mode) {
    case "1500":
      localStorage.setItem("wordLength", "1500");
      searchMode = localStorage.getItem("wordLength");
      lengthTwo.checked = true;
      break;
    case "2500":
      localStorage.setItem("wordLength", "2500");
      searchMode = localStorage.getItem("wordLength");
      lengthThree.checked = true;
      break;
    case "more":
      localStorage.setItem("wordLength", "more");
      searchMode = localStorage.getItem("wordLength");
      lengthFour.checked = true;
      break;
    default:
      localStorage.setItem("wordLength", "500");
      searchMode = localStorage.getItem("wordLength");
      lengthOne.checked = true;
  }
}

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
});

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
  let word = localStorage.getItem("filterWord").toLowerCase();
  wordLength = localStorage.getItem("wordLength");
  let copyOfData;
  switch (searchMode) {
    case "vortitel":
      copyOfData = data.filter((el) =>
        el.vortitel.toLowerCase().includes(word)
      );
      break;
    case "abstract":
      copyOfData = data.filter((el) =>
        el.abstract.toLowerCase().includes(word)
      );
      break;
    case "text":
      copyOfData = data.filter((el) => el.text.toLowerCase().includes(word));
    default:
      copyOfData = data.filter((el) => el.titel.toLowerCase().includes(word));
  }

  copyOfData.forEach(function (element, i) {
    let splittedText = element.text.split(" ");
    let wordCount = splittedText.length.toString();

    switch (wordLength) {
      case "1500":
        if (parseInt(wordCount) > 500 && parseInt(wordCount) <= 1500) {
          document.getElementById("project-list").innerHTML += generateElement(
            element,
            i,
            wordCount
          );
          break;
        }
        break;
      case "2500":
        if (parseInt(wordCount) > 1500 && parseInt(wordCount) <= 2500) {
          document.getElementById("project-list").innerHTML += generateElement(
            element,
            i,
            wordCount
          );
          break;
        }
        break;
      case "more":
        if (parseInt(wordCount) >= 2500) {
          document.getElementById("project-list").innerHTML += generateElement(
            element,
            i,
            wordCount
          );
          break;
        }break;
      default:
        if (parseInt(wordCount) <= 500) {
          document.getElementById("project-list").innerHTML += generateElement(
            element,
            i,
            wordCount
          );
          break;
        }
    }
  });
}

function generateElement(el, i, length) {
  let color = "lightgray";

  if (i % 2 == 0) {
    color = "";
  }
  return `<div class="projects-table-row ${color}" onclick="loadAnnotation(${i});"><p>${el.vortitel}</p><p>${el.titel}</p><p>${el.rubrik}</p><p>${el.publisher}</p><p>${length}</p></div>`;
}
