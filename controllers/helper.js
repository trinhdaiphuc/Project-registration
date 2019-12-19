const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");

MomentHandler.registerHelpers(Handlebars);
Handlebars.registerHelper("nav", (message) => {
  let result = "";
  if (message) result = message;
  return result;
});

Handlebars.registerHelper("slot", (_remaining, _id) => {
  let result = "";
  if (parseInt(_remaining) > 0) {
    result = `<a class="btn btn-info btn-xs" href="/projects/${_id}">
    <span class="glyphicon glyphicon-edit"></span>Available</a>`;
  } else {
    result = `<a class="btn btn-danger btn-xs" href="/projects/${_id}">
    <span class="glyphicon glyphicon-remove"></span>Unavailable</a>`;
  }
  return result;
});

Handlebars.registerHelper("json", (obj) => {
  return JSON.stringify(obj);
});

Handlebars.registerHelper("ErrorMessage", (message) => {
  var result = "";
  if (message != "") {
    result =
      `<div class="container" style="width: 75%"><div class="alert alert-danger text-center justify-content-center">` +
      message +
      `</div></div> `;
  }
  return result;
});

module.exports = Handlebars;
