const btnRegister = document.querySelector('#register')
const modal = document.querySelector('.modal')
const btnClose = document.querySelector('.btn-close')

function activeModal() {
    modal.classList.add('modal-active')
    document.querySelector('.name').focus()
}

function disableModal() {
    modal.classList.remove('modal-active')
}

btnClose.addEventListener('click', disableModal)
btnRegister.addEventListener('click', activeModal)