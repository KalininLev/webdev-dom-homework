//переменные элементов
import { commentsBox } from "./variables.js"

//импорты
import { initCommentAnswerListeners } from "./eventsOnButtons.js"
import { initLikeButtonsListeners } from "./eventsOnButtons.js"
import { initEditButtonsListeners } from "./eventsOnButtons.js"
import { commentsList } from "./api.js"


// рендерим наш массив в HTML
export const renderCommentList = () => {
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