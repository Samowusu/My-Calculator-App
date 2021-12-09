

class Calculator {
    constructor(previousOperandText,currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.reset();
    }

    // for clearing everything on the display screen
    reset () {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // for deleting one display item at a time
    delete () {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    // displays a number on the screen when clicked
    appendNumber (number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // displays the kind of operation chosen
    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return
        }
        if (this.currentOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // does the maths based on the values chosen
    compute(){
        let computation;
        const previousNumber = parseFloat(this.previousOperand);
        const currentNumber = parseFloat(this.currentOperand)
        if (isNaN(previousNumber) || isNaN(currentNumber)) {
            return
        }

        switch (this.operation){
            case '+' :
                computation = previousNumber + currentNumber;
                break
            case '-' :
                computation = previousNumber - currentNumber;
                break
            case '×' :
                computation = previousNumber * currentNumber;
                break
            case '/' :
                computation = previousNumber / currentNumber;
                break
            default:
                return
        }

        this.currentOperand = computation;
        this.operation = undefined
        this.previousOperand = ''

    }
    // updates the display with a comma delimiter
    getDisplayNumber (number) {
        // converts the entered digits to a string
        const stringNumber = number.toString();
        // splits the string and converts the 0 index to a float
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        // grabs the digits after the decimal point
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }

        if (decimalDigits !=null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    // updates values inside the output
    updateDisplay(){
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation !== undefined) {
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandText.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const resetButton  = document.querySelector('[data-reset]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');
const toggleButtons = document.querySelectorAll('.radio');
const themeStyle = document.querySelector('#theme-style');


for (var i=0; toggleButtons.length > i; i++){
    toggleButtons[i].addEventListener('click',function(){
        let mode = this.dataset.mode;
        changeTheme(mode);
    })
}



// toggleButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         let mode = this.dataset.mode;
//         console.log('clicked', mode)
//     })
// })



const changeTheme = (mode) => {
    if (mode == 'dark') {
        themeStyle.href = "style.css"
    }
    if (mode == 'light') {
        themeStyle.href = "light.css"
    }
    if (mode == 'purple') {
        themeStyle.href = "purple.css"
    }

}


const calculator = new Calculator(previousOperandText,currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

resetButton.addEventListener('click',() => {
    calculator.reset();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})