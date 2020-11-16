const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./util/geocode");

const app = express();

app.set("view engine", "hbs"); //which is your template engine ?
app.set("views", "templates/views"); //where are your templates ?

const publicDirPath = path.join(__dirname, "../public");
app.use(express.static(publicDirPath));
hbs.registerPartials("templates/partials");
const port = process.env.PORT || 3000;

app.get("", (req, res, next) => {
  res.render("index", {
    title: "Weather App Home",
    name: "Jay",
  });
});

app.get("/weather", (req, res, next) => {
  if (!req.query.address) {
    return res.send({
      error:
        "Please submit the request with address where you would like to know the weather.",
    });
  } else {
      geoCode.getWeatherOfPlace(req.query.address, (data) => {
        res.send(data);
      });
  }
});

app.get("/about", (req, res, next) => {
  res.render("about", {
    title: "About Me",
    name: "Jay",
  });
});

app.get("/help", (req, res, next) => {
  res.render("help", {
    title: "Help",
    message: "Contact customer care",
    name: "Jay",
  });
});

app.get("/help/*", (req, res, next) => {
  res.render("pageNotFound", {
    message: "Hellp Articles not found",
    title: "404 Page Not Found",
    name: "Jay",
  });
});

app.get("*", (req, res, next) => {
  res.render("pageNotFound", {
    title: "404 Page Not Found",
    message: "404 - Requested page not found",
    name: "Jay",
  });
});

app.listen(port, (req, res, next) => {
  console.log(`server is up on port ${port}..`);
});
