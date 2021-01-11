export class MainModel extends Backbone.Model {
    constructor(parametrs) {
        super(parametrs);
    }

    get defaults() {
        return {
            idMod: 'Add',
            idBehaviour: 'All',
            keyword: ''
        };
    }
}