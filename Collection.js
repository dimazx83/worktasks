import { TodoModel } from './Model.js';

export class TodoMainCollection extends Backbone.Collection {
    constructor(parameters) {
        super(parameters)
        this.localStorage = new Backbone.LocalStorage('todo');
        this.model = TodoModel; // ссылка на класс модели
    }

    getFiltratedCollection(id) {
        if (id == 'All') return this.models
        else return this.where({ complete: id == 'Active' ? false : true })
    }

    getCollectionFilteredWithKeyword(str) {
        return this.models.filter(i => i.get('title').toLowerCase().startsWith(str.toLowerCase()))
    }
}