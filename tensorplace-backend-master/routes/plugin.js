const mongoose = require('mongoose');
const multer = require("multer");
const express = require("express");
const router = express.Router();
const passport = require("passport");
var slugify = require('slugify');
const nodemailer = require("nodemailer");
var handlebars = require('handlebars');
var fs = require('fs');
var Request = require("request");
var path = require('path');
const ObjectId = mongoose.Types.ObjectId;
var appDir = path.dirname(require.main.filename);

// Load model
const Plugins = require("../models/Plugin");

// configuring Multer to use files directory for storing files
// this is important because later we'll need to access file path
const DIR = './uploads/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${DIR}images`);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    }
    else {
      callback(null, html);
    }
  });
}

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: 'mehul.zestard@gmail.com', // generated ethereal user
    pass: 'mehul3291' // generated ethereal password
  }
});

// @route POST /upload_plugin
// @desc upload plugin
// @access Private

router.post("/plugin/upload",
  passport.authenticate("jwt", { session: false }),
  upload.single('file'),
  (req, res) => {
    const pluginBody = JSON.parse(req.body.data);
    const url = req.protocol + '://' + req.get('host');
    const PluginData = new Plugins({
      user: req.user.id,
      slug: slugify(pluginBody.title, {
        lower: true,
        strict: true,
      }),
      image: url + '/uploads/images/' + req.file.filename,
      ...pluginBody,
    });

    PluginData
      .save()
      .then(plugin => res.json({
        success: true,
        data: plugin,
      }))
      .catch(err => console.log(err));
  });

router.post("/plugin/update",
  passport.authenticate("jwt", { session: false }),
  upload.single('file'),
  (req, res) => {

    const pluginBody = JSON.parse(req.body.data);
    const url = req.protocol + '://' + req.get('host');

    Plugins.findOne({ 'slug': pluginBody.slug }).then(plugin => {
      if (plugin) {
        plugin.title = pluginBody.title;
        plugin.githubRepoUrl = pluginBody.githubRepoUrl;
        plugin.codebase = pluginBody.codebase;
        plugin.language = pluginBody.language;
        plugin.shortDesc = pluginBody.shortDesc;
        plugin.longDesc = pluginBody.longDesc;
        plugin.inputType = pluginBody.inputType;
        plugin.outputType = pluginBody.outputType;
        plugin.price = pluginBody.price;

        if (req.file) {
          plugin.image = url + '/uploads/profile-image/' + req.file.filename;
        }

        plugin
          .save()
          .then(plugin => res.json({
            success: true,
            plugin: plugin,
          }))
          .catch(err => res
            .status(400)
            .json({ errors: { image: "Image error" } }))
      } else {
        return res.status(400).json({ error: "plugin not found" });
      }
    });
  });

router.get("/plugins",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var mysort = { createdAt: -1, };
    Plugins
      .aggregate([
        {
          $lookup: {
            from: 'orders',
            localField: '_id',
            foreignField: 'plugin',
            as: 'orderData'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'plugin',
            as: 'reviews'
          }
        },
        { $addFields: { "purchaseCount": { $size: { "$ifNull": ["$orderData", []] } } } },
        {
          $sort: mysort
        },
        {
          $unwind: "$user",
        },
        {
          $match: { 'user._id': ObjectId(req.user.id) }
        },
      ],
        (errors, result) => {
          if (result) {
            res.json(result);
          } else {
            return res.status(400).json(errors);
          }
        }
      );
  });

router.get("/plugins/top",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Plugins
      .aggregate([
        {
          $lookup: {
            from: 'orders',
            localField: '_id',
            foreignField: 'plugin',
            as: 'orderData'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'plugin',
            as: 'reviews'
          }
        },
        {
          $match: { 'user._id': ObjectId(req.user.id) }
        },
        {
          $unwind: "$user",
        },
        { $addFields: { "purchaseCount": { $size: { "$ifNull": ["$orderData", []] } } } },
        { $sort: { "purchaseCount": -1 } },
        {
          $limit: 5,
        },
      ],
        (errors, result) => {
          if (result) {
            res.json(result);
          } else {
            return res.status(400).json(errors);
          }
        }
      );
  });

router.get("/plugins/all",
  (req, res) => {
    var mysort = { createdAt: -1 };
    Plugins
      .aggregate([
        {
          $lookup: {
            from: 'orders',
            localField: '_id',
            foreignField: 'plugin',
            as: 'orderData'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'plugin',
            as: 'reviews'
          }
        },
        { $addFields: { "purchaseCount": { $size: { "$ifNull": ["$orderData", []] } } } },
        {
          $sort: mysort
        },
        {
          $unwind: "$user",
        },
      ],
        (errors, result) => {
          if (result) {
            res.json(result);
          } else {
            return res.status(400).json(errors);
          }
        }
      );
  });

router.get("/plugin/:slug",
  (req, res) => {
    Plugins
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'plugin',
            as: 'reviews'
          }
        },
        {
          $match: { 'slug': req.params.slug }
        },
        {
          $unwind: "$user",
        },
      ],
        (errors, result) => {
          if (result) {
            
            Request.get({
              "headers": { "content-type": "application/json" },
              // "url": `https://blockchain.tensorplace.io/query?action=querySeller&id=${result[0].user.userName}`,
              "url": `https://blockchain.tensorplace.io/query?action=querySeller&id=SELLER1`,
            }, (error, response, body) => {
              const userData = JSON.parse(body);
              if(userData.reputation) {
                result[0]['reputation'] = userData.reputation;
              }
              res.json(result);
            })
            // res.json(result);
          } else {
            return res.status(400).json(errors);
          }
        }
      );

  });

function countTotalRating(reviews) {
  let allRating = [];

  for (let i = 0; i < reviews.length; i++) {
    allRating.push(reviews[i].docRating);
    allRating.push(reviews[i].codeRating)
    allRating.push(reviews[i].devRating)
  }
  if (allRating.length > 0) {
    const allRates = allRating.reduce((total, num) => total + num, 0);
    return allRates / allRating.length;
  }

  return 0;
}

router.get("/search-plugins",
  (req, res) => {
    const searchParams = {
      'slug': { $regex: '.*' + req.query.search + '.*' },
    }

    if (req.query.codebaseFilter) {
      searchParams['codebase'] = { $in: [req.query.codebaseFilter] }
    }
    if (req.query.languageFilter) {
      searchParams['language'] = { $in: [req.query.languageFilter] }
    }
    if (req.query.priceFilter) {
      searchParams['price'] = { $lte: req.query.priceFilter }
    }

    Plugins
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'plugin',
            as: 'reviews'
          }
        },
        {
          $match: searchParams
        },
        {
          $unwind: "$user",
        },
      ],
        (errors, result) => {
          if (result) {
            let allPlugins = [];
            if (req.query.ratingFilter) {
              result.map((result2) => {
                if (result2.reviews && result2.reviews.length > 0) {
                  let totalReview = countTotalRating(result2.reviews);
                  if (totalReview >= req.query.ratingFilter) {
                    allPlugins.push(result2);
                  }
                }
              })
            } else {
              allPlugins = result;
            }

            res.json(allPlugins);
          } else {
            return res.status(400).json(errors);
          }
        }
      );
  });

router.get("/plugins/related/:slug",
  (req, res) => {
    var mysort = { createdAt: -1 };
    Plugins.find({ 'slug': { $ne: req.params.slug } })
      .limit(5)
      .sort(mysort)
      .populate('user', 'userName')
      .then(plugins => {
        if (plugins) {
          res.json(plugins);
        }
      })
  });

router.post("/plugins/support",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    readHTMLFile(appDir + '/templates/contactDeveloper.html', function (err, html) {
      var template = handlebars.compile(html);
      var replacements = {
        developerMsg: req.body.developerMsg
      };
      var htmlToSend = template(replacements);
      var mailOptions = {
        from: req.user.email,
        to: req.body.authorEmail,
        subject: `Contact for ${req.body.title}`,
        html: htmlToSend,
        attachments: [{
          filename: 'logo.png',
          path: `${appDir}/templates/logo.png`,
          cid: 'tensorplace' //same cid value as in the html img src
        }]
      };
      transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
          res.status(400).json({ error: 'Email send fail' })
        } else {
          res.json({
            success: true,
          })
        }
      });
    });
  });

module.exports = router;