var express = require("express");
var router = express.Router();
const Campground = require("../models/campground");

router.get("/create", (req, res) => {
  res.render("campgrounds/create", { c: { name: "" } });
});

router.get("/", async (req, res) => {
  const campgrounds = await Campground.find();
  //   console.log(campgrounds);
  res.render("campgrounds/all", { c: campgrounds });
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/edit", { c: campground });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const campground = new Campground({ ...req.body.campground });
  await campground.save();
  res.redirect("/campgrounds");
});

router.put("/:id", async (req, res) => {
  console.log("put route hit");
  const id = req.params.id;
  console.log(id);
  console.log(req.body.campground);
  await Campground.updateOne(
    { _id: id },
    {
      ...req.body.campground,
    }
  );
  res.redirect("/campgrounds");
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  res.render("campgrounds/showCampground", { c: campground });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

module.exports = router;
