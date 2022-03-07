import { saveTheme } from "../storage/settings";

function toggleTheme() {
    setTheme(document.body.getAttribute("color-theme") !== "dark");
}

function setTheme(val: boolean){
    document.body.setAttribute("color-theme", val ? "dark" : "light")
    saveTheme(val)
}

export { toggleTheme };