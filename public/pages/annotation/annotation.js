let currentArticle;
let articleArea;

function loadAnnotationPage() {
  currentArticle = JSON.parse(localStorage.getItem("selectedArticle"));
  articleArea = document.getElementById("article-content");
  console.log(currentArticle);
  renderText();
}

function checkCurrentColor(element) {
  if (document.getElementById("radioColor1").checked) {
    element.classList.remove("color2");
    element.classList.remove("color3");
    element.classList.remove("color4");
    element.classList.remove("color5");
    element.classList.toggle("color1");
  } else if (document.getElementById("radioColor2").checked) {
    element.classList.remove("color1");
    element.classList.remove("color3");
    element.classList.remove("color4");
    element.classList.remove("color5");
    element.classList.toggle("color2");
  } else if (document.getElementById("radioColor3").checked) {
    element.classList.remove("color1");
    element.classList.remove("color2");
    element.classList.remove("color4");
    element.classList.remove("color5");
    element.classList.toggle("color3");
  } else if (document.getElementById("radioColor4").checked) {
    element.classList.remove("color1");
    element.classList.remove("color2");
    element.classList.remove("color3");
    element.classList.remove("color5");
    element.classList.toggle("color4");
  } else if (document.getElementById("radioColor5").checked) {
    element.classList.remove("color1");
    element.classList.remove("color2");
    element.classList.remove("color3");
    element.classList.remove("color4");
    element.classList.toggle("color5");
  }
}

function splitText(txt, symbol) {
  let splText;
  splText = txt.split(symbol);
  return splText;
}

function renderText() {
  let splittetText = splitText(
    currentArticle.text,
    /(?<=\. )|(?<=\! )|(?<=\? )/
  );

  splittetText.forEach((element) => {
    articleArea.innerHTML += `
        <p onclick="checkCurrentColor(this)">${element}</p>
        `;
  });
}
