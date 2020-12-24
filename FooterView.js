import { FilteredCollection } from './filteredCollection.js';

export class FooterView extends Backbone.View {
    constructor(o) {
        super(o);

        //  this.tagName = 'div';
        // this.id = 'footer';
        //this.templ = _.template($('#templateFooter').html());
        
    }

    get templ(){
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
            /*  'click #Add': 'state',
              'click #Search': 'state',
              'click #Default': '',
              'click #All': 'itemsFiltration',
              'click #Active': 'itemsFiltration',
              'click #Completed': 'itemsFiltration',*/
        }
    }

    initialize() {
        this.collect = new FilteredCollection()

        
       
        
        this.collect.add([{ id: 'Add', mod: 'active', side: 'left' }, { id: 'Search', side: 'left' }, { id: 'All', mod: 'active' }, { id: 'Active' }, { id: 'Completed' }])
        console.log(this.collect)
       // console.log(this.collect)
        this.listenTo(this.model, 'change', this.render)
        // this.state()
        // console.log(this.model)
        //  console.log(this.model.get('id'))
       // this.model.set('mod', !this.model.get('mod'))
        //console.log(this.model)
        //   this.model.on('change', this.render, this);
      //  this.render()
    }

    render() { // заполняет el
        console.log(this.model)
        this.$el.html(this.templ(this.model.toJSON()));
        return this
    }

    state(e) {
        let arr = this.collect.where({ id: e })[0];

        if (arr.get('side') != '') { // если левые кнопки
            this.collect.slice(0, 2).forEach(i => i.toggle());
        } else if (arr.get('mod') != true) { // запрет на нажатие по активированной правой кнопке
            this.collect.slice(-3).forEach(i => i.toggle());
        }

    }

    itemsFiltration() {

    };
}


