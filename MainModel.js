import { TodoMainCollection } from './Collection.js';

export class MainModel extends Backbone.Model {
    constructor(parametrs) {
        super(parametrs);
    }

    get defaults() {
        return {
            id: '',
            side: '',
            mod: false
        };
    }

    initialize() {
      //  this.listenTo()
        //console.log('Создан новый пункт');
    }
    validate(attr) {
        if (attr.title == ''.trim()) return 'Write smth!'
    }

    toggle() {
        console.log(this.get('mod'))
        this.set('mod', !this.get('mod'))
    }
}