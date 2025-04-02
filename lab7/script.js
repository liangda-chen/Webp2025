window.addEventListener("keyup", function (e) {
    console.log(e.key);
 
    const container = document.getElementById("container");
    let currentText = container.textContent.trim();
 
    if (currentText.length > 0 && currentText[0] === e.key) {
        container.textContent = currentText.substring(1);
    }
 
    add_new_chars();
});
 
function add_new_chars() {
    const container = document.getElementById("container");
 
    let chars = "abcdefghijklmnopqrstuvwxyz";
    let length = Math.floor(Math.random() * 3) + 1; 
    let randomStr = "";
 
    for (let i = 0; i < length; i++) {
        randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
 
    container.textContent += randomStr; 
}