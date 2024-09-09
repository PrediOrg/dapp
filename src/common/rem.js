export function mobileRem() {
    size();
if (window.addEventListener) {
    return window.addEventListener('resize', () => {
        size();
    }, false);
} else if (window.attachEvent) {
    return window.attachEvent('onresize', () => {
        size();
    });
}
function size() {
    let winW = document.documentElement.clientWidth || document.body.clientWidth;
    document.documentElement.style.fontSize = (winW / 750) * 100 + "px";
    if (winW > 750) {
        document.documentElement.style.fontSize = "100px";
    } else {
        document.documentElement.style.fontSize = (winW / 750) * 100 + "px";
    }
}
}
