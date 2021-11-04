document.getElementById('su').value = "查查查"

document.body.style.border = "10px solid olive";

function getGrid(){
  var grid = document.querySelector("iframe").contentWindow.document.getElementById("wddb");
  var title = grid.firstElementChild.getElements("[name='rwzt']")[1].get("title");
  console.log(grid);
  console.log(title);
}


window.confirm("Are you sure?");


