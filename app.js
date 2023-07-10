//переменные элементов
const nameInput = document.querySelector('#name-input')
const commentInput = document.querySelector('#comment-input')
const addButton = document.querySelector('#add-button')
const commentsBox = document.querySelector('#comments-box')
const removeButton = document.querySelector('#delete-button')
const loadingPage = document.querySelector('#loading_page')
const loadingComment = document.querySelector('#loading_comment')
const addForm = document.querySelector('.add-form')


let isLoading = false;
let isLoadingPage = true;

//Функция включения/отключения анимации загрузки комментария
function enableLoadingToComment(boolean){
    if(boolean){
        loadingComment.classList.remove('loading_hidden')
        addForm.classList.add('loading_hidden')

    } else {
        loadingComment.classList.add('loading_hidden')
        addForm.classList.remove('loading_hidden')
    }
}

//Функция включения/откоючения анимации при загрузке страницы
function enableLoadingToPage(boolean){
    if(boolean){
        loadingPage.classList.remove('loading_hidden')

    } else {
        loadingPage.classList.add('loading_hidden')
    }
}

//Функция для имитации запросов в API
function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
}

// переводим список комментов в массив
let commentsList = []


fetchAndRenderCommentList = () => {
    enableLoadingToPage(isLoadingPage);
   return fetch("https://wedev-api.sky.pro/api/v1/lev-kalinin/comments", {
        method: "GET",
    })
    .then((response) => {
        return response.json();  
    })
    .then((responseData) => {
        const appComments = responseData.comments.map((comment) =>{
            return {
                userName: comment.author.name,
                currDate: `${new Date(comment.date).toLocaleDateString('ru-RU', {month: 'numeric', day: 'numeric'})}.${String(new Date(comment.date).getFullYear()).slice(2)} ${fullTime(new Date(comment.date).getHours())}:${fullTime(new Date(comment.date).getMinutes())}`,
                commentText: comment.text,
                likeCounter: comment.likes,
                isLike: comment.isLiked,
            }
        });
        commentsList = appComments;
        isLoadingPage = false;
        enableLoadingToPage(isLoadingPage);
        renderCommentList();
    })
    .catch((error) =>{
        console.log(error)
        if(navigator.onLine){
            alert('Упс, что-то пошло не так!')            
        } else {
            alert('Кажется, у вас сломался интернет, попробуйте позже')
        }
    })
}

fetchAndRenderCommentList();



//ВСЕ ЧТО СВЯЗАНО С РЕНДЕРОМ И СОЗДАНИЕМ КОЛЛЕКЦИЙ В ДИНАМИЧЕСКИХ ЭЛЕМЕНТАХ

// рендерим наш массив в HTML
const renderCommentList = () => {
   const commentsHtml = commentsList.map((comments, index) => {
        return `<li class="comment">
              <div class="comment-header">
                <div>${comments.userName}</div>
                <div>${comments.currDate}</div>
              </div>
              <div class="comment-body">
                <div data-answer='${index}' class="comment-text">
                  ${(comments.isEdit) ? `<textarea class="comment-edit">${comments.commentText}</textarea>` : `${comments.commentText}` }
                </div>
                <button id='edit-button' data-index='${index}' class="add-form-button">${comments.isEdit ? `Сохранить` : 'Редактировать'}</button>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${comments.likeCounter}</span>
                  <button data-like='${index}' class="like-button ${(comments.isLike) ? `-active-like` : ''}"></button>
                </div>
              </div>
        </li>    
        `
    }).join('')
    

    commentsBox.innerHTML = commentsHtml.replaceAll("→", "<div class='quote'>").replaceAll("←", "</div class='quote'>");
    

    initLikeButtonsListeners();
    initEditButtonsListeners();
    initCommentAnswerListeners();
}


// Функция создания ответа на комментарий
const initCommentAnswerListeners = () => {
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
const initLikeButtonsListeners = () => {
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
const initEditButtonsListeners = () => {
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


//ВСЕ ОСТАЛЬНЫЕ ФУНКЦИИ НА СТАТИЧЕСКИХ ЭЛЕМЕНТАХ

// функция подправки времени.
function fullTime(number) {
    if (String(number).length < 2) {
       return number = `0${number}`
    } else {
       return number = number
    }
}
// Выключение кнопки при не соблюдении условий
function disableBtn() {
    if (!nameInput.value == '' && !commentInput.value == '') {
        addButton.classList.remove('add-form-button_disable')
    } else {
        addButton.classList.add('add-form-button_disable')
    }
}

// функция добавления нашего комментария в массив
function addComment() {

    isLoading = true;
    enableLoadingToComment(isLoading);

    fetch("https://wedev-api.sky.pro/api/v1/lev-kalinin/comments", {
        method: "POST",
        body: JSON.stringify({
            date: new Date(),
            likes: 0,
            isLiked: false,
            text: commentInput.value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
            name: nameInput.value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
            forceError: true
        }),
    })
    .then((response) =>{
        if(response.status === 201) {
            return response.json();
        } else {
            switch(response.status) {
                case 500: throw new Error('Сервер сломался, попробуйте позже!')
                case 400: throw new Error('Имя и комментарий должны быть НЕ КОРОЧЕ 3 символов!')
                default: throw new Error('Упс, что-то пошло не так!')
            }
        }
    })
    .then(() => {
        return fetchAndRenderCommentList();
    })
    .then(() => {
        nameInput.value = ''
        commentInput.value = ''
        isLoading = false
        enableLoadingToComment(isLoading);
        addButton.classList.add('add-form-button_disable')
    })
    .catch((error) => {
        isLoading = false
        enableLoadingToComment(isLoading);
        addButton.classList.remove('add-form-button_disable')

        console.log(error)
        if(navigator.onLine){
            handlePostClick(error);            
        } else {
            alert('Кажется, у вас сломался интернет, попробуйте позже')
        }
        
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


const handlePostClick = (error) => {
    if (error.message === 'Сервер сломался, попробуйте позже!'){
        addComment();
    } else {
        alert(error.message)
    }
  };



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