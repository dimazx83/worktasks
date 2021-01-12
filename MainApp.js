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
            'keyup': 'clickKey',
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
        if (this.footer.model.get('idMod') === false) {
            this.$el.find('#text').hide();
        }
        else {
            this.$el.find('#text').show();
            this.$el.find('#text').attr("placeholder", `${this.footer.model.get('idMod') === 'Add' ? 'Add New' : 'Search'}`);
            this.filtrationByKeywordAndBehaviour()
        }
    }

    filtrationByKeywordAndBehaviour() {
        let filteredCollection = this.getFiltratedCollection(this.footer.model.get('idBehaviour')) // фильтрация на основе активного фильтра
        if (this.footer.model.get('idMod') == 'Search') { // если активирован поиск
            filteredCollection = new TodoMainCollection(filteredCollection.getCollectionFilteredWithKeyword(this.footer.model.get('keyword')))
        }
        this.createListItemsViews(filteredCollection)
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
        if (e.keyCode === 27) this.footer.model.set('idMod', false) // убрать инпут при esc

        this.footer.model.set('keyword', this.$el.find('#text').val())

        if (e.keyCode === 13 && this.footer.model.get('idMod') === 'Add' && this.footer.model.get('idBehaviour') !== 'Completed') { // click enter
            itemsCollection.create({ title: this.footer.model.get('keyword') });
            this.$el.find('#text').val((i, val) => val = ''); // очищаем ввод
            this.footer.model.set('keyword', '');
        }
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