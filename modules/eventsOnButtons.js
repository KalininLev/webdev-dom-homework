//переменные элементов
import { nameInput } from "./variables.js"
import { commentInput } from "./variables.js"
import { addButton } from "./variables.js"

//импорты
import { delay } from "./api.js"
import { commentsList } from "./api.js"
import { renderCommentList } from "./renderArraiInHTML.js"
import { disableBtn } from "./disableButton.js"
import { addComment } from "./api.js"

// Функция создания ответа на комментарий
export const initCommentAnswerListeners = () => {
    const commentAnswer = document.querySelectorAll(".comment")
    commentAnswer.forEach((answer, index) => {
        answer.addEventListener('click', (event) => {
           if(event.target.classList.value == 'comment-edit') {
            return;
           }
           else {
            commentInput.value = `→${commentsList[index].userName}

${commentsList[index].commentText}←
                        
            `
           }
        })
    })
}


// Функция создания коллекции и навешивания ивентов на все кнопки Like
export const initLikeButtonsListeners = () => {
    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((likeButton, index) => {
        likeButton.addEventListener('click', (event) => {
            likeButton.classList.add('-loading-like')
            event.stopPropagation();
            delay(2000).then(() => {
                if (commentsList[index].isLike === false ) {
                    commentsList[index].isLike = true;
                    commentsList[index].likeCounter += 1
                } else {
                    commentsList[index].isLike = false;
                    commentsList[index].likeCounter -= 1
                }
                
                likeButton.classList.remove('-loading-like')
                renderCommentList();
            })
            

            
        })
    })
}
//Функция создания коллекции и навешивания ивентов на все кнопки РЕДАКТИРОВАТЬ и СОХРАНИТЬ
//Так же логика измений кнопки с РЕДАКТИРОВАТЬ на СОХРАНИТЬ и обратно
export const initEditButtonsListeners = () => {
    const editButtons = document.querySelectorAll('#edit-button')
    editButtons.forEach((editButton, index) => {
        editButton.addEventListener('click', (event) => {
            const editCommentText = document.querySelector('.comment-edit')
            event.stopPropagation();
           if (commentsList[index].isEdit) {           
            if (!editCommentText.value == '') {
                commentsList[index].isEdit = false
                commentsList[index].commentText = editCommentText.value
            } else {
                commentsList[index].isEdit = false
                commentsList[index].commentText = `Комментарий не может быть пустым`
            }
           } else {            
            commentsList[index].isEdit = true
           }
           
           renderCommentList();
        })
    })
}

// Перекрашиваем поле и включаем/отлючаем кнопку в инпуте имени
nameInput.addEventListener('input', () => {
    disableBtn()
    nameInput.classList.remove('add-form-name_error')
})

nameInput.addEventListener('blur', () => {
    if (nameInput.value == '') {
        nameInput.classList.add('add-form-name_error')
    } else {
        nameInput.classList.remove('add-form-name_error')
    }
})


// Перекрашиваем поле и включаем/отлючаем кнопку в инпуте комментариев
commentInput.addEventListener('input', () => {
    disableBtn()
    commentInput.classList.remove('add-form-comment_error')
})

commentInput.addEventListener('blur', () => {
    if (commentInput.value == '') {
        commentInput.classList.add('add-form-comment_error')
    } else {
        commentInput.classList.remove('add-form-comment_error')
    }
})


//логика кнопки добавления комментария
addButton.addEventListener('click', () => {
    addComment()
    renderCommentList()

    addButton.classList.add('add-form-button_disable')
    addButton.blur();
})

// Обработка нажатия на enter
window.addEventListener('keyup',(event) => {
    if (event.code == 'Enter' || event.code == 'NumpadEnter') {
        if (!nameInput.value == '' && !commentInput.value == ''){
            addComment()
            renderCommentList()
            nameInput.value = ''
            commentInput.value = ''
            addButton.classList.add('add-form-button_disable')
        }
    }
})