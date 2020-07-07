const express = require("express");
const passport = require("passport");
var Request = require("request");
const router = express.Router();

// Load model
const User = require("../models/User");
const Plugins = require("../models/Plugin");
const Orders = require("../models/Order");

router.post("/order/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id }).then(user => {
      Plugins.findOne({ 'slug': req.body.pluginDetail.slug }).then((plugin, err) => {
      // Plugins.findOne({ 'slug': req.body.slug }).then((plugin, err) => {
        if (err) {
          res.status(500).send({ error: 'Error: could not add orders' });
        } else {
          const githuRepoUrl = plugin.githubRepoUrl.split('/');

          let repoName = githuRepoUrl[githuRepoUrl.length - 1];
          let repoOwner = githuRepoUrl[githuRepoUrl.length - 2];

          const gitApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/collaborators/${user.githubId}?permission=pull`;

          User.findById({ _id: plugin.user }).then(user1 => {
            if(user1) {
              Request.put({
                "headers": { "Authorization": 'token ' + user1.githubToken, 'User-Agent': 'node.js' },
                "url": gitApiUrl,
              }, (error, response, body) => {
                console.log(error);
              })
            }
          });

          const OrderData = new Orders({
            ...req.body,
            user: req.user.id,
            plugin: plugin._id,
          });
          OrderData
            .save()
            .then(order => res.json({
              success: true,
              data: order,
            }))
            .catch(err => res.status(500).send({ error: err }));
        }
      })
    })
  }
)

router.get('/orders',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Orders.find({ user: req.user.id })
      .populate(
        {
          path: 'plugin', model: 'plugins',
          populate: {
            path: 'user',
            model: 'users',
            select: 'userName'
          }
        })
      .populate('user')
      .select("-user, -_id")
      .exec((err, orders) => {
        if (err) {
          res.status(500).send({ error: 'Error: could not retrieve orders' });
        } else {
          res.send(orders)
        }
      })
  });

module.exports = router;