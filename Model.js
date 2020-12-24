export const TodoModel = Backbone.Model.extend({
    defaults: {
        title: '',
        complete: false
    },
    initialize() {
        console.log('Создан новый пункт');
        this.on('invalid', (model, error) => alert(error));
        this.save();
    },
    validate(attr) {
        if (!attr.title.trim()) return 'Write smth!'
    },
    toggle() {
        this.set('complete', !this.get('complete'));
        this.save();
    }
})



/*export class TodoModel extends Backbone.Model {
    constructor() {
        super();
    }
 defaults() {
        return {
            title: '',
            complete: false
        };
    }

    initialize() {
        console.log('Создан новый пункт');
    }
    validate(attr) {
        if (attr.title == ''.trim()) return 'Write smth!'
    }

    toggle() {
        this.set('complete', !this.get('complete'))
    }
}*/