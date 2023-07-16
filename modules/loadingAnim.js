//переменные элементов
import { loadingPage } from "./variables.js"
import { loadingComment } from "./variables.js"
import { addForm } from "./variables.js"

//Функция включения/отключения анимации загрузки комментария
export function enableLoadingToComment(boolean){
    if(boolean){
        loadingComment.classList.remove('loading_hidden')
        addForm.classList.add('loading_hidden')

    } else {
        loadingComment.classList.add('loading_hidden')
        addForm.classList.remove('loading_hidden')
    }
}

//Функция включения/откоючения анимации при загрузке страницы
export function enableLoadingToPage(boolean){
    if(boolean){
        loadingPage.classList.remove('loading_hidden')

    } else {
        loadingPage.classList.add('loading_hidden')
    }
}