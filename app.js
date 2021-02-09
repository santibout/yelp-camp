const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Campground = require("./models/campground");
const seedDb = require("./seedDb");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const campgroundRoutes = require("./routes/campgrounds");
const engine = require("ejs-mate");

mongoose
  .connect("mongodb://localhost/yelpcamp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => "Mongo Connected")
  .catch(() => "Error Can't connect to Mongo");

app.engine("ejs", engine);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});
app.use(methodOverride("_method"));
app.use("/campgrounds", campgroundRoutes);

app.get("/", (req, res) => {
  const campground = new Campground({
    name: "first",
    price: 1,
    image: "someImageurl",
  });
  console.log(campground);
  res.render("home", { campground });
});

app.listen(3000, () => console.log("YelpCamp running"));

// app.get("/makeAll", (req, res) => {
//   seedDb();
//   res.send("made all campgrounds");
// });
