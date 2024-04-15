function sparaTräningspass() {

    let övningsNamn = []
    let vikter = []
    let datum = new Date()
    let children = document.getElementById("övningar").children
    for (i = 0; i < children.length; i++) {
      if (!children[i].children[2].checked) {
        continue
      }
      övningsNamn.push(children[i].children[0].innerHTML)
      vikter.push(children[i].children[1].value)
      let data = JSON.parse(localStorage.getItem("övningar"))
      data[children[i].children[0].innerHTML] = children[i].children[1].value
      localStorage.setItem("övningar",JSON.stringify(data))
      }


    let träningspassJSON = {datum:{dag: datum.getDate(),månad: datum.getMonth() + 1,år: datum.getFullYear()}, övningar:{namn:övningsNamn, vikt:vikter}}


    var storedValue = JSON.parse(localStorage.getItem("träningspass"));
    if (storedValue != null) {
      storedValue.push(träningspassJSON);
    } else {
      storedValue = new Array(träningspassJSON);
    }
    // Save the name value to localStorage
    localStorage.setItem("träningspass", JSON.stringify(storedValue));

    // Log a success message (for demonstration purposes)
    console.log("Saved locally!");
    uppdateraVikter()
  }

function inputChange(event) {
  if (JSON.parse(localStorage.getItem("övningar"))[event.target.parentNode.name] != event.target.value) {
    event.target.parentNode.children[2].checked = true
  }
}


function nyÖvning() {
  let namn = document.getElementById("nyÖvningInput").value
  if (namn == "") {
    return
  }
  if (localStorage.getItem("övningar")) {
    let data = JSON.parse(localStorage.getItem("övningar"));
    data[namn] = null
    localStorage.setItem("övningar",JSON.stringify(data))
  }
  else {
    let data = {}
    data[namn] = null
    localStorage.setItem("övningar",JSON.stringify(data))
  } 
  skrivUtÖvning(namn,null)
}

function skrivUtÖvning(namn,vikt) {
  let övningsNod = document.createElement("div")
  övningsNod.className = "övnings-nod"
  övningsNod.name = namn

//  let inputTdNod = document.createElement("td")
  let inputNod = document.createElement("input")
  inputNod.id = 'övning-' + document.getElementById("övningar").children.length + '-input'
  inputNod.type = "number"
  inputNod.name = "vikt-input"
  inputNod.className = "vikt-input"
  inputNod.placeholder = "Vikt"
  if (vikt) {
    inputNod.value = vikt
  }
  inputNod.onchange = function() {inputChange(event)}
//  inputTdNod.appendChild(inputNod)

//  let labelTdNod = document.createElement("td")
  let labelNod = document.createElement("label")
  labelNod.for = 'övning-' + document.getElementById("övningar").children.length + '-input'
  labelNod.innerHTML = namn
  labelNod.className = "övings-label"
//  labelTdNod.appendChild(labelNod)

  let checkboxNod = document.createElement("input")
  checkboxNod.type = "checkbox"
  checkboxNod.className = "övining-checkbox"
  checkboxNod.id = 'övning-' + document.getElementById("övningar").children.length + '-checkbox'
  let checkBoxLabel = document.createElement("label")
  checkBoxLabel.className = "övining-checkbox"
  checkBoxLabel.htmlFor = checkboxNod.id

  
  övningsNod.appendChild(labelNod)
  övningsNod.appendChild(inputNod)
  övningsNod.appendChild(checkboxNod)
  övningsNod.appendChild(checkBoxLabel)

  document.getElementById("övningar").appendChild(övningsNod)
}


function uppdateraVikter() {
  taBortÖvningar()
  if (localStorage.getItem("övningar")) {
    console.log(localStorage.getItem("övningar"))
    let data = JSON.parse(localStorage.getItem("övningar"))
    for (i = 0; i < Object.keys(data).length; i++) {
      skrivUtÖvning(Object.keys(data)[i],data[Object.keys(data)[i]])
    }
  }

}

function taBortÖvningar() {
  var children = document.getElementById("övningar").children;
  for (;children.length > 0;) {
    children[0].remove()
  }  
}

function exporteraData() {
  let data = [JSON.stringify([localStorage.getItem("övningar"),localStorage.getItem("träningspass")])]
  console.log(data)
  let file = new File(data,"träningsapp-export.json")
  const link = document.createElement('a')
  const url = URL.createObjectURL(file)

  link.href = url
  link.download = file.name
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

function importeraData(data) {
  var file = data.target.files[0];
      var reader = new FileReader(); // create a FileReader

    reader.onload = function(e) {
        var contents = e.target.result; // get the file contents
        localStorage.setItem("övningar",JSON.parse(contents)[0]); // log the contents
        localStorage.setItem("träningspass",JSON.parse(contents)[1]); // log the contents
        uppdateraVikter()
    };

    reader.readAsText(file); // read the file as text
    
}

window.onload = uppdateraVikter();
