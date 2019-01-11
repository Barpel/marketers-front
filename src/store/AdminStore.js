import AdminService from '../services/AdminService';
import { observable, action } from 'mobx';

export default class AdminStore {

    @observable
    isAdminLogged = false;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action
    loginAdmin(adminCredentials) {
        this.isAdminLogged = AdminService.loginAdmin(adminCredentials);
    }
}