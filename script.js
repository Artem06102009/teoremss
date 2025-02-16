const problemText = document.getElementById('problem-text');
const canvas = document.getElementById('triangle-canvas');
const ctx = canvas.getContext('2d');
const stepInputsDiv = document.getElementById('step-inputs');
const resultText = document.getElementById('result');
const newProblemButton = document.getElementById('new-problem-button');

let currentProblem = {};
let currentStep = 0;
let stepInputs = [];

function drawTriangle(a, b, c, angleA, angleB, angleC) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.min(150 / Math.max(a, b, c), 1) + 10;
    const offsetX = 30;
    const offsetY = 120;

    const radA = angleA * Math.PI / 180;
    const radB = angleB * Math.PI / 180;
    const radC = angleC * Math.PI / 180;

    const x1 = offsetX;
    const y1 = offsetY;
    const x2 = offsetX + b * scale;
    const y2 = offsetY;
    const x3 = offsetX + a * scale * Math.cos(radC);
    const y3 = offsetY - a * scale * Math.sin(radC);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.stroke();

    ctx.fillText("a", (x1 + x3) / 2, (y1 + y3) / 2 - 10);
    ctx.fillText("b", (x1 + x2) / 2, y1 + 10);
    ctx.fillText("c", (x2 + x3) / 2, (y2 + y3) / 2 - 10);
    ctx.fillText("A", x3 - 10, y3 + 10);
    ctx.fillText("B", x2 + 10, y2 + 10);
    ctx.fillText("C", x1 - 10, y1 + 10);
}

function generatePythagoreanProblem() {
    const problems = [
        {
            text: "Катеты прямоугольного треугольника равны 7 и 24. Найдите гипотенузу этого треугольника.",
            a: 7,
            b: 24,
            correctAnswer: 25,
            steps: [
                { label: "a² + b² = ", answer: 7*7 + 24*24 },
                { label: "c² = ", answer: 625 },
                { label: "c = √", answer: 25 }
            ]
        },
        {
            text: "В прямоугольном треугольнике катет и гипотенуза равны 7 и 25 соответственно. Найдите другой катет этого треугольника.",
            a: 7,
            c: 25,
            correctAnswer: 24,
            steps: [
                { label: "c² - a² = ", answer: 25*25 - 7*7 },
                { label: "b² = ", answer: 576 },
                { label: "b = √", answer: 24 }
            ]
        },
        {
            text: "Катеты прямоугольного треугольника равны 3 и 4. Найдите гипотенузу этого треугольника.",
            a: 3,
            b: 4,
            correctAnswer: 5,
            steps: [
                { label: "a² + b² = ", answer: 3*3 + 4*4 },
                { label: "c² = ", answer: 25 },
                { label: "c = √", answer: 5 }
            ]
        },
        {
            text: "В прямоугольном треугольнике катет и гипотенуза равны 6 и 10 соответственно. Найдите другой катет этого треугольника.",
            a: 6,
            c: 10,
            correctAnswer: 8,
            steps: [
                { label: "c² - a² = ", answer: 10*10 - 6*6 },
                { label: "b² = ", answer: 64 },
                { label: "b = √", answer: 8 }
            ]
        },
        {
            text: "Катеты прямоугольного треугольника равны 5 и 12. Найдите гипотенузу этого треугольника.",
            a: 5,
            b: 12,
            correctAnswer: 13,
            steps: [
                { label: "a² + b² = ", answer: 5*5 + 12*12 },
                { label: "c² = ", answer: 169 },
                { label: "c = √", answer: 13 }
            ]
        }
    ];

    const problem = problems[Math.floor(Math.random() * problems.length)];
    let a, b, c;

    if (problem.a && problem.b) {
        a = problem.a;
        b = problem.b;
        c = problem.correctAnswer;
    } else {
        a = problem.a;
        c = problem.c;
        b = problem.correctAnswer;
    }

    drawTriangle(a, b, c, 90, 45, 45);
    return {
        problem: problem.text,
        correctAnswer: problem.correctAnswer,
        type: 'pythagorean',
        steps: problem.steps
    };
}

function generateCosineProblem() {
    const problems = [
        {
            text: "В треугольнике ABC известно, что AB = 5, BC = 10, AC = 11. Найдите косинус угла ABC",
            AB: 5,
            BC: 10,
            AC: 11,
            correctAnswer: 0.07,
            steps: [
                { label: "AC² - AB² - BC² = ", answer: 11*11 - 5*5 - 10*10 },
                { label: "-2 * AB * BC = ", answer: -2 * 5 * 10 },
                { label: "cos(ABC) = (ответ 1) / (ответ 2) = ", answer: ((11*11 - 5*5 - 10*10) / (-2 * 5 * 10))}
            ]
        },
        {
            text: "В треугольнике ABC известно, что AB = 7, BC = 15, ∠A = 60°. Найдите сторону AC.",
            AB: 7,
            BC: 15,
            angleA: 60,
            correctAnswer: 13.42,
            steps: [
                { label: "AB² + BC² - (2 * AB * BC * cos(A)) = ", answer: 7*7 + 15*15 - (2 * 7 * 15 * Math.cos(60 * Math.PI / 180)) },
                { label: "AC² = ", answer: 180.5 },
                { label: "AC = √", answer: Math.sqrt(7*7 + 15*15 - (2 * 7 * 15 * Math.cos(60 * Math.PI / 180)))}
            ]
        },
        {
            text: "В треугольнике ABC известно, что AB = 4, BC = 6, AC = 5. Найдите косинус угла BAC",
            AB: 4,
            BC: 6,
            AC: 5,
            correctAnswer: 0.125,
            steps: [
                { label: "BC² - AB² - AC² = ", answer: 6*6 - 4*4 - 5*5 },
                { label: "-2 * AB * AC = ", answer: -2 * 4 * 5 },
                { label: "cos(BAC) = (ответ 1) / (ответ 2) = ", answer: (6*6 - 4*4 - 5*5) / (-2 * 4 * 5)}
            ]
        },
    ];

    const problem = problems[Math.floor(Math.random() * problems.length)];

    let AB, BC, AC, angleA, correctAnswer, steps;
    AB = problem.AB;
    BC = problem.BC;
    AC = problem.AC;
    angleA = problem.angleA;
    correctAnswer = problem.correctAnswer;

    drawTriangle(BC, AC, AB, 60, 60, 60);

    return {
        problem: problem.text,
        correctAnswer: problem.correctAnswer,
        type: 'cosine',
        steps: problem.steps
    };
}

function generateProblem() {
    const problemTypeChoice = Math.random() < 0.5 ? 1 : 2; // 1: Pythagorean, 2: Cosine
    let problem;

    if (problemTypeChoice === 1) {
        problem = generatePythagoreanProblem();
    } else {
        problem = generateCosineProblem();
    }

    currentProblem = problem;
    currentStep = 0;
    displayProblem();
}

function displayProblem() {
    problemText.textContent = currentProblem.problem;
    resultText.textContent = '';
    stepInputsDiv.innerHTML = '';
    stepInputs = [];

    showStepInput();
}

function showStepInput() {
    stepInputsDiv.innerHTML = '';
    stepInputs = [];

    if (currentStep < currentProblem.steps.length) {
        const step = currentProblem.steps[currentStep];

        const inputContainer = document.createElement('div');
        inputContainer.classList.add('step-input-container');

        const label = document.createElement('label');
        label.textContent = step.label;
        inputContainer.appendChild(label);

        const input = document.createElement('input');
        input.type = 'number';
        input.step = '0.01';
        inputContainer.appendChild(input);

        const checkButton = document.createElement('button');
        checkButton.textContent = "Проверить";
        checkButton.addEventListener('click', () => checkAnswer(input, step.answer));
        inputContainer.appendChild(checkButton);

        stepInputsDiv.appendChild(inputContainer);
    } else {
        resultText.textContent = "Задача решена!";
    }
}

function checkAnswer(input, correctAnswer) {
    const userAnswer = parseFloat(input.value);
    const tolerance = 0.1;

    if (Math.abs(userAnswer - correctAnswer) < tolerance) {
        resultText.textContent = 'Правильно! Переходим к следующему шагу.';
        resultText.style.color = 'green';
        currentStep++;
        showStepInput();
    } else {
        resultText.textContent = `Неправильно. Попробуйте еще раз.`;
        resultText.style.color = 'red';
    }
}

newProblemButton.addEventListener('click', generateProblem);

function updateHistory() {
    historyList.innerHTML = '';
    problemHistory.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Задача ${index + 1}: ${item.problem} - Правильный ответ: ${item.correctAnswer}`;
        historyList.appendChild(listItem);
    });
}

generateProblem();