export function rightDateFormat(func, getDate) {
    return `${new Date(getDate).toLocaleDateString('ru-RU', {month: 'numeric', day: 'numeric'})}.${String(new Date(getDate).getFullYear()).slice(2)} ${func(new Date(getDate).getHours())}:${func(new Date(getDate).getMinutes())}`
}

export const formatDateToUs = (getDate) => {
    return `${getDate.getMonth() < 10 ? '0' + getDate.getMonth() : getDate.getMonth()}-${getDate.getDate() < 10 ? '0' + getDate.getDate() : getDate.getDate()}-${getDate.getFullYear()} ${getDate.getHours() < 10 ? '0' + getDate.getHours() : getDate.getHours()}:${getDate.getMinutes() < 10 ? '0' + getDate.getMinutes() : getDate.getMinutes()}`;
  };