import { TodoMainCollection } from './Collection.js';
import { ListItemView } from './ListItemView.js';

import { MainModel } from './MainModel.js'
import { FooterView } from './FooterView.js';
import { FilteredCollection } from './filteredCollection.js';

const coll = new TodoMainCollection();

/* 
 coll.add(экз модели) [ex1, ex2]
 .remove(экз) 
 .reset(экз) удаляет всё и встав новое
 .at(0)
 .toJSON() массив всех экз
 .each(callb(model, index, list) => index + model.get('str'))
*/


class TodoMain extends Backbone.View {
    constructor(o) {
        super(o)
        this.chars = [];
        //  this.templ = _.template($('#templateFooter').html());
    }

    get el() {
        return '#container'
    }

    events() {
        return {
            'keydown': 'enter',
            'click #Add': 'click',
            'click #Search': 'click',
            'click #default': 'default',
            'click #All': 'click',
            'click #Active': 'click',
            'click #Completed': 'click'
        }
    }

    initialize() {
        // let filteredCollection = new FilteredCollection()
        this.listenTo(coll, 'add', this.addOne);
        //  this.listenTo(this.models, 'change', console.log(4))

        /* this.collect= new FilteredCollection()
         this.collect.add([{ id: 'Add', mod: 'active' },{ id: 'Search' },{ id: 'All', mod: 'active' },{ id: 'Active' },{ id: 'Completed' }])
         console.log(this.collect)*/

        this.footer = new FooterView(
            { model: new MainModel({ id: 'Add', mod: 'active' }) }
        );
        /* new FooterView({ model: new MainModel({ id: 'Search' }) })
         new FooterView({ model: new MainModel({ id: 'All', mod: 'active' }) })
         new FooterView({ model: new MainModel({ id: 'Active' }) })
         new FooterView({ model: new MainModel({ id: 'Completed' }) })*/


        /*
        let model = new MainModel( { id: 'Add', mod: 'active' })
        
                this.footer = new FooterView({
                    model:
                        model
                });*/

        // this.footer = new FooterView();
        /*,

        new FooterView({model:new MainModel(
            { id: 'Add', mod: 'active' }
        )});
            { id: 'Search' },
            { id: 'Default' },
            { id: 'All', mod: 'active' },
            { id: 'Active' },
            { id: 'Completed' },*/


        this.$el.append(this.footer.render().el);

        /* filteredCollection.add([
             { id: 'Add', mod: 'active' },
             { id: 'Search' },
             { id: 'Default' },
             { id: 'All', mod: 'active' },
             { id: 'Active' },
             { id: 'Completed' },
         ]);*/

        //  console.log(filteredCollection) 

        //this.listenTo(filteredCollection, 'add', 'modChange')

        coll.fetch();
        if (localStorage.length === 0) {
            this.default()
        }
    }

    render(e) { // создание html отображения
        this.$el.find('ul').empty(); // очищаем ul
        e.models.forEach(i => this.addOne(i));
        //  console.log(e)
        //  e.models.forEach(i => i.save())
        return this
    }

    click(e) {
        this.footer.state(e.target.id)
    }

    default() {
        localStorage.clear();
        coll.reset();
        this.$el.find('ul').empty();
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
            let collRemain = new TodoMainCollection(coll.remain());
            this.render(collRemain);
        } else {
            let collComp = new TodoMainCollection(coll.complete());
            this.render(collComp);
        }
    }

    enter(e) {
        if (this.$el.find('#Add').hasClass('active')) { // добавлять ток если активен add input
            if (e.keyCode === 13) {
                let txt = this.$el.find('#text');
                coll.create({ title: txt.val() });
                txt.val((i, val) => val = ''); // очищаем ввод
            }
        } else if (this.$el.find('#Search').hasClass('active')) { // если активирован поиск
            let activeFilter = Array.from([$('#All'), $('#Active'), $('#Completed')]).find(i => i.hasClass('active'))[0].id;
            let filteredCollection = activeFilter === 'All' ? coll : activeFilter === 'Active' ? new TodoMainCollection(coll.remain()) : new TodoMainCollection(coll.complete());

            if (e.keyCode === 8) { // click backspace
                this.chars.pop();
                let collFiltered = new TodoMainCollection(filteredCollection.filtered(this.chars.join('')));
                this.chars.length === 0 ? this.render(filteredCollection) : this.render(collFiltered);
            } else if (e.key.length === 1) {
                this.chars.push(e.key);
                let collFiltered = new TodoMainCollection(filteredCollection.filtered(this.chars.join('')));
                this.render(collFiltered);
            }
        }
    }

    addOne(mod) {
        let list = new ListItemView({ model: mod }); // передаём экз модели / list.model доступ к метод/свва модели
        this.$el.find('ul').prepend(list.render().el); // render : this.$el.html(this.template(this.model.toJSON())) - в скобках: html код (инпут + текст)
        // list : list of views
    }

    focus(e) {
        if (e.target.classList.contains('active')) {
            e.target.classList.remove('active');
            this.$el.find('#text').hide();
        } else {
            if (this.$el.find('#Search').hasClass('active') && e.target.id === 'add') {
                if (this.$el.find('#Active').hasClass('active')) {
                    let collRemain = new TodoMainCollection(coll.remain());
                    this.render(collRemain);
                } else if (this.$el.find('#Completed').hasClass('active')) {
                    let collComp = new TodoMainCollection(coll.complete());
                    this.render(collComp);
                } else this.render(coll)
            }
            this.$el.find('#text').removeAttr("value");
            Array.from([$('#Add'), $('#Search')]).forEach(i => i.toggleClass('active', false));
            e.target.classList.toggle('active');
            this.$el.find('#text').show(); // добавить проверку на существов
            e.target.id === 'Add' ? this.$el.find('#text').attr("placeholder", "Add New") : this.$el.find('#text').attr("placeholder", "Search");
        }
    }
}

let TodoMainEx = new TodoMain();