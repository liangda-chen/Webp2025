var count = 1;

function addfunction() {
  var btn = document.createElement("BUTTON");
  btn.innerHTML = `CLICK ME (${count})`;
  btn.setAttribute("id", "btn_" + count++);
  btn.setAttribute("class", "btn btn-outline-danger");
  console.log(btn);
  document.body.appendChild(btn);
}

function delfunction() {
  if (count > 1) { // 確保 count 不會減到 0 或負數
    var btn = document.getElementById("btn_" + --count);
    console.log(btn);
    if (btn) {
      document.body.removeChild(btn);
    }
  }
}