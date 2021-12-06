window.onload = function () {
    const options = document.getElementsByClassName("add-adv__option")
    const objectTypeOptions = document.getElementsByClassName("object-options__item")

    const containsUsedForShowing = (el) => el.classList.contains('used-for-showing')

    const add_active_class = function (objects, classname) {
        for (let i = 0; i < objects.length; i++) {
            objects[i].addEventListener('click', function (event) {
                event.preventDefault()
                let elementsInDiv = objects[i].parentElement.children
                Array.from(elementsInDiv).forEach(function (el) {
                    if (el.classList.contains(classname)) {
                        el.classList.remove(classname)
                    }
                })
                objects[i].classList.add(classname)
                if (!Array.from(elementsInDiv).some(containsUsedForShowing)) {
                    if (objects[i].classList.contains('has_furniture')) {
                        for (currentDisplayedItem; currentDisplayedItem < itemsToShowOneByOne.length; currentDisplayedItem++) {
                            if (itemsToShowOneByOne[currentDisplayedItem].classList.contains('add-adv__info__item--block')) {
                                itemsToShowOneByOne[currentDisplayedItem].style.display = 'block'
                            } else
                                itemsToShowOneByOne[currentDisplayedItem].style.display = 'flex'
                        }
                    } else {
                        currentDisplayedItem++
                        if (itemsToShowOneByOne[currentDisplayedItem].classList.contains('add-adv__info__item--block')) {
                            itemsToShowOneByOne[currentDisplayedItem].style.display = 'block'
                        } else
                            itemsToShowOneByOne[currentDisplayedItem].style.display = 'flex'
                    }
                    objects[i].classList.add('used-for-showing')
                }

            });
        }
    }
    document.getElementById('house_year_of_construction').addEventListener('click', function (e) {
        e.preventDefault()
        if (!e.target.classList.contains('used-for-showing')) {
            currentDisplayedItem++
            if (itemsToShowOneByOne[currentDisplayedItem].classList.contains('add-adv__info__item--block')) {
                itemsToShowOneByOne[currentDisplayedItem].style.display = 'block'
            } else
                itemsToShowOneByOne[currentDisplayedItem].style.display = 'flex'
            e.target.classList.add('used-for-showing')
        }
    })
    add_active_class(options, 'active')
    add_active_class(objectTypeOptions, 'active_object')

// файл
    let imageSources = []
    let fileInput = document.getElementById('file-input')
    let fileDisplayArea = document.getElementById('file_display_area')

    fileInput.addEventListener('change', function (e) {
        for (let i = 0, file; file = fileInput.files[i]; i++) {
            let imageType = 'image.*';

            if (file.type.match(imageType)) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    let img = new Image();
                    img.src = e.target.result;
                    img.classList.add('ad-adv__form__image')
                    fileDisplayArea.appendChild(img);
                    imageSources.push(img.src)
                }
                reader.readAsDataURL(file)
            }
        }
    }, false)

    document.getElementById('flat_form').addEventListener('submit', function (e) {
        const addValuesToLocalStorage = (paramNames, className) => {
            paramNames.forEach(paramName => {
                const objects = document.getElementsByClassName(paramName)
                for (const obj of objects) {
                    if (obj.classList.contains(className)) {
                        localStorage.setItem(paramName, obj.innerText)
                        break
                    }
                }
            })
        }
        addValuesToLocalStorage(['who_is', 'deal_type', 'estate_type', 'if_final_price',
            'ready_to_show', 'renovation', 'has_furniture', 'sale_type'], 'active')
        addValuesToLocalStorage(['deal_object'], 'active_object')

        localStorage.setItem('ImagesForOneFlat', JSON.stringify(imageSources))
    })
    // показывать элементы формы 1 за другим
    // скрыть все элементы кроме первого
    let itemsToShowOneByOne = document.getElementsByClassName('add-adv__info__item')
    let currentDisplayedItem = 0
    for (let i = 1; i < itemsToShowOneByOne.length; i++) {
        itemsToShowOneByOne[i].style.display = 'none'
    }

    document.getElementById('form_last_item_to_show').addEventListener('click', function (e) {
        e.preventDefault()
        document.getElementsByClassName('add_adv_submit_button_field')[0].style.display = 'flex'
    })
}