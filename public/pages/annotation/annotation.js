let currentArticle;
let articleArea;

function loadAnnotationPage() {
  currentArticle = JSON.parse(localStorage.getItem("selectedArticle"));
  articleArea = document.getElementById("article-content");
  console.log(currentArticle);
  renderText();
}

function checkCurrentColor(element) {
    //removeColor(element);
  //Check Radios
  if (document.getElementById("radioGreen").checked) {
    element.classList.remove("blue");
    element.classList.remove("red");
    element.classList.remove("pink");
    element.classList.remove("purple");
    element.classList.toggle("green");
  } else if (document.getElementById("radioBlue").checked) {
    element.classList.remove("green");
    element.classList.remove("red");
    element.classList.remove("pink");
    element.classList.remove("purple");
    element.classList.toggle("blue");
  } else if (document.getElementById("radioRed").checked) {
    element.classList.remove("green");
    element.classList.remove("blue");
    element.classList.remove("pink");
    element.classList.remove("purple");
    element.classList.toggle("red");
  } else if (document.getElementById("radioPink").checked) {
    element.classList.remove("green");
    element.classList.remove("blue");
    element.classList.remove("red");
    element.classList.remove("purple");
    element.classList.toggle("pink");
  } else if (document.getElementById("radioPurple").checked) {
    element.classList.remove("green");
    element.classList.remove("blue");
    element.classList.remove("red");
    element.classList.remove("pink");
    element.classList.toggle("purple");
  }
}

function removeColor(element){
    element.classList.remove("green");
    element.classList.remove("blue");
    element.classList.remove("red");
    element.classList.remove("pink");
    element.classList.remove("purple");
}

function splitText(txt, symbol) {
  let splText;
  splText = txt.split(symbol);
  return splText;
}

function renderText() {
  let splittetText = splitText(currentArticle.text, /(?<=\.)|(?<=\!)|(?<=\?)/);

  splittetText.forEach((element) => {
    articleArea.innerHTML += `
        <p onclick="checkCurrentColor(this)">${element + ""}</p>
        `;
  });
}
