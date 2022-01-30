import {
    isAction,
    isNumber,
    isOperator,
    isTokenInfix,
    OperatorPriority,
    TokenInfix,
    TokenPostfix
} from "./_internals/types";
import {makeAction, operatorPriority} from "./_internals/assets";
import {MathsError} from "./_internals/error";

export const infix2postfix = (infix: string): TokenPostfix[] => {
    const maxPriority = Math.max(...Object.values(operatorPriority));
    const joinedOperators = Object.keys(operatorPriority).join("\\");

    const infixArray: TokenInfix[] = infix
        .replace(/\s/g, "")
        .split(new RegExp(`([${joinedOperators}])`))
        .filter(token => token !== "")
        .map(token => {
            if (isNumber(token)) return parseFloat(token);
            if (isTokenInfix(token)) return token;
            throw new MathsError(MathsError.values.UnexpectedTokenError, token);
        });

    const postfixArray: TokenPostfix[] = [];
    const stack: OperatorPriority[] = [];
    let level: number = 0;
    infixArray.forEach((token, idx) => {
        const prevToken = infixArray[idx - 1];
        if (isNumber(token)) {
            // check errors
            // )1
            postfixArray.push(token);
        } else if (isOperator(token)) {
            // check errors
            // TODO: other errors
            if (isAction(token)) {
                // 1++2
                if (isAction(prevToken)) throw new MathsError(MathsError.values.ManyActionTokensError, idx, prevToken, token);
                // (*3
                if (prevToken === "(" && ["*", "/"].includes(token)) throw new MathsError(MathsError.values.TokenAfterOpenParenthesesError, token, idx + 1);
            }

            if (token === "(") level++;
            if (token === ")") level--;

            // check unary operations
            if (
                (idx === 0 || prevToken === "(")  // check prev token and first position
                && ["+", "-"].includes(token)               // check current token
            ) postfixArray.push(0);

            // if current priority <= in stack then add high priority from stack to output
            while (stack.length > 0 && operatorPriority[token] + level * (maxPriority + 1) <= stack[stack.length - 1].priority) {
                const action = stack.pop();
                if (action && action.operator !== "(" && action.operator !== ")") postfixArray.push(action.operator);
            }
            stack.push({
                operator: token,
                priority: operatorPriority[token] + level * (maxPriority + 1),
            });
        } else throw new MathsError(MathsError.values.UnexpectedTokenError, token);
    });

    postfixArray.push(
        ...stack
            .map(item => item.operator)
            .filter(isAction)
            .reverse()
    );

    return postfixArray;
}

export const calculate = (inputTokens: TokenPostfix[]) => {
    const tokens = [...inputTokens];
    for (let i = 0; i < tokens.length; i++) {
        const a = tokens[i - 2];
        const b = tokens[i - 1];
        const operation = tokens[i];
        if (isNumber(a) && isNumber(b) && isAction(operation)) {
            tokens.splice(i - 2, 3, makeAction(a, b, operation));
            i -= 2;
        }
    }
    return tokens[0];
}
