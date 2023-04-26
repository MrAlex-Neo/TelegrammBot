let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

let states = [
    'hello',
    'chooseDirection',
    'chooseExercise',
    'exercises',
    'final'
]

// let user_id = tg.initDataUnsafe.user.id
let user_id = 1918321

let i = 0
let state
let exNum = 0
let answer_id = 0
let category_id = getCookie('category_id') || 1
let questions = localStorage.questions ? JSON.parse(localStorage.questions) : {} 
if(questions[0]) {
    // console.log('renderQuestions')
    renderQuestions()
}

let winOne = document.querySelector('.windowDivOne')
let winTwo = document.querySelector('.windowDivTwo')
let winThree = document.querySelector('.windowDivThree')
let ex = document.querySelector('.exercises')
let winEnd = document.querySelector('.windowDivEnd')

let toMainEx = document.querySelectorAll('.toExercises')
toMainEx.forEach( btn => {
    btn.addEventListener('click', goToMainWindow)
  })

let exsButtons = document.querySelectorAll('.btnMainOrder button').forEach( (exBtn, ind) => {
    exBtn.addEventListener('click', () => {
        exNum = ind
        showScreen(ex)
        showExercise(exNum)
        // showMainButton(`Перейти к упражнению ${exNum+1}`)
    })
})

function goToMainWindow() {
    showScreen(winThree)
    i = 2
    showMainButton(`Вернуться к упражнению ${exNum+1}`)
}

function setPoints(categoryId){
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
    category_id = categoryId
    setCookie('category_id', categoryId)
    showMainButton('Далее')
}

function showScreen(elem) {
    winOne.classList.add('none')
    winTwo.classList.add('none')
    winThree.classList.add('none')
    ex.classList.add('none')
    winEnd.classList.add('none')

    elem.classList.remove('none')
    if(ex) {
        tg.MainButton.hide();
    }
}

function showMainButton(text) {
    tg.MainButton.setText(text);
    tg.MainButton.show();
}

function showExercise(ind) {
    let exs = document.querySelectorAll('.ex')
    exs.forEach( exercise => {
        exercise.classList.add('none')
    })
    exs[ind].classList.remove('none')
}

async function sendRequest(url, method, data) {
    url = `https://p-api2.tehnikum.school/api/${url}`
    
    if(method == "POST") {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    
        response = await response.json()
        return response
    } else if(method == "GET") {
        url = url+"?"+ new URLSearchParams(data)
        let response = await fetch(url, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        response = await response.json()
        return response
    }
}

function renderQuestions() {
    let exs = document.querySelectorAll('.ex')
    questions.forEach( (q, ind) => {
        exs[ind].querySelector('h3').innerHTML = q.question
        console.log(q)
        exs[ind].querySelectorAll('.exAnswers button').forEach( (a, index) => {
            a.innerHTML = q.answers[index].answer
            a.setAttribute('data-answer_id', q.answers[index].answer_id)
            a.setAttribute('data-question_id', q.question_id)
            
            a.addEventListener('click', () => {
                // Обработка выбранного пользователем ответа
                let answer_id = a.getAttribute('data-answer_id')
                let question_id = a.getAttribute('data-question_id')
                
                sendRequest(`user-answers/`, "POST", {user_id, question_id, answer_id})
                .then((response) => {
                    console.log(response)

                    if(response.is_correct) {
                        a.classList.add('trueBar')
                        a.classList.remove('emptyBar')
                    } else {
                        a.classList.add('wrongBar')
                        a.classList.remove('emptyBar')
                        let correct_answer = response.answer_id
                        document.querySelector(`.exAnswers button[data-answer_id="${correct_answer}"]`).classList.add('trueBar')
                        document.querySelector(`.exAnswers button[data-answer_id="${correct_answer}"]`).classList.remove('emptyBar')
                    }
                    if(exNum == 4) {
                        //TODO: возвращать на неотвеченный вопрос 
                        showMainButton(`3.. 4... Закончили!`)
                    } else {
                        // exNum = exNum+1
                        showMainButton(`Перейти к упражнению ${exNum+2}`)
                    }
                    
                })
            })
        })
    })
}


username.innerHTML = tg.initDataUnsafe.user.first_name


// if(getCookie('category_id') != undefined) {
if(7 == 5) {
    // Экран упражнений
    i = 2
    state == states[3]
    showScreen(winThree)
    showMainButton('Далее')
} else {
    state = states[i]
    showMainButton('Готов!')
}

Telegram.WebApp.onEvent('mainButtonClicked', function() {
    i += 1;
    state = states[i]
    
    console.log({
        state, i, exNum
    })
    if (state == states[1] ){
        // Выбор направления
        showScreen(winTwo)
        tg.MainButton.hide();
    }
    else if (state == states[2]){
        // Выбор Упражнения
        category_id = getCookie('category_id') || category_id

        sendRequest('quizzes', "GET", {category_id})
        .then((response) => {
            console.log(response) 
            questions = response[0].questions
            localStorage.setItem('questions', JSON.stringify(questions));

            renderQuestions()

            showScreen(winThree)
            showMainButton(`Перейти к упражнению ${exNum+1}`)
        })
    } else if (state == states[3]){
        i -= 1;
        state = states[i]
        // Упражнения
        showScreen(ex)

        //Показываю запрашиваемое упражнение
        showExercise(exNum)
        
        if(exNum == 4) {
            //TODO: возвращать на неотвеченный вопрос 
            showMainButton(`3.. 4... Закончили!`)
        } else {
            // showMainButton(`Перейти к упражнению ${exNum+1}`)
        }
    } else if (state == states[4]){
        // Финал
        showScreen(winEnd)
        i = 1
        showMainButton('Забрать скидку')
    }
})