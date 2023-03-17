const baseurl = "http://127.0.0.1/result ";
var container = document.getElementById('container')
 
 
let html = `<div>
<div class="created">
    <div id="heading" class="left headind">this is heading</div>
    <div class="right headind">12345</div>     
</div>
</div>`
setTimeout(getinfo, 100)

async function getinfo() {
    const res = await fetch(baseurl, { mode: "no-cors" }, {
        method: 'GET'
    });
    const data = await res.json();
    let no = data.data.length;
  
    for(let z = 0;z < no;z++){
        container.innerHTML = container.innerHTML + html;
    }
    var head = document.querySelectorAll('#heading')
    var code = document.querySelectorAll('.right')
    for(let z = 0;z < no; z++){
       
        head[z].innerHTML =  data.data[z].name
        code[z].innerHTML =  data.data[z].result
    }
  
}