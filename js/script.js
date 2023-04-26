
let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

let states = [
    'hello',
    'chooseDirection',
    'chooseExercise',
    'exercise',
    'exTwo',
    'exThree',
    'exFour',
    'exFive',
    'final'
]
let exers = [
    'one',
    'two',
    'three',
    'four',
    'five'
]

let winOne = document.querySelector('.windowDivOne')
let winTwo = document.querySelector('.windowDivTwo')
let winThree = document.querySelector('.windowDivThree')
let ex = document.querySelector('.exercises')
let winEnd = document.querySelector('.windowDivEnd')

let exOne = document.querySelector('.ex.OneEx')
let exTwo = document.querySelector('.ex.TwoEx')
let exThree = document.querySelector('.ex.ThreeEx')
let exFour = document.querySelector('.ex.FourEx')
let exFive = document.querySelector('.ex.FiveEx')

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
function showExercise(elem) {
    exOne.classList.add('none')
    exTwo.classList.add('none')
    exThree.classList.add('none')
    exFour.classList.add('none')
    exFive.classList.add('none')

    elem.classList.remove('none')
}


username.innerHTML = tg.initDataUnsafe.user.first_name

let i = 0
let state
let u = 0
let exer
// if(getCookie('category_id') != undefined) {
if(7 == 5) {
    // Экран упражнений
    i = 2
    state == states[3]
    showScreen(winThree)
    showMainButton('Далее')
} else {
    state = states[i]
    showMainButton('Далее')
}

Telegram.WebApp.onEvent ('mainButtonClicked', function() {
    i += 1;
    state = states[i]
    
    exer = exers[u]
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
        showExercise(exOne)
        // удалить после тестов:
        u += 1;
        showMainButton('Далее')
    } else if (state == states[4]){
        // Упражнения
        showScreen(ex)
        // Генерировать и проверять все упражнения
        showExercise(exTwo)
        // удалить после тестов:
        u += 1;
        showMainButton('Далее')
    } else if (state == states[5]){
        // Упражнения
        showScreen(ex)
        // Генерировать и проверять все упражнения
        showExercise(exThree)
        // удалить после тестов:
        u += 1;
        showMainButton('Далее')
    } else if (state == states[6]){
        // Упражнения
        showScreen(ex)
        // Генерировать и проверять все упражнения
        showExercise(exFour)
        // удалить после тестов:
        u += 1;
        showMainButton('Далее')
    } else if (state == states[7]){
        // Упражнения
        showScreen(ex)
        // Генерировать и проверять все упражнения
        showExercise(exFive)
        // удалить после тестов:
        u += 1;
        showMainButton('Далее')
    } else if (state == states[8]){
        // Финал
        showScreen(winEnd)
        showMainButton('Забрать скидку')
    }
})


var imageLoader = document.getElementById('file');
    imageLoader.addEventListener('change', handleImage, false);
let canvas = document.querySelectorAll('.thumbnail');


function handleImage(e){
    // console.log(e)
    for(let i = 0; i < e.target.files.length;i++) {
        let ctx = canvas[i].getContext('2d');
        let reader = new FileReader();
        reader.onload = function(event){
            let img = new Image();
            img.onload = function(){
                canvas.width = '62';
                canvas.height = '62';

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                let scale_factor = Math.min(canvas.width / img.width, canvas.height / img.height);
                
                let newWidth = img.width * scale_factor;
                let newHeight = img.height * scale_factor;
                    
                let x = (canvas.width / 2) - (newWidth / 2);
                let y = (canvas.height / 2) - (newHeight / 2);

                ctx.drawImage(img, x, y, newWidth, newHeight);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[i]); 
    }

        
}




// $(document).on('click', '#btn', function(){
//     var formData = new FormData();
//     formData.append("myFile", document.getElementById("file").files[0], 'chris1.jpg');
    
    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "index.php");
    // xhr.send(formData);
// });