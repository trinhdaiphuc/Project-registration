const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");

MomentHandler.registerHelpers(Handlebars);
Handlebars.registerHelper("nav", (message) => {
  let result = "";
  if (message) result = message;
  return result;
});

Handlebars.registerHelper("slot", (_quantity, _remaining, _id) => {
  let result = "";
  if (parseInt(_quantity) === parseInt(_remaining)) {
    result = `<a class="btn btn-info btn-xs" href="/projects/${_id}">
    <span class="glyphicon glyphicon-edit"></span>Register</a>`;
  } else {
    result = `<a class="btn btn-danger btn-xs" href="#">
    <span class="glyphicon glyphicon-remove"></span>Register</a>`;
  }
  return result;
});

Handlebars.registerHelper("json", (obj) => {
  return JSON.stringify(obj);
});

module.exports = Handlebars;
