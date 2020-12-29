import { TodoMainCollection } from './Collection.js';
import { ListItemView } from './ListItemView.js';
import { FooterView } from './FooterView.js';
import { MainModel } from './MainModel.js';

const itemsCollection = new TodoMainCollection();

/* 
 itemsCollection.add(экз модели) [ex1, ex2]
 .remove(экз) 
 .reset(экз) удаляет всё и встав новое
 .at(0)
 .toJSON() массив всех экз
 .each(callb(model, index, list) => index + model.get('str'))
*/


class TodoMain extends Backbone.View {
    constructor(o) {
        super(o)
    }

    get el() {
        return '#container'
    }

    events() {
        return {
            'keydown': 'enter',
            'click #Add, #Search, #All, #Active, #Completed': () => this.ViewList.forEach(i => i.remove()),
            'click #default': 'default',
        }
    }

    initialize() {
        this.ViewList = [];
        this.listenTo(itemsCollection, 'add', this.addOne);


        this.footer = new FooterView(
            { model: new MainModel() }
        );

        this.listenTo(this.footer.model, 'change', (e) => { // состояния инпута + фильтрация
            if (e.get('mod')) {
                this.$el.find('#text').show()
                this.$el.find('#text').attr("placeholder", `${e.get('idMod') === 'Add' ? 'Add New' : 'Search'}`)

                this.render(this.filtration(this.footer.model.get('idBehaviour'))) // фильтруем
            } else this.$el.find('#text').hide()
        })

        itemsCollection.fetch();
        this.$el.append(this.footer.render().el); // вставляем футер
    }


    render(filteredWithKeywordCollection) { // создание html отображения
        this.$el.find('ul').empty(); // очищаем ul
        filteredWithKeywordCollection.models.forEach(i => this.addOne(i));
        return this
    }

    default() {
        localStorage.clear();
        itemsCollection.reset();
        this.$el.find('ul').empty();
        ['Learn Javascript', 'Learn React', 'Build a React App'].forEach(i => {
            itemsCollection.create({ title: i })
        });
    }

    filtration(id) {
        return new TodoMainCollection(itemsCollection.filtrationType(id));
    }

    enter(e) {
        if (e.keyCode === 27) this.footer.model.set('mod', false) // убрать инпут при esc

        if (this.footer.model.get('idMod') == 'Add') { // добавлять ток если активен add input
            if (e.keyCode === 13) {
                let txt = this.$el.find('#text');
                itemsCollection.create({ title: txt.val() });
                txt.val((i, val) => val = ''); // очищаем ввод
            }
        } else if (this.footer.model.get('idMod') == 'Search') { // если активирован поиск
            let filteredCollection = this.filtration(this.footer.model.get('idBehaviour'))

            if (e.keyCode === 8) { // click backspace

                this.footer.model.get('keyword').pop();
                let filteredWithKeywordCollection = new TodoMainCollection(filteredCollection.filtered(this.footer.model.get('keyword').join('')));
                this.footer.model.get('keyword').length === 0 ? this.render(filteredCollection) : this.render(filteredWithKeywordCollection);
            } else if (e.key.length === 1) {
                this.footer.model.get('keyword').push(e.key);
                let filteredWithKeywordCollection = new TodoMainCollection(filteredCollection.filtered(this.footer.model.get('keyword').join('')));
                this.render(filteredWithKeywordCollection);
            }
        }
    }

    addOne(model) {
        if (model.isValid()) {
                let list = new ListItemView({ model: model }); // передаём экз модели / list.model доступ к метод/свва модели
                this.ViewList.push(list)
                this.$el.find('ul').prepend(list.render().el); // render : this.$el.html(this.template(this.model.toJSON())) - в скобках: html код (инпут + текст)
        } else {
            model.destroy()
            console.log('Пункт удалён')
        }
    }
}

new TodoMain();