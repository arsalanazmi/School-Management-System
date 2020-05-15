export default class LocalStorageManager {
    static setUser(snapshot)  {
        localStorage.setItem('localStorageUser', JSON.stringify(snapshot));
    }

    static clearLocalStorage()  {
        localStorage.clear()
    }

    static removeUser()  {
        localStorage.removeItem('localStorageUser');
    }

    static getUser() {
        return JSON.parse(localStorage.getItem('localStorageUser'));
    }
}