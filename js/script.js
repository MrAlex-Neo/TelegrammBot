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

showMainButton('Далее')

var a = ''
let i = 0
let state = states[i]
Telegram.WebApp.onEvent ('mainButtonClicked', function(){
    i += 1;
    state = states[i]

    console.log(state)
    if (state == states[1] ){
        // Выбор направления
        showScreen(winTwo)
        tg.MainButton.hide();
        // document.querySelectorAll('.winTwoBox').forEach((btn) => {
        //     btn.addEventListener('click', setPoints)
        //   })
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

// let state = states[0]
// tg.MainButton.hide()






   

// if (window.onblur = function (){document.title = 'Наши направления!'}) {
//     tg.MainButton.setText('Далее');
//         tg.MainButton.show();
// }















// let usercard = document.getElementById('usercard')

// let p = document.createElement('p')

// p.innerText = `${tg.initDataUnsafe.user.First_name}`

// usercard.appendChild(p)





// let item = "";


// if (window.onblur = function (){document.title = 'Первые добровольцы!'}) {
//     tg.MainButton.setText('Далее');
//         tg.MainButton.show();
// } // возможно это будет работать. Способ проверить на этой ли странице наш пользователь. Не проверить, так как к ТГ нету доступа

// if (window.onblur = function (){document.title = 'Наши направления!'}) {
//     tg.MainButton.setText('Далее');
//         tg.MainButton.show();
// } // возможно это будет работать. Способ проверить на этой ли странице наш пользователь. Не проверить, так как к ТГ нету доступа

// tg.MainButton.css({
//     "width": "100%",
//     });

// if (window.onblur = function (){document.title = 'Удачки в прокачке!'}) {
    //         tg.MainButton.setText('Завершить');
    //             tg.MainButton.show();
    //     } 
    

// let btn1 = document.getElementById('btn1')
// let btn2 = document.getElementById('btn2')
// let btn3 = document.getElementById('btn3')
// let btn4 = document.getElementById('btn4')
// let btn5 = document.getElementById('btn5')
// let btn6 = document.getElementById('btn6')

// btn1.addEventListener('click', function(){
    //     if (tg.MainButton.isVisible) {
        //         tg.MainButton.hide();
//     }
//     else {
//         tg.MainButton.setText('Вы выбрали товар 1!');
//         item = '1';
//         tg.MainButton.show();
//     }
// })
// btn2.addEventListener('click', function(){
//     if (tg.MainButton.isVisible) {
//         tg.MainButton.hide();
//     }
//     else {
//         tg.MainButton.setText('Вы выбрали товар 2!');
//         item = '2';
//         tg.MainButton.show();
//     }
// })
// btn3.addEventListener('click', function(){
//     if (tg.MainButton.isVisible) {
//         tg.MainButton.hide();
//     }
//     else {
//         tg.MainButton.setText('Вы выбрали товар 3!');
//         item = '3';
//         tg.MainButton.show();
//     }
// })
// btn4.addEventListener('click', function(){
//     if (tg.MainButton.isVisible) {
//         tg.MainButton.hide();
//     }
//     else {
//         tg.MainButton.setText('Вы выбрали товар 4!');
//         item = '4';
//         tg.MainButton.show();
//     }
// })
// btn5.addEventListener('click', function(){
//     if (tg.MainButton.isVisible) {
//         tg.MainButton.hide();
//     }
//     else {
//         tg.MainButton.setText('Вы выбрали товар 5!');
//         item = '5';
//         tg.MainButton.show();
//     }
// })
// btn6.addEventListener('click', function(){
//     if (tg.MainButton.isVisible) {
//         tg.MainButton.hide();
//     }
//     else {
//         tg.MainButton.setText('Вы выбрали товар 6!');
//         item = '6';
//         tg.MainButton.show();
//     }
// })