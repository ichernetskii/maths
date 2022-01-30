import {parse} from "./error";

describe("parse", () => {
    it("Basic test", () => {
        expect(parse("AAA{0}BBB{1}CCC", "11", "22")).toBe("AAA11BBB22CCC");
        expect(parse("{0}AAA{2}BBB{1}CCC", "11", "22", 33)).toBe("11AAA33BBB22CCC");
        expect(parse("{0}AAA{2}BBB{1}CCC{0}", "11", "22", 33)).toBe("11AAA33BBB22CCC11");
        expect(parse("{0}AAA{2}BBB{1}CCC{4}", "11", "22", 33, "", 44)).toBe("11AAA33BBB22CCC44");
        expect(parse("{0}AAA{2}BBB{1}CCC{4}", "11", "22", 33, null, 44)).toBe("11AAA33BBB22CCC44");
        expect(parse("{0}AAA{2}BBB{1}CCC{4}", "11", "22", 33, undefined, 44)).toBe("11AAA33BBB22CCC44");
    });
});
