type Operator = "(" | ")" | "+" | "-" | "*" | "/" | "^";
type Action = Exclude<Operator, "(" | ")">;
type Token = number | Action;
type OperatorWithPriority =  {
    operator: Operator;
    priority: number;
}

export class Mathematica {
    public round(n: number, count: number): number {
        return Math.round(n * 10**count) / 10**count;
    }

    private priority: Record<Operator, number> = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
        "^": 3,
        "(": 4,
        ")": 0,
    }

    public isNumber = (arg: any): arg is number => {
        switch (typeof arg) {
            case "number": return true;
            case "string": return /^[+-]?\d+([.]\d+)?$/.test(arg);
            default: return false;
        }
    };

    public isOperator = (arg: any): arg is Operator => Object.keys(this.priority).includes(arg);

    public isAction = (arg: any): arg is Action => {
        const actions = Object.keys(this.priority).filter(operator => !["(", ")"].includes(operator));
        return actions.includes(arg);
    };

    // 1-2+3        12-3+
    // 1+2*3        123*+
    // 1*2+3        12*3+
    // 2^3*4+5      23^4*5+
    // 2*3^4+5      234^*5+
    // 2+3+4^5-6    23+45^+6-
    // 2-3+4^5/6*7  23-45^6/7*+
    // 1+2*3^4-5    1234^*+5-
    // 1*(2+3)      123+*
    // 1*(2+3)+4    123+*4+
    // 1*(2*3-4)+5  123*4-*5+
    // -1-2         01-2-
    // (-1)-2       01-2-
    // -(1)         01-
    // -(-1)        001--
    // +(-1)        001-+
    public infix2postfix(input: string): Token[] {
        const maxPriority = Math.max(...Object.values(this.priority));
        const joinedOperators = Object.keys(this.priority).join("\\");
        const inputArray = input
            .replace(/\s/g, "")
            .split(new RegExp(`([${joinedOperators}])`))
            .filter(token => token !== "")
            .map(token => this.isNumber(token) ? parseFloat(token) : token);

        const result: Token[] = [];
        const stack: OperatorWithPriority[] = [];
        let level: number = 0;
        inputArray.forEach((token, idx) => {
            if (this.isNumber(token)) {
                result.push(token);
            } else if (this.isOperator(token)) {
                if (token === "(") level++;
                if (token === ")") level--;

                // check unary operations
                if (
                    (idx === 0 || inputArray[idx - 1] === "(")  // check prev token and first position
                    && ["+", "-"].includes(token)               // check current token
                ) result.push(0);

                // if current priority <= in stack then add high priority from stack to output
                while (stack.length > 0 && this.priority[token] + level * (maxPriority + 1) <= stack[stack.length - 1].priority) {
                    const action = stack.pop();
                    if (action && action.operator !== "(" && action.operator != ")") result.push(action.operator);
                }
                stack.push({
                    operator: token,
                    priority: this.priority[token] + level * (maxPriority + 1),
                });
            } else throw new Error("Unexpected token");
        });

        result.push(
            ...stack
                .map(item => item.operator)
                .filter(this.isAction)
                .reverse()
        );

        return result;
    }

    private static executeOperation(a: number, b: number, operation: Action): number {
        switch (operation) {
            case "+": return a + b;
            case "-": return a - b;
            case "*": return a * b;
            case "/": return a / b;
            case "^": return a ** b;
        }
    }

    public calculatePostfix(inputTokens: Token[]) {
        const tokens = [...inputTokens];
        for (let i = 0; i < tokens.length; i++) {
            const a = tokens[i - 2];
            const b = tokens[i - 1];
            const operation = tokens[i];
            if (this.isNumber(a) && this.isNumber(b) && this.isAction(operation)) {
                tokens.splice(i - 2, 3, Mathematica.executeOperation(a, b, operation));
                i -= 2;
            }
        }
        return tokens[0];
    }
}
