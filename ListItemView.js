export class ListItemView extends Backbone.View {
    constructor(parameters) {
        super(parameters);
        this.templ = _.template($('#template').html());
    }

    get tagName() {
        return 'li'
    }

    get id() {
        return 'list'
    }

    events() {
        return {
            'click #toggle': 'toggle',
        }
    }

    initialize(options) {
        this.options = options;
        this.model.on('change', this.render, this);
    }

    render() {
        this.$el.html(this.templ(this.model.toJSON()));
        return this
    }

    toggle() {
        if (this.options.footer !== 'All') {
            if (this.$el.data('activated')) {
                return false
            };
            this.$el.data('activated', true);

         //  надо успеть отменить свой мисклик

            setTimeout(() => {
                this.$el.hide();
                this.$el.data('activated', false); // активируется через 100, до этого true
            }, 100);
        }

        this.model.toggle();
        this.model.save();
    }
};