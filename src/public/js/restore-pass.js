const newForm = document.getElementById('restorePass');

newForm.addEventListener('submit', async e =>{
    e.preventDefault();
    const data = new FormData(newForm);
    const obj = {};
    data.forEach((value, key)=>obj[key]= value);
    const newPassword = obj;
    const newObj = newPassword;
    await fetch(`/api/sessions/pass-change/${obj.token}`, {
        method: 'PUT',
        body: JSON.stringify(newObj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            console.log('Contraseña modificada correctamente');
        }else{
            console.log('Error')
        }
    })
})