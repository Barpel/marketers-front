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
    async fetchMarketers(sortParam) {
        this.marketers = await MarketerService.getMarketers(sortParam);
    }

    @action
    async fetchMarketerByEmail(email) {
        return this.marketer = await MarketerService.getMarketerByEmail(email);
    }

    @action
    async fetchMarketerById(marketerId) {
        return this.marketer = await MarketerService.getMarketerById(marketerId);
    }

    async saveMarketer(marketerData) {
        this.marketer = await MarketerService.saveMarketer(marketerData);
        this.fetchMarketers();
        return this.marketer;
    }

    async deleteMarketer(marketerId) {
        return await MarketerService.deleteMarketer(marketerId);
    }

    validateEmail(email) {
        return MarketerService.validateEmail(email);
    }
}
