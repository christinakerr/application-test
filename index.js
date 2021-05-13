const inquirer = require("inquirer");

// PART 1

function calculator() {
    inquirer.prompt({
        type: "input",
        message: "Enter your equation: ",
        name: "equation"
    }).then(response => {
        let equation = response.equation;


        for (let i = 0; i < equation.length; i++) {

            let calculations = [];

            if (equation[i] === "(") {
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
        if (equation.length === 1){
            return equation
        }

        


        // console.log(equation);
        // return equation;
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


calculator();