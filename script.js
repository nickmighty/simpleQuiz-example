const body = document.querySelector("body");
const clockDiv = document.createElement("div");
const scoreDiv = document.createElement("div");
const gameCanvas = document.createElement("div");


body.setAttribute("style", "padding: 1rem 30%");

const clockScoreDefault = "width: 50px; height: 50px; border: 1px solid black; display: flex; justify-content: center; align-items: center;"
clockDiv.setAttribute("style", clockScoreDefault + "float: right;");
scoreDiv.setAttribute("style", clockScoreDefault + "float: left;");
gameCanvas.setAttribute("style", "max-width: 40rem; height: 20rem; border: 1px solid black; margin-top: 5rem; display: flex; flex-direction: column;");

let currentQuestion = 0;
let score = 0;
let clock = 0;

const updateScore = (num) => scoreDiv.textContent = score += num;
const updateTime = (num) => clockDiv.textContent = clock += num;
updateScore(score);
updateTime(5);

body.append(scoreDiv, clockDiv, gameCanvas);

function startClock(currentTime) {
    if (currentTime <= 0) 
        return gameOver();
   
    setTimeout(() => {    
        updateTime(-1);
        startClock(clock);
    }, 1000)
}

function gameOver() {
    console.log("socre -> " + score);
}

const answer = () => {
    const answers = ["A", "B", "C", "D"];
    const truth = () => Math.floor(Math.random() * answers.length);
    let randomTruth;
    return answers.reduce((acc, key, index) => {
        if (index === 0)
            randomTruth = truth();
        return { ...acc, [key]: randomTruth === index };
    }, {});
}
const randomQuestions = new Array(6).fill("").map((a, i) => {
    return {
        question: `Random question number #${i+1}`,
        answer: answer()
    }
})

function showQuestions(questionNumber) {
    const nextQuestion = questionNumber + 1;
    const questionDiv = document.createElement("div");
    questionDiv.setAttribute("style", "margin: auto; font-size: 1.5rem")
    const { question, answer } = randomQuestions[questionNumber];
    gameCanvas.append(questionDiv);
    questionDiv.innerText = question;
    for (const [key, value] of Object.entries(answer)) {
        console.log(key)
        const answerDiv = document.createElement("button");
        answerDiv.setAttribute("style", "margin: auto; padding: .25rem 4rem; background: none; border: 1px solid teal; cursor:pointer;");
        answerDiv.innerHTML = key
        answerDiv.addEventListener("click", (event) => {
            const parent = event.target.parentElement
            const childrenArray = Array.from(parent.childNodes);
            childrenArray.forEach((e) => e.remove());
            if (answer[key]) {
                score += 10;
            }
            showQuestions(nextQuestion);
            console.log("click " + answer[key]);
        });



        gameCanvas.append(answerDiv);
    }
}

startClock();
showQuestions(currentQuestion);