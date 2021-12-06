const roomNumberString = {
    1: 'Однокомнатные',
    2: 'Двухкомнатные',
    3: 'Трехкомнатные',
    4: 'Четырехкомнатные',
    5: 'Пятикомнатные',
    6: 'Шестикомнатные',
    7: 'Семикомнатные',
    8: 'Восьмикомнатные',
    9: 'Девятикомнатные',
    10: 'Десятикомнатные'
}

function getQueryString() {
    let result = {}, queryString = location.search.slice(1),
        re = /([^&=]+)=([^&]*)/g, m;

    while (m = re.exec(queryString)) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    return result;
}

function addValueToDocument(elementClass, elementValueName = undefined) {
    const elements = document.getElementsByClassName(elementClass)
    for (const element of elements) {
        if (elementValueName !== undefined) {
            element.innerHTML = elementValueName
        } else {
            element.innerHTML = params[elementClass]
        }
    }
}

params = getQueryString()

const valuesToAdd = ['flat_description', 'flat_area_all', 'flat_ceiling_height', 'flat_room_number', 'flat_floor_number',
    'flat_total_floor_number', 'flat_year_of_building', 'flat_kitchen_area', 'flat_living_area', 'house_year_of_construction']

for (const value of valuesToAdd) {
    addValueToDocument(value)
}
//price
flatPriceNumber = params['price']
switch (params['select_price']) {
    case 'dollar':
        flatPriceNumber += ' $'
        break
    case 'ruble':
        flatPriceNumber += ' ₽'
        break
    case 'MDL':
        flatPriceNumber += ' MDL'
        break
}
addValueToDocument('flat_price', flatPriceNumber)
params.flat_price = flatPriceNumber
//room number
let flatRoomNumber = params.flat_room_number
if (flatRoomNumber > 10) {
    flatRoomNumber = 'Десяти и болеее комнатные'
} else {
    flatRoomNumber = roomNumberString[params.flat_room_number]
}
addValueToDocument('room_number_string', flatRoomNumber)
params.room_number_string = flatRoomNumber
// flat-description
let flatDescriptionText = params['flat_description'].replaceAll('+', ' ')
addValueToDocument('flat_description', flatDescriptionText)
params.flat_description = flatDescriptionText

//location
let flatLocationText = params['flat_location'].replaceAll('+', ' ')
addValueToDocument('flat_location', flatLocationText)
params.flat_location = flatLocationText
mapboxgl.accessToken = 'pk.eyJ1IjoibWlsZW5pdW1taSIsImEiOiJja3dzYWdkYm0wYnBoMnltaGtwZDh1cDB1In0.2ZR4ZsyQr3QZ2G4Elthzew';
flatCoords = JSON.parse(localStorage.getItem('address_coords'))
params.flat_coords = flatCoords
let map = new mapboxgl.Map({
    container: 'add_adv_map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [flatCoords.lng, flatCoords.lat],
    zoom: 16
})
let marker = new mapboxgl.Marker()
    .setLngLat([flatCoords.lng, flatCoords.lat])
    .addTo(map)


//slider
const sliderContainer = document.getElementById('slider-container')
const sliderTemplate = document.getElementById('slider-template')
let div = sliderTemplate.content.querySelector('div')
// images
const imageSources = JSON.parse(localStorage.getItem('ImagesForOneFlat'))
params.image_sources = imageSources
if (imageSources.length < 3)
    for (let i = imageSources.length; i < 3; i++) {
        imageSources[i] = 'images/display_flat/image_placeholder.jpg'
    }
const imageNumber = imageSources.length

for (let i = 0; i < imageNumber; i++) {
    //создаем дубликат узла
    div = document.importNode(div, true)
    const innerDiv = div.querySelector('div')
    const img = div.querySelector('img')
    innerDiv.textContent = `${i + 1} / ${imageNumber}`
    img.setAttribute('src', imageSources[i])
    sliderContainer.appendChild(div)
}

// теги
const dontDisplayTag = (tagClass) => {
    const tags = document.getElementsByClassName(tagClass)
    for (const tag of tags) {
        tag.style.display = 'none'
    }
}
//Готовы показать онлайн
const readyToShow = localStorage.getItem('ready_to_show')
params.ready_to_show = readyToShow
if (readyToShow === 'Нет') {
    dontDisplayTag('flat_page__tags__show_online')
}
// Торг
const ifFinalPrice = localStorage.getItem('if_final_price')
params.if_final_price = ifFinalPrice
if (ifFinalPrice === 'Окончательная') {
    dontDisplayTag('flat_page__tags__bargaining')
}
// Мебель
const hasFurniture = localStorage.getItem('has_furniture')
params.has_furniture = hasFurniture
if (hasFurniture === 'нет') {
    dontDisplayTag('flat_page__tags__has_furniture')
}
// Ремонт
const hasRenovation = localStorage.getItem('renovation')
params.has_renovation = hasRenovation
if (hasRenovation === 'Требуется') {
    dontDisplayTag('flat_page__tags__has_renovation')
}
// Владелец
const whoIsOwner = localStorage.getItem('who_is')
params.who_is_owner = whoIsOwner
if (whoIsOwner === 'Риэлтор') {
    dontDisplayTag('flat_page__tags__who_is')
}
//свободная продажа
const saleType = localStorage.getItem('sale_type')
params.sale_type = saleType
if (saleType === 'Альтернативная') {
    dontDisplayTag('flat_page__tags__easy_sale')
}
//phone number
let contactNumber = params['contact_number'].replaceAll('+', ' ')
contactNumber = '+' + contactNumber

const phoneToCall = 'tel:' + contactNumber
showPhoneNumber(contactNumber, 'flat_phone_number-1', phoneToCall)
showPhoneNumber(contactNumber, 'flat_phone_number-2', phoneToCall)
params.phone_number = contactNumber

//deal_object
const dealObject = localStorage.getItem('deal_object')
dealObjectString = '-комнатная квартира'
if (dealObject === 'Дом') {
    dealObjectString = '-комнатный дом'
}
document.getElementById('deal_object_string').innerText = dealObjectString
document.getElementById('deal_object').innerText = dealObject
params.deal_object_string = dealObjectString
params.deal_object = dealObject

let advNumber = localStorage.getItem('adv_number')
if (advNumber !== undefined) {
    advNumber = 1 + parseInt(advNumber)
} else {
    advNumber = 1
}
localStorage.setItem('adv_number', advNumber)
let flatStorageName = 'flat_advertisement-' + advNumber
localStorage.setItem(flatStorageName, JSON.stringify(params))
console.log(JSON.parse(localStorage.getItem('flat_advertisement-1')))
