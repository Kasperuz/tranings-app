document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn").addEventListener("click", function (e) {
    e.preventDefault();

    // Get the value of the "vikt_input" input field
    var vikt = document.querySelector('input[name="vikt_input"]').value;
    var övning = document.querySelector('select[name="övning_dropdown"]').value;
    var storedValue = JSON.parse(localStorage.getItem(övning));
    if (storedValue != null) {
      storedValue.push(vikt);
    } else {
      storedValue = new Array(vikt);
    }
    // Save the name value to localStorage
    localStorage.setItem(övning, JSON.stringify(storedValue));

    // Log a success message (for demonstration purposes)
    console.log("Saved locally!");
    update_table()
  });
});

function update_table() {
  document.getElementById("statistics_table").remove();
  const table = document.createElement("table")
  table.setAttribute("id","statistics_table")
  table.setAttribute("class","statistics_table")
  document.body.appendChild(table)

  var header1 = document.createElement("th")
  header1.appendChild(document.createTextNode("Övning 1"));
  table.appendChild(header1)

  var header2 = document.createElement("th")
  header2.appendChild(document.createTextNode("Övning 2"));
  table.appendChild(header2)
  
  var header3 = document.createElement("th")
  header3.appendChild(document.createTextNode("Övning 3"));
  table.appendChild(header3)


  for (var i = 0; true; i++) {
    var row = table.insertRow(-1);
    var continue_loop = false;

    if (localStorage.getItem("1") != null && JSON.parse(localStorage.getItem("1"))[i] != null) {
      continue_loop = true
      var cell = row.insertCell(-1)
      cell.appendChild(document.createTextNode(JSON.parse(localStorage.getItem(1))[i]))
    }
    else {
      var cell = row.insertCell(-1)
    }
    
    if (localStorage.getItem("2") != null && JSON.parse(localStorage.getItem("2"))[i] != null) {
      continue_loop = true
      var cell = row.insertCell(-1)
      cell.appendChild(document.createTextNode(JSON.parse(localStorage.getItem(2))[i]))
    }
    else {
      var cell = row.insertCell(-1)
    }

    if (localStorage.getItem("3") != null && JSON.parse(localStorage.getItem("3"))[i] != null) {
      continue_loop = true
      var cell = row.insertCell(-1)
      cell.appendChild(document.createTextNode(JSON.parse(localStorage.getItem(3))[i]))
    }
    else {
      var cell = row.insertCell(-1)
    }

    if (!continue_loop) {
      break
    }

  }
}


window.onload = update_table();
window.onload = function() {
  document.getElementById("datum_input").valueAsDate = new Date()
}