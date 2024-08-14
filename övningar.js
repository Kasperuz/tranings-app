window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  var övningar = JSON.parse(params.get("övningar"));
  if (!övningar) {
    return
  }
  for (let i=0;i<övningar.length;i++) {
    console.log(i)
    skrivUtÖvning(övningar[i])
  }
};


function skrivUtÖvning(namn) {
  let övningsNod = document.createElement("div")
  övningsNod.className = "övnings-nod"
  övningsNod.name = namn
  let labelNod = document.createElement("label")
  labelNod.for = 'övning-' + document.getElementById("övningar").children.length + '-input'
  labelNod.innerHTML = namn
  labelNod.className = "övings-label"
  let deleteButton = document.createElement("button")
  deleteButton.className = "delete-button"
  deleteButton.onclick = function() {taBortÖvning(this.parentNode)}
  let deleteImage = document.createElement("img")
  deleteImage.src = "images/delete.png"
  deleteImage.alt = "Delete"
  deleteImage.className = "delete-button"
  deleteButton.appendChild(deleteImage)
  
  övningsNod.appendChild(labelNod)
  övningsNod.appendChild(deleteButton)

  document.getElementById("övningar").appendChild(övningsNod)
}
function nyÖvning() {
  let namn = document.getElementById("nyÖvningInput").value
  if (namn == "") {
    return
  }
  document.getElementById("main-screen-link").contentWindow.postMessage([true,namn],"*") // True = add, False = remove
  skrivUtÖvning(namn,null)
}

function taBortÖvning(övning) {
  document.getElementById("main-screen-link").contentWindow.postMessage([false,övning.children[0].innerHTML],"*") // True = add, False = remove
  övning.remove()
}

function sidemenu() {
  const button = document.getElementById("menu-button")
  const dropdown = document.getElementById("dropdown-menu")
  const handleClick = (event) => {
    if (!button.contains(event.target)) {
      hideSidemenu(dropdown)
    }
  };
  if (dropdown.classList.contains("opened")) {
    hideSidemenu(dropdown,handleClick)
  }
  else {
    dropdown.classList.add("opened")
    document.addEventListener('click', handleClick);
  }
  console.log(dropdown.classList)
  
}

function hideSidemenu(dropdown,clickHandler) {
  dropdown.classList.remove("opened")
  document.removeEventListener('click',clickHandler);

}

function övningsMenu() {
  window.location.href = 'övningar.html'
}
function hemMenu() {
  window.location.href = 'index.html'
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