import { TodoModel } from './Model.js';

export class TodoC extends Backbone.Collection {
    constructor(o) {
        super(o)
        this.model = TodoModel; // ссылка на класс модели
        this.localStorage = new Backbone.LocalStorage('todo');
    }

    all() {
        return this
    }

    complete() {
        return this.where({ complete: true })
    }

    remain() {
        return this.where({ complete: false })
    }

    filtered(str) {
        let filteredTitles = this.pluck('title').filter(i => i.toLowerCase().startsWith(str.toLowerCase()));
        return filteredTitles.reduce((acc, i) => { return [this.where({ title: i }), ...acc] }, []).flat()
    }
}