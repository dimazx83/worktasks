export class TodoModel extends Backbone.Model {
    constructor(parametrs) {
        super(parametrs);
        this.localStorage = new Backbone.LocalStorage('todo');
    }

    get defaults() {
        return {
            title: '',
            complete: false
        };
    }

    initialize() {
        console.log('Создан новый пункт');
        this.once('invalid', (model, error) => alert(error));
    }

    validate(attr) {
        if (attr.title.trim() == '') return 'Write smth!'
    }

    toggle() {
        this.set('complete', !this.get('complete'))
    }
}
  