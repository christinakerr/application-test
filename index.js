const inquirer = require("inquirer");

// PART 1

function calculator() {
    inquirer.prompt({
        type: "input",
        message: "Enter your equation: ",
        name: "equation"
    }).then(response => {
        let equation = response.equation;


        for (let i = 0; i < equation.length; i++) { // Handle parentheses

            if (equation[i] === "(") {
                let calculations = [];
                for (let j = 1; j < equation.length; j++) {
                    if (equation[j] === ")") {
                        calculations.push({ "operation": equation.slice(i + 1, j), "index": i })
                        equation = equation.replace("(" + calculations[calculations.length - 1].operation + ")", "")
                        break;
                    }
                }

                let operator;
                for (let calc of calculations) {
                    let i;
                    for (i = 0; i < calc.operation.length; i++) {
                        if (!parseInt(calc.operation[i])) {
                            operator = { "op": calc.operation[i], "index": i };
                        }
                    }

                    const result = singleOperation(calc.operation.slice(0, operator.index), operator.op, calc.operation.slice(operator.index + 1))
                    equation = [equation.slice(0, calc.index), result, equation.slice(calc.index)].join("");
                }
            }
        }

        if (equation.length === 1) {
            return equation
        }


        handleOperators("*");
        handleOperators("/");
        handleOperators("+");
        handleOperators("-")


        function handleOperators(op) {

            let indices = operatorSearch(equation, op); // Handle multiplication

            let i = 0;
            while (indices.length > 0) {
                let startEnd = calculationSearch(equation, indices[i])
                let num1 = equation[startEnd[0]];
                let num2 = equation[startEnd[1]];
                if (startEnd[2] > 1) {
                    num1 = equation.slice(startEnd[0], startEnd[2])
                }
                if (startEnd[3] > 1) {
                    num2 = equation.slice(startEnd[1], startEnd[3])
                }

                const result = singleOperation(num1, op, num2)
                equation = equation.replace(equation.slice(startEnd[0], startEnd[1] + 1), result)
                indices = operatorSearch(equation, op);
            }
        }

        return equation;
    }).catch(err => console.log(err))
}


function singleOperation(number1, operator, number2) {

    num1 = parseInt(number1);
    num2 = parseInt(number2);

    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        default:
            return
    }
}

function operatorSearch(eq, operator) {
    let indexes = []
    for (let i = 0; i < eq.length; i++) {
        if (eq[i] === operator) {
            indexes.push(i);
        }
    }
    return indexes;
}

function calculationSearch(eq, index) {
    let start;
    let end;
    let startDigits = 0;
    let endDigits = 0
    if (eq.length === 3) {
        return [0, 2, 1, 1];
    }

    for (let i = index + 1; i < eq.length; i++) {
        if (!parseInt(eq[i])) {
            end = i - 1;
            break;
        } else {
            endDigits++;
        }
    }

    for (let i = index - 1; i >= -1; i--) {
        
        if (!parseInt(eq[i]) || i === -1) {
            start = i + 1;
            break;
        } else {
            startDigits++
        }
    }
    return [start, end, startDigits, endDigits]
}


calculator();