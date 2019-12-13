const express = require("express");
const expressHbs = require("express-handlebars");
const paginate = require("express-handlebars-paginate");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const cookie = require("cookie-parser");
const session = require("express-session");
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");

MomentHandler.registerHelpers(Handlebars);
Handlebars.registerHelper("nav", function(message) {
  var result = "";
  if (message)
    result = message;
  return result;
});

const poolConnection = require("./models/index");
const router = require("./routes");

app.engine(
  "hbs",
  expressHbs({
    extname: "hbs",
    defaultLayout: "layouts",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
    helpers: {
      paginate: paginate.createPagination,
    },
  }),
);

app.use(morgan("dev"));

app.set("view engine", "hbs");

app.use(bodyParser.json());

app.use(cookie());

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(
  session({
    cookie: { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 },
    secret: "secret",
    saveUninitialized: false,
    resave: false,
  }),
);

app.set("port", process.env.NODE_PORT || 3000);

app.use(express.static(__dirname + "/public"));

app.use("/", router.user);
app.use("/projects", router.project);

app.listen(app.get("port"), () => {
  poolConnection.getConnection((err, connection) => {
    if (err) {
      console.error("[ERROR]:::: err", err);
    } else {
      console.log(`Database connected with threadId: ${connection.threadId}`);
    }
  });
  console.log(`Server is running on port ${app.get("port")}`);
});

app.get("*", (req, res) => res.send("Page Not found 404"));
