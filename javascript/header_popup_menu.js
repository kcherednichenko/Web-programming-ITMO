let menuToggle = document.getElementById("menu-toggle")
let popupNav = document.getElementById("popup_nav")

menuToggle.addEventListener('click', function (e){
    if (menuToggle.classList.contains('is-active')){
        menuToggle.classList.remove('is-active')
        menuToggle.style.borderBottom = "2px solid"
        menuToggle.style.borderTop = "2px solid"
        popupNav.style.display = 'none'
    }
    else {
        menuToggle.classList.add("is-active")
        menuToggle.style.border = "0"
        popupNav.style.display = 'block'
    }
})
window.addEventListener('resize', function () {
    if (window.innerWidth > 770){
        popupNav.style.display = 'none'
    }
})