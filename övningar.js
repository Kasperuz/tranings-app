window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  var övningar = JSON.parse(params.get("övningar"));
  if (!övningar) {
    return
  }
  for (let i=0;i<övningar.length;i++) {
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
  document.getElementById("main-screen-link").contentWindow.postMessage([1,namn],"*") // 1 = add, 2 = remove, 3 = set
  skrivUtÖvning(namn,null)
}

function taBortÖvning(övning) {
  document.getElementById("main-screen-link").contentWindow.postMessage([2,övning.children[0].innerHTML],"*") // 1 = add, 2 = remove, 3 = set
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

function exporteraData() {/*
  let data = [JSON.stringify([JSON.parse(document.getElementById("main-screen-link").contentWindow.localStorage.getItem("övningar")),JSON.parse(document.getElementById("main-screen-link").contentWindow.localStorage.getItem("träningspass"))])]
  console.log(data)
  let file = new File(data,"träningsapp-export.json")
  const link = document.createElement('a')
  const url = URL.createObjectURL(file)

  link.href = url
  link.download = file.name
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)*/
}

function importeraData(data) {/*
  var file = data.target.files[0];
      var reader = new FileReader(); // create a FileReader

    reader.onload = function(e) {
        var contents = e.target.result; // get the file contents
        
        document.getElementById("main-screen-link").contentWindow.postMessage([3,JSON.parse(contents)],"*")
        console.log(JSON.parse(contents)[0])
        window.location.href = 'övningar.html?övningar='+JSON.stringify(Object.keys(JSON.parse(JSON.parse(contents)[0])))
      };

    reader.readAsText(file); // read the file as text
    */
}
