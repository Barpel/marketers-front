import MarketerService from '../services/MarketerService';
import { observable, action, computed } from 'mobx';

export default class MarketerStore {

    @observable
    marketers = [];

    @computed
    getMarketersCount() {
        return this.marketers.length;
    }

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action
    async fetchMarketers() {
        this.marketers = await MarketerService.getMarketers();
    }
}
