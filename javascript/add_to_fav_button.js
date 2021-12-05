function addAndRemoveFromFav(className) {
    let buttons = document.getElementsByClassName(className)
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function (e) {
            e.preventDefault()
            if (buttons[i].classList.contains('favourites_active')) {
                buttons[i].innerHTML = 'Добавить в избранное'
                buttons[i].classList.remove('favourites_active')
            }
            else {
                buttons[i].classList.add('favourites_active')
                buttons[i].innerHTML = '<i class="fas fa-heart"></i> В избранном'
            }
        })
    }
}

addAndRemoveFromFav('favourites_button')
