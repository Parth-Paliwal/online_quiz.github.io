setTimeout(dic, 220);
let input = document.getElementById('input');

function dic() {
    let que = document.querySelectorAll('.created');
    let code = document.querySelectorAll('.right');
    
    for (let i = 0; i < que.length; i++) {
        
        que[i].onclick = () => {
            input.value = code[i].innerHTML;
          document.getElementById('form');
          console.log( form.elements[0].value)
         form.submit();   
         
        }
    }
}
