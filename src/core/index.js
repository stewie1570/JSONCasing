export function isPrimitive(obj) {
    return typeof (obj) != "object" || obj instanceof Date;
}

export function isArray(obj) {
    return Object.prototype.toString.call(obj) == "[object Array]";
}