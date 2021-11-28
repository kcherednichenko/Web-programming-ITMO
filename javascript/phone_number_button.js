function showPhoneNumber(text, classId, phoneNumber) {
    let button = document.getElementById(classId)
    if (button !== null) {
        button.addEventListener('click', function myListener(event) {
            event.preventDefault()
            button.innerHTML = text
            button.setAttribute('href', phoneNumber)
            button.removeEventListener('click', myListener)
        })
    }
}

showPhoneNumber("+7(921)100-00-01", "phone_number_1", "tel:+7(921)100-00-01")
showPhoneNumber("+7(921)100-00-02", "phone_number_2", "tel:+7(921)100-00-02")
showPhoneNumber("Показать телефон +7(921)100-00-03", "phone_number_3", "tel:+7(921)100-00-03")
showPhoneNumber("Показать телефон +7(921)100-00-03", "phone_number_4", "tel:+7(921)100-00-03")
