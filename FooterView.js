export class FooterView extends Backbone.View {
    constructor(parameters) {
        super(parameters);
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
            'click #Add, #Search': 'changeLeftState',
            'click #All, #Active, #Completed': 'changeRightState',
            'click #Default': '',
        }
    }

    initialize() {
        this.listenTo(this.model, 'change', _.debounce(() => this.changeButtonsColor(), 100))
    }

    render() {
        this.$el.html(this.templ(this.model.toJSON()));
        this.changeButtonsColor();
        return this
    }

    changeButtonsColor() {
        this.$el.find(`div:first-child > input:not(last-child)`).toggleClass('active', false) // всё очищаем

        if (this.model.get('idMod') === 'None') {
            this.$el.find(`div > #${this.model.get('idMod')}`).toggleClass('active', false)
        } else {
            this.$el.find(`div > #${this.model.get('idMod')}`).toggleClass('active', true)
        }

        this.$el.find(`div:last-child > input`).toggleClass('active', false)
        this.$el.find(`div > #${this.model.get('idBehaviour')}`).toggleClass('active', true)
    }

    changeLeftState(e) {
        if (this.model.get('idMod') === e.target.id) { // повторный клик
            this.model.set('idMod', 'None')
        } else { // клик по новой кнопке + проверка активны ли кнопки
            this.model.set('idMod', e.target.id)
        }
        e.stopPropagation();
    }

    changeRightState(e) {
        this.model.set('idBehaviour', e.target.id)
        e.stopPropagation();
    }
}


