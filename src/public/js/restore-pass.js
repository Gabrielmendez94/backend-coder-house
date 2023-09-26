const newForm = document.getElementById('restorePass');

newForm.addEventListener('submit', e =>{
    e.preventDefault();
    const data = new FormData(newForm);
    const obj = {};
    data.forEach((value, key)=>obj[key]= value);
    const { email, newPassword } = obj;
    const newObj = { email, newPassword };
    fetch(`/api/sessions/pass-change/${obj.token}`, {
        method: 'PUT',
        body: JSON.stringify(newObj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            console.log('Contraseña modificada correctamente');
        }
    })
})