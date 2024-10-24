import { backend } from 'declarations/backend';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentValue = '';
let operator = '';
let previousValue = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9' || value === '.') {
            currentValue += value;
            display.value = currentValue;
        } else if (['+', '-', '*', '/'].includes(value)) {
            operator = value;
            previousValue = currentValue;
            currentValue = '';
        } else if (value === '=') {
            calculate();
        } else if (value === 'C') {
            clear();
        }
    });
});

async function calculate() {
    if (previousValue && currentValue && operator) {
        const x = parseFloat(previousValue);
        const y = parseFloat(currentValue);
        let result;

        switch (operator) {
            case '+':
                result = await backend.add(x, y);
                break;
            case '-':
                result = await backend.subtract(x, y);
                break;
            case '*':
                result = await backend.multiply(x, y);
                break;
            case '/':
                const divisionResult = await backend.divide(x, y);
                result = divisionResult[0] !== null ? divisionResult[0] : 'Error';
                break;
        }

        display.value = result;
        currentValue = result.toString();
        previousValue = '';
        operator = '';
    }
}

function clear() {
    currentValue = '';
    previousValue = '';
    operator = '';
    display.value = '';
}
