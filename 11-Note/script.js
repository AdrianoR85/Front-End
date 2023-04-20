const popupContainer = document.querySelector('.popup-container')
const wrapper = document.querySelector('.wrapper')

const formTitle = document.querySelector('.form-title')
const titleTag = document.querySelector('.title-tag')
const descTag = document.querySelector('.description-tag')

const newNoteBtn = document.querySelector('.btn-add')
const closeFormBtn = document.querySelector('.close')
const addNoteBtn = document.querySelector('.btn-form')

const notesStorage = JSON.parse(localStorage.getItem('notes') || '[]')

let isUpdate = false
let updateId = ''

function closeForm() {
    popupContainer.classList.remove('show')
}

function openForm() {
    popupContainer.classList.add('show')
    formTitle.textContent = 'Add a new Note'
    addNoteBtn.innerHTML = 'Add Note'
}

function deleteNote(noteID) {
    notesStorage.splice(noteID, 1)
    localStorage.setItem('notes', JSON.stringify(notesStorage))
    renderNotes()
}

function updateNote(index) {
    openForm()
    isUpdate = true
    updateId = index
    formTitle.textContent = 'Update a note'
    addNoteBtn.innerHTML = 'Update'
    titleTag.value = notesStorage[index].title
    descTag.value = notesStorage[index].descrition
}

function clearForm() {
    titleTag.value = ''
    descTag.value = ''
}

function renderNotes() {
    document.querySelectorAll('.note').forEach(li => li.remove())
    if(notesStorage) {
        notesStorage.forEach((note, index) => {
            const liTag = `
                <li class="note">
                    <div class="settings">
                        <button class="edit" onclick="updateNote(${index})"><i class="fa fa-edit"></i></button>
                        <button class="delete" onclick="deleteNote(${index})"><i class="fa fa-trash"></i></button>
                    </div>
                    <div class="datails">
                        <strong class="datails-title">${note.title}</strong>
                        <p class="datails-description">${note.descrition}</p>
                    </div>
                </li>
            `
            wrapper.insertAdjacentHTML('beforeend', liTag)
        })
    }
}

function addNewNote(e) {
    e.preventDefault()

    let noteTitle = titleTag.value
    let noteDesc = descTag.value

    if(noteTitle || noteDesc) {
        let noteInfo = {title: noteTitle, descrition: noteDesc}

        if(!isUpdate) {
            notesStorage.push(noteInfo)
        } else {
            isUpdate = false
            notesStorage[updateId] = noteInfo
        }

        localStorage.setItem('notes', JSON.stringify(notesStorage))
    }

    clearForm()
    closeForm()
    renderNotes()
}

closeFormBtn.addEventListener('click', closeForm)
newNoteBtn.addEventListener('click', openForm)
addNoteBtn.addEventListener('click', addNewNote)

renderNotes()
