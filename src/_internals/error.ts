type MathsErrorValue = { code: number, message: string };
const MathErrorPrefix = [
    "Abstract",
    "UnexpectedToken",
    "ManyActionTokens",
    "TokenAfterOpenParentheses",
    "NegativeNumber",
    "NotIntegerNumber",
    "Test",
] as const;
type MathsErrorDictionary = Record<`${typeof MathErrorPrefix[number]}Error`, MathsErrorValue>;

type MathsErrorArgs = string | number | null | undefined;

export function parse(message: string, ...args: MathsErrorArgs[]): string {
    let result: string = message;
    args.forEach((arg, idx) => {
        result = result.replace(new RegExp(`\\{${idx}\\}`, "g"), (arg ?? "").toString());
    })
    return result;
}

export class MathsError extends Error {
    protected code: number;

    public static values: MathsErrorDictionary = {
        AbstractError: { code: 0, message: "AbstractError"},
        UnexpectedTokenError: { code: 1, message: "Unexpected token {0} in input string."},
        ManyActionTokensError: { code: 2, message: "Error at position {0}: {1} and {2} must be separately"},
        TokenAfterOpenParenthesesError: { code: 3, message: "Unexpected token {0} at position {1} after ("},
        NegativeNumberError: { code: 4, message: "Value {0} can't be negative" },
        NotIntegerNumberError: { code: 5, message: "Value {0} must be integer" },
        TestError: { code: 999, message: "Param0: {0}, Param1: {1}, Param2: {2}, Param3: {3}"},
    };

    constructor(e: MathsErrorValue, ...arr: MathsErrorArgs[]) {
        super(`M-${e.code.toString().padStart(3, "0")}. ${parse(e.message, ...arr)}`);
        this.name = "MathsError";
        this.code = e.code;
    }
}
