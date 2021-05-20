let data;
let filteredData;
let searchMode;
let filter;
let wordLength;
let radioZero;
let radioOne;
let radioTwo;
let radioThree;
let radioFour;

let index = 0;

function initDom() {
  filter = document.getElementById("suchbegriff");
  filter.addEventListener("change", function () {
    changeFilterWord(this.value);
  });
  radioZero = document.getElementById("radio0");
  radioZero.addEventListener("change", function () {
    changeSearchMode("*");
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

  lengthZero = document.getElementById("length0");
  lengthZero.addEventListener("change", function () {
    changeWordMode("*");
  });
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
  changeFilterWord(localStorage.getItem("filterWord"));
  showData();
}

function changeFilterWord(newFilterWord) {
  localStorage.setItem("filterWord", newFilterWord);

  filter.value = newFilterWord;
}

function changeSearchMode(mode) {
  switch (mode) {
    case "vortitel":
      localStorage.setItem("searchMode", "vortitel");
      searchMode = localStorage.getItem("searchMode");
      radioOne.checked = true;
      break;
    case "titel":
      localStorage.setItem("searchMode", "titel");
      searchMode = localStorage.getItem("searchMode");
      radioTwo.checked = true;
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
      localStorage.setItem("searchMode", "*");
      searchMode = localStorage.getItem("searchMode");
      radioZero.checked = true;
  }
}

function changeWordMode(mode) {
  switch (mode) {
    case "500":
      localStorage.setItem("wordLength", "500");
      wordLength = localStorage.getItem("wordLength");
      lengthOne.checked = true;
      break;
    case "1500":
      localStorage.setItem("wordLength", "1500");
      wordLength = localStorage.getItem("wordLength");
      lengthTwo.checked = true;
      break;
    case "2500":
      localStorage.setItem("wordLength", "2500");
      searchwordLengthMode = localStorage.getItem("wordLength");
      lengthThree.checked = true;
      break;
    case "more":
      localStorage.setItem("wordLength", "more");
      wordLength = localStorage.getItem("wordLength");
      lengthFour.checked = true;
      break;
    default:
      localStorage.setItem("wordLength", "*");
      wordLength = localStorage.getItem("wordLength");
      lengthZero.checked = true;
  }
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
  filteredData = [];
  index = 0;
  document.getElementById("project-list").innerHTML = "";
  let word = localStorage.getItem("filterWord").toLowerCase();
  wordLength = localStorage.getItem("wordLength");
  switch (searchMode) {
    case "vortitel":
      filteredData = data.filter((el) =>
        el.vortitel.toLowerCase().includes(word)
      );
      break;
    case "titel":
      filteredData = data.filter((el) => el.titel.toLowerCase().includes(word));
      break;
    case "abstract":
      filteredData = data.filter((el) =>
        el.abstract.toLowerCase().includes(word)
      );
      break;
    case "text":
      filteredData = data.filter((el) => el.text.toLowerCase().includes(word));
      break;
    default:
      //filteredData = data.filter((el) => el.titel.toLowerCase().includes(word));

      data.forEach(function (el) {
        if (
          el.vortitel.toLowerCase().includes(word) ||
          el.titel.toLowerCase().includes(word) ||
          el.abstract.toLowerCase().includes(word) ||
          el.text.toLowerCase().includes(word)
        ) {
          filteredData.push(el);
        }
      });
  }

  filteredData.forEach(function (element, i) {
    let splittedText = element.text.split(" ");
    let wordCount = splittedText.length.toString();

    switch (wordLength) {
      case "500":
        if (parseInt(wordCount) <= 500) {
          document.getElementById("project-list").innerHTML += generateElement(
            element,
            i,
            wordCount
          );
        }
        break;
      case "1500":
        if (parseInt(wordCount) > 500 && parseInt(wordCount) <= 1500) {
          document.getElementById("project-list").innerHTML += generateElement(
            element,
            i,
            wordCount
          );
        }
        break;
      case "2500":
        if (parseInt(wordCount) > 1500 && parseInt(wordCount) <= 2500) {
          document.getElementById("project-list").innerHTML += generateElement(
            element,
            i,
            wordCount
          );
        }
        break;
      case "more":
        if (parseInt(wordCount) >= 2500) {
          document.getElementById("project-list").innerHTML += generateElement(
            element,
            i,
            wordCount
          );
        }
        break;
      default:
        document.getElementById("project-list").innerHTML += generateElement(
          element,
          i,
          wordCount
        );
    }
  });
}

function generateElement(el, i, length) {
  let color = "lightgray";
  index++;
  if (index % 2 == 0) {
    color = "";
  }
  return `<div class="projects-table-row ${color}" onclick="loadAnnotation(${i});"><p>${el.vortitel}</p><p>${el.titel}</p><p>${el.rubrik}</p><p>${el.publisher}</p><p>${length}</p></div>`;
}
