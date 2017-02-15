var Backbone = require('backbone');
var $ = require('jquery');

var contactForm = require('../../templates/contactForm.hbs');
var contactItemTemplate = require ('../../templates/contactItem.hbs');

// $.fn.serializeObject = function() {
//    return this.serializeArray().reduce(function(acum, i) {
//      acum[i.name] = i.value;
//      return acum;
//    }, {});
//  };

var Instructions = Backbone.View.extend({
  tagName: 'div',
  id: 'instructions',
  className: 'contact-instructions well col-md-12',
  render: function(){
    this.$el.text('New Contact');
    console.log(Instructions);
    //always return this after using render
    return this;

  }
});

var ContactForm = Backbone.View.extend({

  tagName: 'form',
  id: 'contact-form',
  className: 'well',

  events: {
    'click .clickme': 'addContact'

  },

  addContact: function(event){
    event.preventDefault();
    // prompt('Are you sure you want to add this contact');
    // var contact = this.$el.serializeObject();

    var contact = {
      email: $('#form-email').val(),
      name: $('#form-name').val(),
      phone: $('#form-phone-number').val(),
      twitter: $('#form-twitter').val(),
      linkedin: $('#form-linkedin').val()
    }

    console.log(contact);

    this.collection.create(contact);
  },

  render: function(){
    console.log(ContactForm);
    this.$el.html(contactForm());
      //always return this after using render:
    return this;
  }
});

var ContactListView = Backbone.View.extend({
  tagName: 'ul',
  id: 'contact-list',
  className: 'list-group',

  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderContact);
  },

  render: function(){
    return this;
  },

  renderContact: function(contact) {
    var contact = new ContactItemView({model: contact});
    this.$el.append(contact.render().$el)
  }

});

var ContactItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'list-group-item',
  template: contactItemTemplate,
  events: {
    'click .destroy': 'markComplete'
  },
  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function(){
    var context = this.model.toJSON();
    this.$el.html(this.template(context));
    return this;
  },

  markComplete: function(event){
    event.preventDefault();
    this.model.destroy();
  }


});




module.exports = {
  Instructions: Instructions,
  ContactForm: ContactForm,
  ContactListView: ContactListView,
  ContactListView: ContactListView
};
