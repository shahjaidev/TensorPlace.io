const mongoose = require('mongoose');
const express = require("express");
const passport = require("passport");
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

// Load model
const Plugins = require("../models/Plugin");
const Wishlist = require("../models/Wishlist");
const Review = require("../models/Review");

router.post("/wishlist/plugin/save",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Wishlist.findOne({ user: req.user.id }, (err, user) => {
      if (user) {
        Plugins.findOne({ 'slug': req.body.slug }).then((plugin, err) => {
          if (err) {
            res.status(500).send({ error: 'Error: could not add item to Wishlist' });
          } else {
            Wishlist.updateOne({ user: req.user.id },
              { $addToSet: { plugins: plugin._id } },
              (err, wishlist) => {
                if (err) {
                  res.status(500).send({ error: 'Error: could not add item to Wishlist' });
                } else {

                  res.send(wishlist)
                }
              })
          }
        })
      } else {
        let wishlist = new Wishlist();
        wishlist.user = req.user.id;

        wishlist.save((err, newWishlist) => {
          if (err) {
            res.status(500).send({ error: 'Error: could not create Wishlist' });
          } else {
            Plugins.findOne({ 'slug': req.body.slug }).then((plugin, err) => {
              if (err) {
                res.status(500).send({ error: 'Error: could not add item to Wishlist' });
              } else {
                Wishlist.updateOne({ user: newWishlist.user },
                  { $addToSet: { plugins: plugin._id } },
                  (err, wishlist) => {
                    if (err) {
                      res.status(500).send({ error: 'Error: could not add item to Wishlist' });
                    } else {
                      res.send(wishlist)
                    }
                  })
              }
            })
          }
        })
      }
    });
  }
)

router.put("/wishlist/plugin/remove",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Wishlist.findOne({ user: req.user.id }, (err, user) => {
      if (user) {
        Plugins.findOne({ 'slug': req.body.slug }).then((plugin, err) => {
          if (err) {
            res.status(500).send({ error: 'Error: could not add item to Wishlist' });
          } else {
            Wishlist.updateOne({ user: req.user.id },
              { $pull: { plugins: plugin._id } },
              (err, wishlist) => {
                if (err) {
                  res.status(500).send({ error: 'Error: could not add item to Wishlist' });
                } else {

                  res.send(wishlist)
                }
              })
          }
        })
      }
    });
  }
)

router.get('/wishlist',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Wishlist.findOne({ user: req.user.id })
      .populate(
        {
          path: 'plugins', model: 'plugins',
          populate: {
            path: 'user',
            model: 'users',
            select: 'userName'
          }
        }).exec((err, wishlists) => {
          if (err) {
            res.status(500).send({ error: 'Error: could not retrieve wishlists' });
          } else {
            // if (wishlists.plugins) {
            //   let wishlistData = [];
            //   wishlists.plugins.map((plugin) => {

            //   let reviews = Review.find({ 'plugin': ObjectId(plugin._id) }).then((review, err) => {

            //       return resolve();
            //     })
            //     console.log(reviews);
            //     plugin['reviews'] = reviews;
            //     //console.log(plugin)
            //     wishlistData.push(plugin)
            //   })

            res.send(wishlists)
          }


        });
  })


module.exports = router;