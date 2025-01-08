declare global {
    var TextEncoder: {
        new (): {
            encode(str: string): Uint8Array;
        };
    };
    var TextDecoder: {
        new (): {
            decode(arr?: Uint8Array): string;
        };
    };
}
