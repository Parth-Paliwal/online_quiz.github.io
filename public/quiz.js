
setTimeout(() => {
    let user = document.getElementById('log');
   
   let a = document.cookie
   let b= a.split(';');
   let x , i;
   
   for(i=0;i<b.length;i++){
      x = b[i].split('=');
      if(x[0].trim(' ') == 'username'){
         user.innerHTML = `<a href="/login">${x[1]}</a>`;
        
      }
   }
}, 100);

// fetch('/' , {
//    method:'POST',
//    headers:{
//       'content-Type': ' application/json'
//    },
//    body:JSON.stringify({
//       data:'parth'
//    })
// })
