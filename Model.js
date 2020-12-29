export class TodoModel extends Backbone.Model {
    constructor(parametrs) {
        super(parametrs);
    }

    get defaults() {
        return {
            title: '',
            complete: false
        };
    }

    initialize() {
        console.log('Создан новый пункт');
        this.on('invalid', (model, error) => alert(error));
        //this.destroy();
    }

    validate(attr) {
        if (attr.title == ''.trim()) return 'Write smth!'
    }

    toggle() {
        this.set('complete', !this.get('complete'))
        //this.save()
    }
}