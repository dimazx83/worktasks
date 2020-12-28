import { ButtonCollection } from './ButtonCollection.js';

export class FooterView extends Backbone.View {
    constructor(o) {
        super(o);

        //  this.tagName = 'div';
        // this.id = 'footer';
        //this.templ = _.template($('#templateFooter').html());

    }

    get templ() {
        return _.template($('#templateFooter').html());
    }

    get tagName() {
        return 'div'
    }

    get id() {
        return 'footer'
    }

    events() {
        return {
            'click #Add': 'state',
            'click #Search': 'state',
            'click #Default': '',
            'click #All': 'state',
            'click #Active': 'state',
            'click #Completed': 'state'
            /* 'click #All': 'itemsFiltration',
             'click #Active': 'itemsFiltration',
             'click #Completed': 'itemsFiltration',*/
        }
    }

    initialize() {
        console.log(this)
        this.listenTo(this.collection, 'change', this.render)
    }

    render() { // заполняет el

        console.log(this)

        this.$el.html(this.templ(this.collection.models[0].toJSON()));

        this.collection.models.forEach(i => {
            if (i.get('mod')) { 

                this.$el.find(`div > #${i.get('id')}`).addClass('active')

            } // else this.$el.find(`div > #${i.get('id')}`).removeClass('active')
        })

        // this.$el.html(this.templ(this.model.toJSON()));

        /*  let list = new ListItemView({ model: mod }); // передаём экз модели / list.model доступ к метод/свва модели
         this.$el.find('ul').prepend(list.render().el); // render : this.$el.html(this.template(this.model.toJSON())) - в скобках: html код (инпут + текст)
         // list : list of views */

        //  this.$el.html(this.templ(this.collection.models[0].toJSON()));
        // this.$el.html(this.templ(this.collection.models[1].toJSON()));
        return this
    }

    state(e) {
       
     /*
        if( this.model.rge === e.target.id){
            this.model.mode = null;
        } else {
            this.model.mode = e.target.id
        }*/


        let arr = this.collection.where({ id: e.target.id })[0];


        if (arr.get('side') != '') { // если левые кнопки

            if (arr.get('mod')) { // клик по активной кнопке
                this.collection.slice(0, 2).forEach(i => i.set('mod', '')) // дважды рендер?

            } else if (this.collection.slice(0, 2).some(i => i.get('mod'))) { // хоть одна кнопка on
                this.collection.slice(0, 2).forEach(i => i.toggle());

            } else arr.set('mod', true) // если все кнопки off   // а тут не дважды

        } else if (!arr.get('mod')) { // запрет на нажатие по активированной правой кнопке
            this.collection.slice(-3).forEach(i => i.set('mod', ''));
            arr.toggle();

            /* 
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
         */

        }
        e.stopPropagation();
        


    }

    itemsFiltration() {

    };
}


