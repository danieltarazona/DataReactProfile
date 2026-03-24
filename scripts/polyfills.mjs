// More robust polyfill
globalThis.DOMMatrix = class DOMMatrix {
    constructor() {
        this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
    }
};
globalThis.Path2D = class Path2D {};
globalThis.CharacterData = class CharacterData {};
globalThis.Node = class Node {};
globalThis.Element = class Element {};
globalThis.Document = class Document {};
console.log('Polyfills applied');
