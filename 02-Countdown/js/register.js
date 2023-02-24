
const btnForm = document.querySelector('.btn--form');
const email = document.querySelector('.email');
const inputName = document.querySelector('.name');

function checkEmail (email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const IsEmailValid = reg.test(email.value) && email.value !== '';
    
    if(IsEmailValid) {
        email.classList.remove('modal--error');
        email.classList.add('modal--success');
        return true;
    } else {
        email.classList.remove('modal--success');
        email.classList.add('modal--error');
        return false;
    }
}

function checkName(inputName) {
    
    console.log(inputName.value);
    const IsNameValid = inputName.value !== '';
    
    if(IsNameValid) {
        inputName.classList.remove('modal--error');
        inputName.classList.add('modal--success');
        return true;
    } else {
        inputName.classList.remove('modal--success');
        inputName.classList.add('modal--error');
        return false;
    }
}

btnForm.addEventListener('click', (e) => {
    e.preventDefault();
    const nameOk = checkName(inputName);
    const emailOk = checkEmail(email);
    if(nameOk && emailOk) {
        email.value = ''
        inputName.value = ''
        inputName.classList.add('modal--success');
        disableModal();
        alert('Regsitro efetuado com sucesso');
    };
})