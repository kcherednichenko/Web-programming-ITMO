window.onload = function () {
    const options = document.getElementsByClassName("add-adv__option")
    const objectTypeOptions = document.getElementsByClassName("object-options__item")

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
                displayNextAddAdvItem()
            });
        }
    }

    function displayNextAddAdvItem() {
        for (const item of addAdvItems) {
            if (item.style.display === 'none') {
                item.style.display = 'flex'
                break
            }
        }
    }

    const addAdvItems = document.getElementsByClassName('add-adv__info__item')
    // for (let i = 1; i < addAdvItems.length; i++){
    //     addAdvItems[i].style.display = 'none'
    // }

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

    // const flatRoomAdvObject = document.getElementById('flat_adv_house_type')
    // flatRoomAdvObject.addEventListener('click', function (e) {
    //     e.preventDefault()
    //     const objectNotAssignableToHouseType = document.getElementsByClassName('for-room-house-only-Object')
    //     if (flatRoomAdvObject.classList.contains('notAssignableObjectsDeleted')) {
    //         for (const obj of objectNotAssignableToHouseType) {
    //             obj.style.visibility = 'visible'
    //             obj.style.height = '40px'
    //             obj.required = true
    //             obj.style.marginBottom = '8px'
    //             flatRoomAdvObject.classList.remove('notAssignableObjectsDeleted')
    //         }
    //     } else {
    //         for (const obj of objectNotAssignableToHouseType) {
    //             obj.style.visibility = 'hidden'
    //             obj.style.height = '0'
    //             obj.required = false
    //             flatRoomAdvObject.classList.add('notAssignableObjectsDeleted')
    //         }
    //
    //     }
    // })
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
            'ready_to_show', 'renovation', 'has_furniture'], 'active')
        addValuesToLocalStorage(['deal_object'], 'active_object')

        localStorage.setItem('ImagesForOneFlat', JSON.stringify(imageSources))
    })
}