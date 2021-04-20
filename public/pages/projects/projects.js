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
        r = r.filter(el => el.ID ==word);

        r.forEach(function(element, i){
          document.getElementById("project-list").innerHTML += generateElement(element, i);
        });
        
      }
    };
    xhttp.open("GET", "csv", true);
    xhttp.send();
  }

  function generateElement(el, i){
    let color = "lightgray";
    if (i%2 == 0){
      color = ""
    }
    return `            
    <div class="projects-table-row ${color}">
    <p>${el.Name}</p>
    <p>${el.WordCount}</p>
    <p>${el.Language}</p>
    <p>${el.Date}</p>
    </div>
    `
  }