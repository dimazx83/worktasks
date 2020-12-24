export class ListItemView extends Backbone.View {
    constructor(o) {

        super(o);

     //   this.tagName = 'li'; // создаём
    //    this.id = 'list';
        /*this.events = {
            'click #toggle': 'toggle',
        };*/
        this.templ = _.template($('#template').html());
    }

    get tagName(){
        return 'li'
    }

    get id(){
        return 'list'
    }

    events() {
        return {
            'click #toggle': 'toggle',
        }
    }

    initialize() {

        this.model.on('change', this.render, this);
    }

    render() { // заполняет el
        this.$el.html(this.templ(this.model.toJSON()));
        return this
    }

    toggle() {
        this.model.toggle();
      //  this.model.save()
        if (Array.from([$('#Active'), $('#Completed')]).some(i => i.hasClass('active'))) setTimeout(() => this.$el.hide(), 100);
    }
};