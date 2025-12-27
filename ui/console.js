export function log(msg){
    const c = document.getElementById("console");
    c.textContent += msg+"\n";
    c.scrollTop = c.scrollHeight;
}
