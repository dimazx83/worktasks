import { TodoModel } from './Model.js';

export class TodoMainCollection extends Backbone.Collection {
    constructor(o) {
        super(o)
        this.localStorage = new Backbone.LocalStorage('todo');
        this.model = TodoModel; // ссылка на класс модели
    }

    filtrationType(id) {
       return id == 'All' ? this.models : this.where({ complete: id == 'Active' ? false : true}) // выбор способа фильтрации
    }

    filtered(str) {
        let filteredTitles = this.pluck('title').filter(i => i.toLowerCase().startsWith(str.toLowerCase()));
        return filteredTitles.reduce((acc, i) => { return [this.where({ title: i }), ...acc] }, []).flat()
    }
}