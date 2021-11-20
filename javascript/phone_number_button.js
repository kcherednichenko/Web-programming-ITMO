function showPhoneNumber(phoneNumber, classId) {
    let button = document.getElementById(classId)
    if (button !== null) {
        button.addEventListener('click', function (event) {
            event.preventDefault()
            button.innerHTML = phoneNumber
        })
    }
}

showPhoneNumber("+7(921)100-00-01", "phone_number_1")
showPhoneNumber("+7(921)100-00-02", "phone_number_2")
showPhoneNumber("Показать телефон +7(921)100-00-03", "phone_number_3")
