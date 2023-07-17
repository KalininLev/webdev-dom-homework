//Переменные элементов
//Находятся в variables.js

//Функция включения/отключения анимации загрузки комментария
import { enableLoadingToComment } from "./loadingAnim.js"

//Функция включения/откоючения анимации при загрузке страницы
import { enableLoadingToPage } from "./loadingAnim.js"

//Функция для имитации запросов в API
import { delay } from "./api.js"

// переводим список комментов в массив
import { commentsList } from "./api.js"

//Функция получения списка комментариев с API
import { fetchAndRenderCommentList } from "./api.js"



//ВСЕ ЧТО СВЯЗАНО С РЕНДЕРОМ И СОЗДАНИЕМ КОЛЛЕКЦИЙ В ДИНАМИЧЕСКИХ ЭЛЕМЕНТАХ

// рендерим наш массив в HTML
import { renderCommentList } from "./renderArraiInHTML.js"


// Функция создания ответа на комментарий
import { initCommentAnswerListeners } from "./eventsOnButtons.js"


// Функция создания коллекции и навешивания ивентов на все кнопки Like
import { initLikeButtonsListeners } from "./eventsOnButtons.js"

//Функция создания коллекции и навешивания ивентов на все кнопки РЕДАКТИРОВАТЬ и СОХРАНИТЬ
//Так же логика измений кнопки с РЕДАКТИРОВАТЬ на СОХРАНИТЬ и обратно
import { initEditButtonsListeners } from "./eventsOnButtons.js"


//ВСЕ ОСТАЛЬНЫЕ ФУНКЦИИ НА СТАТИЧЕСКИХ ЭЛЕМЕНТАХ

// функция подправки времени.
import { fullTime } from "./api.js"

// Выключение кнопки при не соблюдении условий
import { disableBtn } from "./disableButton.js"

// функция добавления нашего комментария в массив и в API
import { addComment } from "./api.js"

// Перекрашиваем поле и включаем/отлючаем кнопку в инпуте имени
//код и логика работы в eventsOnButtons.js

// Перекрашиваем поле и включаем/отлючаем кнопку в инпуте комментариев
//код и логика работы в eventsOnButtons.js

//Функиця повторной отправки комментария при 500 ошибке
import { handlePostClick } from "./api.js"



//логика кнопки добавления комментария
//код и логика работы в eventsOnButtons.js

// Обработка нажатия на enter
//код и логика работы в eventsOnButtons.js