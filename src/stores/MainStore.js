/*
 * Written by Vy Nguyen
 *
 * MainStore to centralized the init sequence of other stores.
 */
import Reflux  from 'reflux';

import Action from '../action/Action';

class MainStoreClass extends Reflux.Store {
    constructor() {
        super();
        this.listenables = Action;
    }

    initMain() {
    }
}

var MainStore = Reflux.initStore(MainStoreClass);

export default MainStore;
