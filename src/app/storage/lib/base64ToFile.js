export function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

export function base64ToFile(base64, filename) {
    const buffer = Buffer.from(base64, 'base64');
    const u8arr = new Uint8Array(buffer);
    return new File([u8arr], filename);
}