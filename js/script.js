
let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

let states = [
    'hello',
    'chooseDirection',
    'chooseExercise',
    'exercise',
    'final'
]

let winOne = document.querySelector('.windowDivOne')
let winTwo = document.querySelector('.windowDivTwo')
let winThree = document.querySelector('.windowDivThree')
let ex = document.querySelector('.exercises')
let winEnd = document.querySelector('.windowDivEnd')

function setPoints(categoryId){
    showMainButton('Далее')
    document.querySelectorAll('.winTwoBox').forEach( btn => {
        btn.classList.remove('activeButton')
    })
    if (categoryId == 3) {
        document.querySelector('.winTwoBox.one').classList.add('activeButton')
    } else if (categoryId == 1) {
        document.querySelector('.winTwoBox.two').classList.add('activeButton')
    } else if (categoryId == 2) {
        document.querySelector('.winTwoBox.three').classList.add('activeButton')
    }
    // Записать categoryId в кукис
    setCookie('category_id', categoryId)
}

function showScreen(elem) {
    winOne.classList.add('none')
    winTwo.classList.add('none')
    winThree.classList.add('none')
    ex.classList.add('none')
    winEnd.classList.add('none')

    elem.classList.remove('none')
}

function showMainButton(text) {
    tg.MainButton.setText(text);
    tg.MainButton.show();
}


username.innerHTML = tg.initDataUnsafe.user.first_name

let i = 0
let state
// if(getCookie('category_id') != undefined) {
//     // Экран упражнений
//     console.log(" ятут")
//     i = 2
//     state == states[3]
//     showScreen(winThree)
// } else {
//     state = states[i]
//     showMainButton('Далее')
// }

Telegram.WebApp.onEvent ('mainButtonClicked', function() {
    i += 1;
    state = states[i]

    console.log(state)
    if (state == states[1] ){
        // Выбор направления
        showScreen(winTwo)
        tg.MainButton.hide();
    }
    else if (state == states[2]){
        // Выбор Упражнения
        showScreen(winThree)

        // удалить после тестов:
        showMainButton('Далее')
    } else if (state == states[3]){
        // Упражнения
        showScreen(ex)
        // Генерировать и проверять все упражнения

        // удалить после тестов:
        showMainButton('Далее')
    } else if (state == states[4]){
        // Финал
        showScreen(winEnd)
        showMainButton('Забрать скидку')
        state = states[2]
    }
})