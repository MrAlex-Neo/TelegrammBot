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

let user_id = tg.initDataUnsafe.user.id
// let user_id = 1918321

let i = 0
let state
let exNum = 0
let answer_id = 0
let category_id 
let questions = localStorage.questions ? JSON.parse(localStorage.questions) : {} 
let User

let winOne = document.querySelector('.windowDivOne')
let winTwo = document.querySelector('.windowDivTwo')
let winThree = document.querySelector('.windowDivThree')
let ex = document.querySelector('.exercises')
let winEnd = document.querySelector('.windowDivEnd')



getUser().then((User) => {
    console.log(User)
    questions = User.questions
    exNum = 0
    state = 'chooseDirection'
    showMainButton('Готов!')
    category_id = User.category_id || 0
    console.log('category_id ' + category_id)
    if(category_id > 0) {
        console.log('Активирую направление ' + category_id)
        // Уже выбрал направление
        if (category_id == 3) {
            document.querySelector('.winTwoBox.one').classList.add('activeButton')
        } else if (category_id == 1) {
            document.querySelector('.winTwoBox.two').classList.add('activeButton')
        } else if (category_id == 2) {
            document.querySelector('.winTwoBox.three').classList.add('activeButton')
        }
    }
    // state = 'chooseExercise'
    // if(questions[0]) {
        // category_id = getCookie('category_id') || category_id
        // console.log(`chooseExercise new exNum=${exNum}`)
        // sendRequest('quizzes', "GET", {category_id})
        // .then((response) => {
        //     console.log(response) 
        //     questions = response[0].questions
        //     localStorage.setItem('questions', JSON.stringify(questions));

        //     renderQuestions()

        //     showScreen(winThree)
        //     showMainButton(`Перейти к упражнению ${exNum+1}`)
        //     state = 'exercises'
        // })
    // }

})

// let toMainEx = document.querySelectorAll('.toExercises')
// toMainEx.forEach( btn => {
//     btn.addEventListener('click', goToMainWindow)
//   })

let exsButtons = document.querySelectorAll('.btnMainOrder button').forEach( (exBtn, ind) => {
    exBtn.addEventListener('click', () => {
        exNum = ind
        console.log(`exsButtons new exNum=${exNum}`)
        showScreen(ex)
        showExercise(exNum)
        state == 'exercises'
        // showMainButton(`Перейти к упражнению ${exNum+1}`)
    })
})

function goToMainWindow() {
    showScreen(winThree)
    i = 2
    showMainButton(`Вернуться к упражнению ${exNum+1}`)
}

function setPoints(categoryId){
    if(category_id == 0) {
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
        sendRequest(`bot-users/${user_id}/`, "PUT", {is_verified :true, category_id})
        showMainButton('Далее')
    }
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

    let answered = exs[ind].getAttribute('data-answered') || false
    if(answered == true) {
        exNum = exNum+1
        console.log(`showExercise new exNum=${exNum}`)
        showMainButton(`Перейти к упражнению ${exNum+1}`)
    }
}

async function sendRequest(url, method, data) {
    url = `https://p-api2.tehnikum.school/api/${url}`
    
    if(method == "POST" || method == "PUT") {
        let response = await fetch(url, {
            method: method,
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
        let answered = exs[ind].getAttribute('data-answered') || false
        if(!answered) {
            exs[ind].querySelectorAll('.exAnswers button').forEach( (a, index) => {
                a.innerHTML = q.answers[index].answer
                a.setAttribute('data-answer_id', q.answers[index].answer_id)
                a.setAttribute('data-question_id', q.question_id)
                a.setAttribute('data-index', ind)
                
                a.addEventListener('click', () => {
                    // Обработка выбранного пользователем ответа
                    let ex_id = a.getAttribute('data-index')
                    let answered = querySelectorAll('.ex')[ex_id].getAttribute('data-answered')
                    if(!answered) {
                        let answer_id = a.getAttribute('data-answer_id')
                        let question_id = a.getAttribute('data-question_id')
                        console.log(a)
                        sendRequest(`user-answers/`, "POST", {user_id, question_id, answer_id})
                        .then((response) => {
                            console.log(response)
                            document.querySelectorAll('.ex')[ex_id].setAttribute('data-answered', true)
                            if(response.is_correct) {
                                a.classList.add('trueBar')
                                a.classList.remove('emptyBar')
                                let progresses = document.querySelectorAll('.btnMainOrder')
                                progresses.forEach( progress => {
                                    let bars = progress.querySelectorAll('div')
                                    let bar = bars[ex_id]
                                    bar.classList.add('trueBar')
                                    bar.classList.remove('emptyBar')
                                })
                            } else {
                                a.classList.add('wrongBar')
                                a.classList.remove('emptyBar')
                                let progresses = document.querySelectorAll('.btnMainOrder')
                                progresses.forEach( progress => {
                                    let bars = progress.querySelectorAll('div')
                                    let bar = bars[ex_id]
                                    bar.classList.add('wrongBar')
                                    bar.classList.remove('emptyBar')
                                })
                                let correct_answer = response.answer_id
                                document.querySelector(`.exAnswers button[data-answer_id="${correct_answer}"]`).classList.add('trueBar')
                                document.querySelector(`.exAnswers button[data-answer_id="${correct_answer}"]`).classList.remove('emptyBar')
                            }
                            if(exNum == 5) {
                                //TODO: возвращать на неотвеченный вопрос 
                                state == 'final'
                                showMainButton(`3.. 4... Закончили!`)
                            } else {
                                exNum = exNum+1
                                console.log(`renderQuestions new exNum=${exNum}`)
                                showMainButton(`Перейти к упражнению ${exNum+1}`)
                            }
                        })
                    } else {
                        
                    }
                })
            })
        }
    })
}

async function getUser() {
    let response = await sendRequest('get-user/', "GET", {user_id})
    return response[0]
}


username.innerHTML = tg.initDataUnsafe.user.first_name


// if(getCookie('category_id') != undefined) {



Telegram.WebApp.onEvent('mainButtonClicked', function() {    
    console.log({state, i, exNum})
    if (state == 'chooseDirection'){
        // Выбор направления
        state = 'chooseExercise'
        showScreen(winTwo)
        if(category_id > 0) {
            showMainButton('Далее')
        } else {
            tg.MainButton.hide();
        }
    } else if (state == 'chooseExercise'){
        // Выбор Упражнения
        category_id = getCookie('category_id') || category_id
        exNum = 0
        console.log(`chooseExercise new exNum=${exNum}`)
        sendRequest('quizzes', "GET", {category_id})
        .then((response) => {
            console.log(response) 
            questions = response[0].questions
            localStorage.setItem('questions', JSON.stringify(questions));

            renderQuestions()

            showScreen(winThree)
            showMainButton(`Перейти к упражнению ${exNum+1}`)
            state = 'exercises'
        })
    } else if (state == 'exercises'){
        
        // Упражнения
        showScreen(ex)

        //Показываю запрашиваемое упражнение
        console.log(`exercises ` + exNum)
        showExercise(exNum)
        
        
        if(exNum == 5) {
            //TODO: возвращать на неотвеченный вопрос 
            state == 'final'
            showMainButton(`3.. 4... Закончили!`)
        } else {
            // showMainButton(`Перейти к упражнению ${exNum+1}`)
        }
    } else if (state == 'final'){
        // Финал
        showScreen(winEnd)
        i = 1
        showMainButton('Забрать скидку')
    }
})