import { makeAutoObservable } from 'mobx';
import { setItem, getItem, removeItem } from '../utils/storage';

class UserStore {
    username = '';
    isLoggedIn = false;

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
