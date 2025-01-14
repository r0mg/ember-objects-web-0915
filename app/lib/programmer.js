import Ember from 'ember';

export default Ember.Object.extend({

  fullName: Ember.computed("firstName", "lastName", function(){
    return `${this.get("firstName")} ${this.get("lastName")}`;
  }),

  isOld: Ember.computed.gte("age", 30),

  wroteRuby: Ember.computed.equal("authorOf", "Ruby"),

  keyNoteConferences: Ember.computed.filter("conferences.@each.keyNote", function(conference){
    return conference.keyNote === this.get("fullName");
  }),

  addConference: function(conference) {
    this.get("conferences").pushObject(conference);
  },

  conferenceNames: Ember.computed("conferences.[]", "conferences.@each.name", function(){
    return this.get("conferences").mapBy("name");
  }),

  conferenceTotal: Ember.computed.alias("conferences.length"),

  itinerary: Ember.computed("nickName", "conferenceTotal", function(){
    return `${this.get("nickName")} is speaking at ${this.get("conferenceTotal")} conferences`;
  }),

  hasValidEmail: Ember.computed.match("email", /.*?@.*?/),

  hasFirstName: Ember.computed.notEmpty("firstName"),
  hasLastName: Ember.computed.notEmpty("lastName"),
  hasAge: Ember.computed.notEmpty("age"),
  isValid: Ember.computed.and("hasFirstName", "hasLastName", "hasAge", "hasValidEmail"),
  isInvalid: Ember.computed.not("isValid"),
  hasErrors: Ember.computed.notEmpty("errors"),
  errors: Ember.computed("hasFirstName", "hasLastName", "hasAge", "hasValidEmail", function(){
    let errors = [];

      if(!this.get("hasFirstName")){
        errors.pushObject("firstName cannot be blank");
      }

      if(!this.get("hasLastName")){
        errors.pushObject("lastName cannot be blank");
      }

      if(!this.get("hasAge")){
        errors.pushObject("age cannot be blank");
      }      

      if(!this.get("hasValidEmail")){
        errors.pushObject("email must be valid");
      }

    return errors;
  }),

  greet(){
    return `Hi, My name is ${this.get("fullName")}. You can call me ${this.get("nickName")}`;
  }

});
