const TodoModel = Backbone.Model.extend({
    defaults: {
        title: '',
        complete: false
    },
    initialize() {
        console.log('Создан новый пункт');
    },
    validate(attr) { // не работает
        if (attr.title == ''.trim()) return 'Write smth!'
    },

    toggle() {
        this.set('complete', !this.get('complete'))
    }
});

const TodoC = Backbone.Collection.extend({
    model: TodoModel, // ссылка на класс модели
    localStorage: new Backbone.LocalStorage('todo'),

    all() {
        return this
    },

    complete() {
        return this.where({ complete: true })
    },

    remain() {
        return this.where({ complete: false })
    },

    filtered(str) {
        let filteredTitles = this.pluck('title').filter(i => i.toLowerCase().startsWith(str.toLowerCase()))
        return filteredTitles.reduce((acc, i) => { return [this.where({ title: i }), ...acc] }, []).flat()
    }
});

const coll = new TodoC();

/* 
 coll.add(экз модели) [ex1, ex2]
 .remove(экз) 
 .reset(экз) удаляет всё и встав новое
 .at(0)
 .toJSON() массив всех экз
 .each(callb(model, index, list) => index + model.get('str'))
*/

const LiView = Backbone.View.extend({
    tagName: 'li', // создаём
    id: 'list',
    events: {
        'click #toggle': 'toggle',
    },
    template: _.template($('#template').html()),

    initialize: function () {
        this.model.on('change', this.render, this);
    },

    render() { // заполняет el
        this.$el.html(this.template(this.model.toJSON()));
        return this
    },

    toggle() {
        this.model.toggle()
        if (Array.from([$('#Active'), $('#Completed')]).some(i => i.hasClass('active'))) setTimeout(() => this.$el.hide(), 100);
    },

    edit() {  // добавить

    }
});

const TodoMain = Backbone.View.extend({
    el: '#container',
    chars: [],

    initialize() {
        //  localStorage.clear()
        // coll.fetch()
        this.listenTo(coll, 'add', this.addOne);

        /*if(localStorage.length == 0){
           console.log(coll)
           ['Learn Javascript', 'Learn React', 'Build a React App'].forEach(i => {
               coll.create({ title: i })
           });
       ) else{
   
       }
   
           if (localStorage.length !== 0) {
               console.log(9)
              
           } else if(true){
               this.listenTo(coll, 'add', this.addOne);
           } else if(localStorage.length == 0){
               console.log(coll)
               ['Learn Javascript', 'Learn React', 'Build a React App'].forEach(i => {
                   coll.create({ title: i })
               });
           }*/

        ['Learn Javascript', 'Learn React', 'Build a React App'].forEach(i => {
            coll.create({ title: i })
        });
        /*
        coll.add([
            { title: 'Learn Javascript' },
            { title: 'Learn React' },
            { title: 'Build a React App' }
        ])*/


    },

    render(e) { // создание html отображения
        this.$el.find('ul').empty() // очищаем ul
        e.models.forEach(i => this.addOne(i))
        return this
    },

    events: { // 'событие селектор' : 'func'
        // ищет селектор в el
        // keydown :
        'keydown': 'enter',
        'click #add': 'focus',
        'click #search': 'focus',
        'click #All': 'getData',
        'click #Active': 'getData',
        'click #Completed': 'getData'
    },

    getData(e) {
        Array.from([$('#All'), $('#Active'), $('#Completed')]).forEach(i => i.toggleClass('active', false))
        e.target.classList.add('active')
        this.$el.find('#text').removeAttr("value")
        if (e.target.id === 'All') {
            this.render(coll)
        } else if (e.target.id === 'Active') { // новые экз коллекции?
            let collRemain = new TodoC(coll.remain());
            this.render(collRemain)
        } else {
            let collComp = new TodoC(coll.complete());
            this.render(collComp)
        }
    },

    enter(e) { // вызов каждый раз приз клике буквы - плохо
        if (this.$el.find('#add').hasClass('active')) { // добавлять ток если активен add input
            if (e.keyCode === 13) {
                let txt = this.$el.find('#text');
                // let Tmodel = new TodoModel({ title: txt.val() }); // параметр - передаваемые данные / Tmodel.toJSON() вывод данных

                /* if (!Tmodel.isValid()) {
                     alert(Tmodel.get("title") + " " + Tmodel.validationError);
                 } else {*/
                //  coll.add(Tmodel);
                // Tmodel.save()
                //}
                coll.create({ title: txt.val() })
                txt.val((i, val) => val = '');
            }
        } else if (this.$el.find('#search').hasClass('active')) { // если активирован поиск
            let activeFilter = Array.from([$('#All'), $('#Active'), $('#Completed')]).find(i => i.hasClass('active'))[0].id
            let filteredCollection = activeFilter === 'All' ? coll : activeFilter === 'Active' ? new TodoC(coll.remain()) : new TodoC(coll.complete())

            if (e.keyCode === 8) { // click backspace
                this.chars.pop()
                let collFiltered = new TodoC(filteredCollection.filtered(this.chars.join('')));
                this.chars.length === 0 ? this.render(filteredCollection) : this.render(collFiltered)
            } else if (e.key.length === 1) {
                this.chars.push(e.key)
                let collFiltered = new TodoC(filteredCollection.filtered(this.chars.join('')));
                this.render(collFiltered)
            }
        }
    },

    addOne(mod) {
        console.log(mod)
        let list = new LiView({ model: mod }) // передаём экз модели / list.model доступ к метод/свва модели
        list.el.style.listStyle = 'none';
        this.$el.find('ul').prepend(list.render().el) // render : this.$el.html(this.template(this.model.toJSON())) - в скобках: html код (инпут + текст)
        // list : list of views
    },

    focus(e) {
        if (e.target.classList.contains('active')) {
            e.target.classList.remove('active');
            this.$el.find('#text').hide()
        } else {
            if (this.$el.find('#search').hasClass('active') && e.target.id === 'add') {
                if (this.$el.find('#Active').hasClass('active')) {
                    let collRemain = new TodoC(coll.remain());
                    this.render(collRemain)
                } else if (this.$el.find('#Completed').hasClass('active')) {
                    let collComp = new TodoC(coll.complete());
                    this.render(collComp)
                } else this.render(coll)
            }
            this.$el.find('#text').removeAttr("value")
            Array.from([$('#add'), $('#search')]).forEach(i => i.toggleClass('active', false))
            e.target.classList.toggle('active')
            this.$el.find('#text').show() // добавить проверку на существов
            e.target.id === 'add' ? this.$el.find('#text').attr("placeholder", "Add New") : this.$el.find('#text').attr("placeholder", "Search")
        }
    }
});

let TodoMainEx = new TodoMain;