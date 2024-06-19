document.addEventListener('DOMContentLoaded', function () {
    const screen = document.getElementById('calculator-screen');
    const history = document.getElementById('calculator-history');
    let currentInput = '';
    let historyRecords = [];

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            handleInput(action);
        });
    });

    function handleInput(action) {
        if (isNumber(action)) {
            currentInput += action;
            updateScreen(currentInput);
        } else if (isOperator(action)) {
            if (currentInput !== '' && !isOperator(currentInput.trim().split(' ').pop())) {
                currentInput += ` ${action} `;
                updateScreen(currentInput);
            }
        } else {
            switch (action) {
                case 'clear':
                    currentInput = '';
                    updateScreen(currentInput);
                    break;
                case 'delete':
                    if (currentInput.endsWith(' ')) {
                        currentInput = currentInput.trim().slice(0, -2).trim();
                    } else {
                        currentInput = currentInput.trim().slice(0, -1);
                    }
                    updateScreen(currentInput);
                    break;
                case 'equal':
                    calculateResult();
                    break;
                case '.':
                    if (currentInput[currentInput.length - 1] !== '.' && !currentInput.split(' ').pop().includes('.')) {
                        currentInput += '.';
                        updateScreen(currentInput);
                    }
                    break;
            }
        }
    }

    function isNumber(value) {
        return !isNaN(value) || value === '0';
    }

    function isOperator(value) {
        return ['+', '-', '*', '/'].includes(value);
    }

    function updateScreen(value) {
        screen.textContent = value;
    }

    function calculateResult() {
        try {
            if (isOperator(currentInput.trim().split(' ').pop())) {
                throw new Error('Operação incompleta');
            }
            const result = eval(currentInput);
            if (result === Infinity || isNaN(result)) {
                throw new Error('Erro matemático');
            }
            historyRecords.push(`${currentInput} = ${result}`);
            updateHistory();
            currentInput = result.toString();
            updateScreen(currentInput);
        } catch (error) {
            currentInput = 'Erro';
            updateScreen(currentInput);
        }
    }

    function updateHistory() {
        history.innerHTML = historyRecords.map(record => `<div>${record}</div>`).join('');
    }
});
