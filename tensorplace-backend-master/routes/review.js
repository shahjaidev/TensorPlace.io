const express = require("express");
const passport = require("passport");
const router = express.Router();

// Load model
const Plugins = require("../models/Plugin");
const Review = require("../models/Review");

router.post("/plugin/review/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Plugins.findOne({ 'slug': req.body.slug }).then((plugin, err) => {
      if (err) {
        res.status(500).send({ error: 'Error: could not find plugin' });
      } else {
        const reviewBody = req.body;
        const ReviewData = new Review({
          user: req.user.id,
          plugin: plugin._id,
          ...reviewBody,
        });

        ReviewData
          .save()
          .then(review => res.json({
            success: true,
            data: review,
          }))
          .catch(err => console.log(err));
      }
    })
  });

router.get("/plugin/review/:slug",
  (req, res) => {
    Plugins.findOne({ 'slug': req.params.slug }).then((plugin, err) => {
      if (err) {
        res.status(500).send({ error: 'Error: could not find reviews' });
      } else {
        Review.find({ plugin: plugin._id })
          .populate('user','-password')
          .sort({ date: -1 })
          .exec((err, reviews) => {
            if (err) {
              res.status(500).send({ error: 'Error: could not retrieve reviews' });
            } else {
              res.send(reviews)
            }
          })
      }
    })
  });

module.exports = router;