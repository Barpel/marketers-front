import MarketerStore from './MarketerStore';

export default class RootStore {

    constructor() {
        this.marketerStore = new MarketerStore(this)
    }
}