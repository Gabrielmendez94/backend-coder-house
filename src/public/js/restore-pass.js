const newForm = document.getElementById('restorePass');

newForm.addEventListener('submit', async e =>{
    const newForm = document.getElementById('restorePass');
    e.preventDefault();
    const data = new FormData(newForm);
    console.log(data);
    const obj = {};
    data.forEach((value, key)=>obj[key]= value);
    const { email, newPassword } = obj;
    const newObj = { email, newPassword };
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