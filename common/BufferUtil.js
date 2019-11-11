"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
class BufferUtil {
    static fromHex(source) {
        const data = source.match(/.{1,2}/g).map(x => parseInt(x, 16));
        return new Uint8Array(data);
    }
    static fromBase64(source) {
        return Uint8Array.from(buffer_1.Buffer.from(source, 'base64'));
    }
    static fromString(source) {
        const buffer = new ArrayBuffer(source.length);
        const view = new DataView(buffer);
        for (let i = 0; i < source.length; i++) {
            view.setUint8(i, source.charCodeAt(i));
        }
        return new Uint8Array(buffer);
    }
    static toString(source) {
        const data = [];
        source.forEach(x => {
            data.push(String.fromCharCode(x));
        });
        return data.join('');
    }
    static toHex(sources) {
        const data = [];
        sources.forEach(x => {
            data.push(x.toString(16).padStart(2, '0'));
        });
        return data.join('');
    }
    static toBase64(sources) {
        return buffer_1.Buffer.from(sources).toString('base64');
    }
    static concat(a, b) {
        const c = new Uint8Array(a.length + b.length);
        c.set(a);
        c.set(b, a.length);
        return c;
    }
}
exports.BufferUtil = BufferUtil;
