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
            'click #Add, #Search, #All, #Active, #Completed': 'state',
            'click #Default': '',
        }
    }

    initialize() {
        this.$el.html(this.templ(this.model.toJSON()));
        this.listenTo(this.model, 'change', _.debounce(() => this.render(), 100))
    }

    render() { // заполняет el
        if (this.model.get('idMod') == 'Add' || this.model.get('idMod') == 'Search') { // рендер левых кнопок
            this.$el.find(`div:first-child > input:not(last-child)`).removeClass('active') // всё очищаем

            if (this.model.get('mod')) { // если что-то уже включено
                this.$el.find(`div > #${this.model.get('idMod')}`).addClass('active')
            } else {
                this.$el.find(`div > #${this.model.get('idMod')}`).removeClass('active')
            }
        }
        if (this.model.get('idBehaviour')) { // рендер правых кнопок
            this.$el.find(`div:last-child > input`).removeClass('active')
            this.$el.find(`div > #${this.model.get('idBehaviour')}`).addClass('active')
        }
        return this
    }

    state(e) {
        
        if (e.target.id == 'Add' || e.target.id == 'Search') { // модель левых кнопок

            if (this.model.get('idMod') === e.target.id) { // повторный клик
                this.model.toggle()
            } else { // клик по новой кнопке + проверка активны ли кнопки
                this.model.set('idMod', e.target.id)
                this.model.set('mod', true)
            }

        } else this.model.set('idBehaviour', e.target.id) // модель правых

        e.stopPropagation();
    }

}


