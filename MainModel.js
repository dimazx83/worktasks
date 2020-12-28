export class MainModel extends Backbone.Model {
    constructor(parametrs) {
        super(parametrs);
    }

    get defaults() {
        return {
            idMod: 'Add',
            mod: true, // убрать?
            idBehaviour: 'All',
          //  behaviour: true,
            keyword: ''
        };
    }

    toggle() {
        this.set('mod', !this.get('mod'))
    }
}