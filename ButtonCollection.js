import { MainModel } from './MainModel.js';
import { TodoMainCollection } from './Collection.js';


export class ButtonCollection extends Backbone.Collection {
    constructor(o) {
        super(o)
        this.model = MainModel; // ссылка на класс модели
        // this.localStorage = new Backbone.LocalStorage('todo');
    }

    all() {
        return this
    }

    complete() {
        return this.where({ complete: true }) //this.filter((mod=>return mod.get('complete') === true))
    }

    remain() {
        return this.where({ complete: false })
    }

    filtered(str) {
        let filteredTitles = this.pluck('title').filter(i => i.toLowerCase().startsWith(str.toLowerCase()));
        return filteredTitles.reduce((acc, i) => { return [this.where({ title: i }), ...acc] }, []).flat()
    }
}