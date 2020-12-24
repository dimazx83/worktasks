export class LiView extends Backbone.View {
    constructor(o) {

        super(o);
        /*
        this.tagName = 'li'; // создаём
        this.id = 'list';
        this.events = {
            'click #toggle': 'toggle',
        };
        this.template = _.template($('#template').html());
        this.model.on('change', this.render, this);*/
    }

    get templ() {
        return _.template($('#template').html());
    }
    
    get tagName() { return "li"; }

    get idName() { return 'list' }

    events() {
        return {
            'click #toggle': 'toggle',
        };
    }

    initialize() {
        this.model.on('change', this.render, this);
    }

    render() { // заполняет el
        console.log(this)
        this.$el.html(this.templ(this.model.toJSON())); //this.template
        return this
    }

    toggle() {
        this.model.toggle();
        if (Array.from([$('#Active'), $('#Completed')]).some(i => i.hasClass('active'))) setTimeout(() => this.$el.hide(), 100);
    }
};