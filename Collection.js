import { TodoModel } from './Model.js';

export class TodoMainCollection extends Backbone.Collection {
    constructor(o) {
        super(o)
        this.model = TodoModel; // ссылка на класс модели
        this.localStorage = new Backbone.LocalStorage('todo');
    }

    filtrationType(id) {
       return id == 'All' ? this.models : this.where({ complete: id == 'Active' ? false : true}) // выбор фильтрации
    }

    filtered(str) {
        let filteredTitles = this.pluck('title').filter(i => i.toLowerCase().startsWith(str.toLowerCase()));
        return filteredTitles.reduce((acc, i) => { return [this.where({ title: i }), ...acc] }, []).flat()
    }
}