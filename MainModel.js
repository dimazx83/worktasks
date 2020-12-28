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
        // console.log('Создан новый пункт');
    }

    toggle() {
        this.set('mod', !this.get('mod'))
    }
}