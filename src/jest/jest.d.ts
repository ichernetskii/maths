declare global {
    namespace jest {
        interface Matchers<R> {
            toEqualCloseTo(expected: number, precision: number): R;
        }
    }
}

export {};
