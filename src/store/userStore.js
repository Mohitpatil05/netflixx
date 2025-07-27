import { makeAutoObservable } from 'mobx';
import { setItem, getItem, removeItem } from '../utils/storage';

class UserStore {
    username = '';
    isLoggedIn = false;
    isHydrated = false; // <-- NEW

    constructor() {
        makeAutoObservable(this);
        this.loadUser();
    }

    async loadUser() {
        const data = await getItem('user');
        if (data) {
            this.username = data.username;
            this.isLoggedIn = true;
        }
        this.isHydrated = true; // <-- Set after loading
    }

    async login(username, password) {
        this.username = username;
        this.isLoggedIn = true;
        await setItem('user', { username, password });
    }

    async logout() {
        this.username = '';
        this.isLoggedIn = false;
        await removeItem('user');
    }
}


export const userStore = new UserStore();
