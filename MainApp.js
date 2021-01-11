import { TodoMainCollection } from './Collection.js';
import { ListItemView } from './ListItemView.js';
import { FooterView } from './FooterView.js';
import { MainModel } from './MainModel.js';

const itemsCollection = new TodoMainCollection();

class TodoMain extends Backbone.View {
    constructor(parameters) {
        super(parameters)
    }

    get el() {
        return '#container'
    }

    events() {
        return {
            'keydown': 'clickKey',
            'click #default': 'setDefaultTodos',
        }
    }

    initialize() {
        this.ViewList = [];
        this.footer = new FooterView(
            { model: new MainModel() }
        );

        this.listenTo(itemsCollection, 'add', this.addOne);
        this.listenTo(this.footer.model, 'change', this.changeTodoInputView);
        this.listenTo(this.footer.model, 'change:keyword', this.filtrateByKeyword);

        itemsCollection.fetch().then(e => {
            if (!e.length) { // если ничего не сохранено в хранилище, то выводим дефолтные значения
                this.setDefaultTodos();
            }
        });

        this.$el.append(this.footer.render().el); // вставляем футер
    }


    render() { // создание html отображения
        return this
    }

    changeTodoInputView() {
        if (this.footer.model.get('idMod') === 'None') {
            this.$el.find('#text').hide();
        }
        else {
            this.$el.find('#text').show();
            this.$el.find('#text').attr("placeholder", `${this.footer.model.get('idMod') === 'Add' ? 'Add New' : 'Search'}`);
        }
        this.createListItemsViews(this.getFiltratedCollection(this.footer.model.get('idBehaviour'))); // фильтруем 

        // метод clickKey

    }

    filtrateByKeyword() {
        //  if (e.keyCode === 27) this.footer.model.set('idMod', 'None') // убрать инпут при esc

        if (this.footer.model.get('idMod') == 'Add' && this.footer.model.get('idBehaviour') !== 'Completed') { // добавлять ток если активен add input

        } else if (this.footer.model.get('idMod') == 'Search') { // если активирован поиск
            // if (e.key.length === 1 || e.keyCode === 8) {
            // убрать (мб keypress)
            setTimeout(() => {
                let filteredCollection = this.getFiltratedCollection(this.footer.model.get('idBehaviour'))
                let collectionFilteredWithKeyword = new TodoMainCollection(filteredCollection.getCollectionFilteredWithKeyword(this.footer.model.get('keyword')))
                if (this.footer.model.get('keyword').length === 0) {
                    this.createListItemsViews(filteredCollection)
                } else {
                    this.createListItemsViews(collectionFilteredWithKeyword)
                }
            }, 0)
            //}
        }
    }

    setDefaultTodos() {
        localStorage.clear();
        itemsCollection.reset();

        this.footer.model.set('idMod', 'Add')
        this.footer.model.set('idBehaviour', 'All')

        this.ViewList.forEach(i => i.remove());
        this.ViewList = [];

        ['Learn Javascript', 'Learn React', 'Build a React App'].forEach(i => {
            itemsCollection.create({ title: i })
        });
    }

    getFiltratedCollection(id) { // фильтрации по разному типу
        return new TodoMainCollection(itemsCollection.getFiltratedCollection(id));
    }

    clickKey(e) {
        if (e.keyCode === 27) this.footer.model.set('idMod', 'None') // убрать инпут при esc
        /*
                if (this.footer.model.get('idMod') == 'Add' && this.footer.model.get('idBehaviour') !== 'Completed') { // добавлять ток если активен add input
                    if (e.keyCode === 13) { // click enter
                        let txt = this.$el.find('#text');
                        itemsCollection.create({ title: txt.val() });
                        txt.val((i, val) => val = ''); // очищаем ввод
                    }
                } else if (this.footer.model.get('idMod') == 'Search') { // если активирован поиск
                    if (e.key.length === 1 || e.keyCode === 8) {
                        // убрать (мб keypress)
                        setTimeout(() => {
                            let filteredCollection = this.getFiltratedCollection(this.footer.model.get('idBehaviour'))
        
                            // оставить ток это:
                            this.footer.model.set('keyword', this.$el.find('#text').val())
                            
                            let collectionFilteredWithKeyword = new TodoMainCollection(filteredCollection.getCollectionFilteredWithKeyword(this.footer.model.get('keyword')))
                            if (this.footer.model.get('keyword').length === 0) {
                                this.createListItemsViews(filteredCollection)
                            } else this.createListItemsViews(collectionFilteredWithKeyword);
                        }, 0)
                    }
                }*/

        if (e.keyCode === 13) { // click enter
            let txt = this.$el.find('#text');
            itemsCollection.create({ title: this.footer.model.get('keyword') });
            txt.val((i, val) => val = ''); // очищаем ввод
        }
        //else {
        setTimeout(() => this.footer.model.set('keyword', this.$el.find('#text').val()), 0)
        //  }

    }

    createListItemsViews(collectionFilteredWithKeyword) {
        this.ViewList.forEach(i => i.remove());
        this.ViewList = [];
        collectionFilteredWithKeyword.models.forEach(i => this.addOne(i));
    }

    addOne(model) {
        if (model.isValid()) {
            let list = new ListItemView({ model: model, footer: this.footer.model.get('idBehaviour') });
            this.ViewList.push(list);
            this.$el.find('ul').prepend(list.render().el); // render : this.$el.html(this.template(this.model.toJSON())) - в скобках: html код (инпут + текст)
        } else {
            model.destroy()
            console.log('Пункт удалён')
        }
    }
}

new TodoMain();