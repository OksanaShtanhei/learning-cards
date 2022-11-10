const form = document.querySelectorAll('.form-inputs')
const btn = document.querySelector('.btnSubmit')
const out = document.querySelector('.out')
const cardItem = document.querySelector('.cardItem')
const clearStorage = document.querySelector('.clearStorage')
const renderBtn = document.querySelector('.rendering')
const btnLng = document.querySelectorAll('.btnLng')
const btnCarousel = document.querySelectorAll('.btnCarousel')
let from = 0
let to = 1
let current
let flag = 'RUS'
let dictionary = []

document.addEventListener("DOMContentLoaded", () => {
    Object.keys(localStorage).forEach(function(key){
        dictionary.push(localStorage.getItem(key));
     });
     getRandom()  
})

btn.addEventListener('click', addWord)

function addWord(e){
    e.preventDefault()
    let arr = []
    for(let i = 0; i < form.length; i++){
        if(form[i].value === ''){
            alert('Enter a word')
        }
        arr.push(form[i].value) 
        localStorage.setItem(arr[0], JSON.stringify(arr))  
        form[i].value = ''
    }
}

function renderDictionary(){
    out.innerHTML = ''
    Object.values(localStorage).forEach(function(value){
        let x = JSON.parse(value)
            out.innerHTML += `<li class="d-flex justify-content-between" id="${x[0]}">
                <h5 class="">${x[0]}  ${x[1]} </h5>
                <button type="button" class="btn btn-danger my-1 p-1" data-dismiss="modal" onclick="removeItem(event)">Remove</button>
            </li>`
     });  
     
}

renderBtn.addEventListener('click', () => {
    renderDictionary()
})

function removeItem(e) {
    let target = e.target.parentNode.id
    Object.keys(localStorage).forEach(function(key){
        if(target === key){
            localStorage.removeItem(key)
        }
     });
    renderDictionary()
}

clearStorage.addEventListener('click', () => {
    localStorage.clear()
    dictionary = []
})

btnLng.forEach(el => {
    el.addEventListener('click', (e) => {
        console.log(e.target)
        let currentLng = e.target.id
        if(currentLng === 'rus'){
            from = 0
            to = 1
            flag = 'RUS' 
            cardItem.innerHTML = `<h5>${JSON.parse(dictionary[current])[from]}</h5>`
        } else {
            from = 1
            to = 0
            flag = 'ENG'
            cardItem.innerHTML = `<h5>${JSON.parse(dictionary[current])[from]}</h5>`
        } 
    })
})

function getRandom(){
    let rand = Math.floor(Math.random() * localStorage.length);
    current = rand
    let randomItem = dictionary[rand]
    cardItem.innerHTML = `<h5>${JSON.parse(randomItem)[from]}</h5>`
}

cardItem.addEventListener('click', (e) => {
    if(cardItem.innerHTML = `<h5>${JSON.parse(dictionary[current])[to]}</h5>`){
        cardItem.innerHTML = `<h5>${JSON.parse(dictionary[current])[from]}</h5>`
    }
    if(cardItem.innerHTML = `<h5>${JSON.parse(dictionary[current])[from]}</h5>`){
        cardItem.innerHTML = `<h5>${JSON.parse(dictionary[current])[to]}</h5>`
    }
})

btnCarousel.forEach(el => {
    el.addEventListener('click', (e) => {
        if(e.target.id == 'next'){
            if(current >= dictionary.length-1){
                current = 0
            } else {
                current++
            }
        } 
        if(e.target.id == 'prev'){
            if(current <= 0){
                current = dictionary.length-1
            } else {
                current--
            }
        } 
        cardItem.innerHTML = `<h5>${JSON.parse(dictionary[current])[from]}</h5>`
    }) 
})
