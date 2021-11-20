let options = document.getElementsByClassName("add-adv__option")
let objectTypeOptions = document.getElementsByClassName("object-options__item")

const add_active_class = function (objects, classname) {
    for (let i = 0; i < objects.length; i++) {
        objects[i].addEventListener('click', function (event) {
            event.preventDefault()
            if (objects[i].classList.contains(classname)) {
                objects[i].classList.remove(classname)
            } else {
                let elementsInDiv = objects[i].parentElement.children
                Array.from(elementsInDiv).forEach(function (el) {
                    if (el.classList.contains(classname)) {
                        el.classList.remove(classname)
                    }
                })
                objects[i].classList.add(classname)
            }
        });
    }
}

add_active_class(options, 'active')
add_active_class(objectTypeOptions, 'active_object')