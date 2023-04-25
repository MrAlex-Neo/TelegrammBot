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

let state = 'hello'



function showMainButton(text, params) {
    tg.MainButton.setText(text);
    tg.MainButton.show();
}

function closeMainButton() {

}

showMainButton('Далее', {"data-state": "hello"})



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



    
Telegram.WebApp.onEvent ('mainButtonClicked', function(){
    // tg.sendData(item)
})
    
let usercard = document.getElementById('usercard')
username.innerHTML = tg.initDataUnsafe.user.first_name

// let p = document.createElement('p')
    
    // p.innerText = `${tg.initDataUnsafe.user.First_name}`
    
usercard.appendChild(p)





// let item = "";

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