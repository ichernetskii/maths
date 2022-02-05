expect.extend({
    toEqualCloseTo(received: number, expected: number, epsilon: number = 0.1) {
        // const expected = round(this., epsilon);
        return received <= expected + epsilon && received >= expected - epsilon
            ? {
                pass: true,
                message: () => `Expected ${expected} is equal to ${received} with precision ${epsilon}`
            }
            : {
                pass: false,
                message: () => `Expected ${expected} isn't equal to ${received} with precision ${epsilon}`
            }
    },
});
