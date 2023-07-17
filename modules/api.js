//переменные элементов
import { nameInput } from "./variables.js"
import { commentInput } from "./variables.js"
import { addButton } from "./variables.js"


let isLoading = false;
let isLoadingPage = true;

//импорты
import { enableLoadingToComment } from "./loadingAnim.js"
import { enableLoadingToPage } from "./loadingAnim.js"
import { renderCommentList } from "./renderArraiInHTML.js"

// переводим список комментов в массив
export let commentsList = []

// функция подправки времени.
export function fullTime(number) {
    if (String(number).length < 2) {
       return number = `0${number}`
    } else {
       return number = number
    }
}

//Функция для имитации запросов в API
export function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
}

//Функция получения списка комментариев с API
export const fetchAndRenderCommentList = () => {
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

// функция добавления нашего комментария в массив и в API
export function addComment() {

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

//Функиця повторной отправки комментария при 500 ошибке
export const handlePostClick = (error) => {
    if (error.message === 'Сервер сломался, попробуйте позже!'){
        addComment();
    } else {
        alert(error.message)
    }
};