 var container = document.getElementById('container')
 
 
let html = `<div>
<div class="created">
    <div id="heading" class="left headind">this is heading</div>
    <div class="right headind">12345</div>     
</div>
</div>`
let data;
let a = document.cookie
let b = a.split(';');
let x, i;

for (i = 0; i < b.length; i++) {
    x = b[i].split('=');
    if (x[0].trim(' ') == 'username') {
         data = x[1];
        break;
    }
}


fetch('/created' , {
            method:'POST',
            headers:{
               'content-Type': ' application/json'
            },
            body:JSON.stringify({
                data: data
            })
          })
const baseurl = "http://127.0.0.1/upi";

setTimeout(getinfo, 100)

async function getinfo() {
    const res = await fetch(baseurl, { mode: "no-cors" }, {
        method: 'GET'
    });
    const data = await res.json();
   let no = data.user.length;
  
    for(let z = 0;z < no;z++){
        container.innerHTML = container.innerHTML + html;
    }
    var head = document.querySelectorAll('#heading')
    var code = document.querySelectorAll('.right')
    for(let z = 0;z < no; z++){
        head[z].innerHTML =  data.user[z].heading
        code[z].innerHTML =  data.user[z].code
    }
  
}