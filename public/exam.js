var container = document.getElementById("container");
const input = document.getElementById('number');
const heading = document.getElementById('head');
var question = document.getElementsByClassName('input-questions')
var option1 = document.getElementsByClassName('option1')
var option2 = document.getElementsByClassName('option2')
var option3 = document.getElementsByClassName('option3')
var option4 = document.getElementsByClassName('option4')
var code = document.getElementById('code');



let d;

function selector(c, a, b) {
    for (let k = 0; k < 4; k++) {
        a[k + c].addEventListener('click', () => {
            a[k + c].classList.toggle('select');
            if(a[k+c].classList[3] == 'select'){
            b[k + c].checked = true}
            else{
                b[k + c].checked = false
            }
            
            for (let j = 0; j < 4; j++) {
                if (j != k) {

                    a[j + c].classList.remove('select');
                    b[j + c].checked = false

                }
                
            }
        })
    }
}

var html = `<div class="input-questions center"></div>
<div class="new">
   <div class="options">

       <input type="checkbox"  class="check display" name="answer" value="1">
       <label class="option  center option1" for="answer"></label>

       <input type="checkbox"  class="check display" name="answer" value="2">
       <label class="option  center option2" for="answer"></label>

       <input type="checkbox"  class="check display" name="answer" value="3">
       <label class="option  center option3" for="answer"></label>

       <input type="checkbox"  class="check display" name="answer" value="4">
       <label class="option  center option4" for="answer"></label>

 </div>
</div>`
const baseurl = "http://127.0.0.1:80/exam";
let host;
setTimeout(getinfo, 100)

async function getinfo() {
    const res = await fetch(baseurl, { mode: "no-cors" }, {
        method: 'GET'
    });
    const data = await res.json();
    //host
    host = data.no.user;
    
    //Heading
    heading.innerHTML = data.no.heading

    // no. of questions.
    d = data.no.que;
    input.innerHTML = data.no.que;
    for (let i = 1; i < data.no.que; i++) {
        container.innerHTML = container.innerHTML + html;
    }
    //code
    
    code.value = data.no.code;


    //questions and input
    for (i = 0; i < data.no.que; i++) {
        question[i].innerHTML = data.no.question[i];
        option1[i].innerHTML = data.no.option1[i]
        option2[i].innerHTML = data.no.option2[i]
        option3[i].innerHTML = data.no.option3[i]
        option4[i].innerHTML = data.no.option4[i]

    }

    let a = document.getElementsByClassName('option');
    let b = document.getElementsByClassName("check");
    let c = 0;
    for (i = 0; i < d; i++) {
        selector(c, a, b);
        c += 4;
    }
}

