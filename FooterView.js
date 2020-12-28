export class FooterView extends Backbone.View {
    constructor(o) {
        super(o);
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
            /* 
             'click #All': 'itemsFiltration',
             'click #Active': 'itemsFiltration',
             'click #Completed': 'itemsFiltration',
            */
        }
    }

    initialize() {
        this.$el.html(this.templ(this.model.toJSON())); // поменять/убрать
        this.listenTo(this.model, 'change', _.debounce(() => this.render(), 100))
    }

    render() { // заполняет el
        if (this.model.get('idMod') == 'Add' || this.model.get('idMod') == 'Search') { // рендер левых кнопок
            this.$el.find(`div:first-child > input:not(last-child)`).removeClass('active') // всё очищаем
            this.$el.find(`div > #${this.model.get('idMod')}`).addClass('active')

            /*  } else{
                 console.log(this.model.get('mod')) */

            this.model.get('mod') ? this.$el.find(`div > #${this.model.get('idMod')}`).addClass('active') : this.$el.find(`div > #${this.model.get('idMod')}`).removeClass('active')
        }
        if (this.model.get('idBehaviour')) { // рендер правых кнопок
            this.$el.find(`div:last-child > input`).removeClass('active')
            this.$el.find(`div > #${this.model.get('idBehaviour')}`).addClass('active')
            //  this.model.get('behaviour') ? this.$el.find(`div > #${this.model.get('idBehaviour')}`).addClass('active') : this.$el.find(`div > #${this.model.get('idBehaviour')}`).removeClass('active')
        }

        return this
    }

    state(e) {
        //console.log(this.model.get('mod')) // не изменно / убрать?
        if (e.target.id == 'Add' || e.target.id == 'Search') {
            if (this.model.get('idMod') === e.target.id) {
                // this.model.set('idMod', '');
                this.model.toggle()
            } else this.model.set('idMod', e.target.id)
        } else {
            this.model.set('idBehaviour', e.target.id)
        }

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
     
 
    }*/
        e.stopPropagation();

    }

    itemsFiltration() {

    };
}


