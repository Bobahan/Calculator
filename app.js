const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operations]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');

const previousConsoleTextElement = document.querySelector('[data-previous-console]');
const currentConsoleTextElement = document.querySelector('[data-current-console]');

class Calculator {
    constructor(previousConsoleTextElement, currentConsoleTextElement) {
        this.previousConsoleTextElement = previousConsoleTextElement;
        this.currentConsoleTextElement = currentConsoleTextElement;
        this.clear();
    }

    clear() {
        this.currentConsole = '';
        this.prevConsole = '';
        this.operations = undefined;
    }

    delete() {
        this.currentConsole = this.currentConsole.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentConsole.includes('.')) return
        this.currentConsole = this.currentConsole.toString() + number.toString()
    }

    chooseOperations(operations) {
        if(this.currentConsole === '') return
        if(this.prevConsole != '') {
            this.compute()
        }
        this.operations = operations;
        this.prevConsole = this.currentConsole
        this.currentConsole = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevConsole)
        const current = parseFloat(this.currentConsole)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operations) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentConsole = computation;
        this.operations = undefined;
        this.prevConsole = '';
    }

    updateDisplay() {
        this.currentConsoleTextElement.innerText = this.currentConsole
        this.previousConsoleTextElement.innerText = this.prevConsole
    }
}

const calculator = new Calculator(previousConsoleTextElement, currentConsoleTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperations(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})
