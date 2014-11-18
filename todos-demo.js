Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, { sort: { createdOn: -1 } });
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      var title = event.target.title.value;
      var description = event.target.description.value;

      Tasks.insert({
        title: title,
        description: description,
        createdOn: new Date()
      })

      event.target.title.value = "";
      event.target.description.value = "";

      return false;
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });
}
