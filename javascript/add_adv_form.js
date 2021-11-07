let options = document.getElementsByClassName("add-adv__option");


for (let i = 0; i < options.length; i++) {
    options[i].addEventListener('click', function (event){
        let elementsInDiv =  options[i].parentElement.children
        Array.from(elementsInDiv).forEach(function (el){
            if (el.classList.contains('active')){
                el.classList.remove('active')
            }
        })
        event.preventDefault()
        options[i].classList.add('active')
    });
}