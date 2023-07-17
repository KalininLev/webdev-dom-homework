//переменные элементов
import { nameInput } from "./variables.js"
import { commentInput } from "./variables.js"
import { addButton } from "./variables.js"

//импорты


// Выключение кнопки при не соблюдении условий
export function disableBtn() {
    if (!nameInput.value == '' && !commentInput.value == '') {
        addButton.classList.remove('add-form-button_disable')
    } else {
        addButton.classList.add('add-form-button_disable')
    }
}