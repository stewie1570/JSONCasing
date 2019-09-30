export function isPrimitive(obj: any) {
    return typeof (obj) != "object" || obj instanceof Date;
}

export function isArray(obj: any) {
    return Object.prototype.toString.call(obj) == "[object Array]";
}