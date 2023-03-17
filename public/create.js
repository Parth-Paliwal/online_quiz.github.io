let username = document.getElementById('user');
let a = document.cookie
let b = a.split(';');
let x, i;

for (i = 0; i < b.length; i++) {
    x = b[i].split('=');
    if (x[0].trim(' ') == 'username') {
        username.value = x[1];
        break;
    }
}


var container = document.getElementById("container");
var list = document.getElementById("number");
var html = `<input class="input-questions" type="text" name="question" placeholder="QUESTIONS">
<div class="new">
    <div class="options">
        <input class="options-input" name="option1" type="text" placeholder="1.">
        <input class="options-input" name="option2" type="text" placeholder="2.">
        <input class="options-input" name="option3" type="text" placeholder="3.">
        <input class="options-input" name="option4" type="text" placeholder="4.">
    </div>
    <input class=" answer" type="number" name="answer" placeholder="correct-option">
    </div>`

list.oninput = () => {
    container.innerHTML = html;
    for (let i = 1; i < list.value; i++) {
        container.innerHTML = container.innerHTML + html;
    }
}






