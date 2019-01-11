import MarketerStore from './MarketerStore';
import AdminStore from './AdminStore';

export default class RootStore {

    constructor() {
        this.marketerStore = new MarketerStore(this);
        this.adminStore = new AdminStore(this);
    }
}