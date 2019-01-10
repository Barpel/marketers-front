import MarketerService from '../services/MarketerService';
import { observable, action, computed } from 'mobx';

export default class MarketerStore {
    @observable
    marketer = null;

    @observable
    marketers = [];


    @computed
    get marketersCount() {
        return this.marketers.length;
    }

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action
    async fetchMarketers() {
        this.marketers = await MarketerService.getMarketers();
        console.log(this.marketers)
    }

    @action
    async fetchMarketerByEmail(email) {
        this.marketer = await MarketerService.getMarketerByEmail(email);
    }

    @action
    async fetchMarketerById(marketerId) {
        return this.marketer = await MarketerService.getMarketerById(marketerId);
    }

    async saveMarketer(marketerData) {
        return this.marketer = await MarketerService.saveMarketer(marketerData);
    }

    async deleteMarketer(marketerId) {
        return await MarketerService.deleteMarketer(marketerId);
    }

    validateEmail(email) {
        return MarketerService.validateEmail(email);
    }
}
