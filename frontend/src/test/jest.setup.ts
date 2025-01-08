import '@testing-library/jest-dom';

// Add TextEncoder and TextDecoder to the global scope
if (typeof global.TextEncoder === 'undefined') {
    class MockTextEncoder {
        encode(str: string): Uint8Array {
            return new Uint8Array(str.length);
        }
    }
    class MockTextDecoder {
        decode(arr?: Uint8Array): string {
            return arr ? ''.padEnd(arr.length) : '';
        }
    }
    global.TextEncoder = MockTextEncoder as any;
    global.TextDecoder = MockTextDecoder as any;
}

// Automatically mock date-fns
jest.mock('date-fns');
