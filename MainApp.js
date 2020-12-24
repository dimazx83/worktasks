import { TodoC } from './Collection.js';

const coll = new TodoC();

/* 
 coll.add(экз модели) [ex1, ex2]
 .remove(экз) 
 .reset(экз) удаляет всё и встав новое
 .at(0)
 .toJSON() массив всех экз
 .each(callb(model, index, list) => index + model.get('str'))
*/

import { LiView } from './LiView.js';

class TodoMain extends Backbone.View {
    constructor(o) {
        super(o)
        /* this.el = '#container';
        this.chars = [];
        this.events = { // 'событие селектор' : 'func'
            // ищет селектор в el
            // keydown :
            'keydown': 'enter',
            'click #add': 'focus',
            'click #default': 'default',
            'click #search': 'focus',
            'click #All': 'getData',
            'click #Active': 'getData',
            'click #Completed': 'getData'
        }; */
        this.chars = [];
    }

    get el() { return '#container' }

    events() {
        return {
            'keydown': 'enter',
            'click #add': 'focus',
            'click #default': 'default',
            'click #search': 'focus',
            'click #All': 'getData',
            'click #Active': 'getData',
            'click #Completed': 'getData'
        }
    }

    initialize() {
        console.log(coll)
        this.listenTo(coll, 'add', this.addOne);
        coll.fetch();
        if (localStorage.length === 0) {
            this.default();
        }
    }

    render(e) { // создание html отображения
        this.$el.find('ul').empty(); // очищаем ul
        console.log(e)
        e.models.forEach(i => this.addOne(i));
        return this
    }

    default() {
        localStorage.clear();
        coll.reset();
        this.$el.find('ul').empty();
        console.log(coll);
        ['Learn Javascript', 'Learn React', 'Build a React App'].forEach(i => {
            coll.create({ title: i })
        });
    }

    getData(e) {
        Array.from([$('#All'), $('#Active'), $('#Completed')]).forEach(i => i.toggleClass('active', false));
        e.target.classList.add('active');
        this.$el.find('#text').removeAttr("value");
        if (e.target.id === 'All') {
            this.render(coll);
        } else if (e.target.id === 'Active') { // новые экз коллекции?
            let collRemain = new TodoC(coll.remain());
            this.render(collRemain);
        } else {
            let collComp = new TodoC(coll.complete());
            this.render(collComp);
        }
    }

    enter(e) { // вызов каждый раз приз клике буквы - плохо
        if (this.$el.find('#add').hasClass('active')) { // добавлять ток если активен add input
            if (e.keyCode === 13) {
                let txt = this.$el.find('#text');
                coll.create({ title: txt.val() });
                txt.val((i, val) => val = ''); // очищаем ввод
            }
        } else if (this.$el.find('#search').hasClass('active')) { // если активирован поиск
            let activeFilter = Array.from([$('#All'), $('#Active'), $('#Completed')]).find(i => i.hasClass('active'))[0].id;
            let filteredCollection = activeFilter === 'All' ? coll : activeFilter === 'Active' ? new TodoC(coll.remain()) : new TodoC(coll.complete());

            if (e.keyCode === 8) { // click backspace
                this.chars.pop();
                let collFiltered = new TodoC(filteredCollection.filtered(this.chars.join('')));
                this.chars.length === 0 ? this.render(filteredCollection) : this.render(collFiltered);
            } else if (e.key.length === 1) {
               // console.log(this.chars)
                this.chars.push(e.key);
                let collFiltered = new TodoC(filteredCollection.filtered(this.chars.join('')));
                this.render(collFiltered);
            }
        }
    }

    addOne(mod) {
        console.log(mod)
        let list = new LiView({ model: mod }); // передаём экз модели / list.model доступ к метод/свва модели
        list.el.style.listStyle = 'none';
        this.$el.find('ul').prepend(list.render().el); // render : this.$el.html(this.template(this.model.toJSON())) - в скобках: html код (инпут + текст)
        // list : list of views
    }

    focus(e) {
        if (e.target.classList.contains('active')) {
            e.target.classList.remove('active');
            this.$el.find('#text').hide();
        } else {
            if (this.$el.find('#search').hasClass('active') && e.target.id === 'add') {
                if (this.$el.find('#Active').hasClass('active')) {
                    let collRemain = new TodoC(coll.remain());
                    this.render(collRemain);
                } else if (this.$el.find('#Completed').hasClass('active')) {
                    let collComp = new TodoC(coll.complete());
                    this.render(collComp);
                } else this.render(coll)
            }
            this.$el.find('#text').removeAttr("value");
            Array.from([$('#add'), $('#search')]).forEach(i => i.toggleClass('active', false));
            e.target.classList.toggle('active');
            this.$el.find('#text').show(); // добавить проверку на существов
            e.target.id === 'add' ? this.$el.find('#text').attr("placeholder", "Add New") : this.$el.find('#text').attr("placeholder", "Search");
        }
    }
}

let TodoMainEx = new TodoMain;