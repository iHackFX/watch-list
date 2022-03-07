import { Storage } from "@capacitor/storage";

async function getTheme() {
    const { value } = await Storage.get({ key: 'theme' });
    return value == 'true' || false;
}

async function saveTheme(val: boolean) {
    Storage.set({
        key: 'theme',
        value: val+""
    });
}


export { saveTheme, getTheme };