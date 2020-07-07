const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
var Request = require("request");
const multer = require("multer");

const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateUserInput = require("../validation/editProfile");
const validateChangePasswordInput = require("../validation/changePassword");

// Load User model
const User = require("../models/User");

const DIR = './uploads/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${DIR}profile-image`);
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
  },
});

// @route POST /users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const userName = req.body.firstName + ' ' + req.body.lastName;
      const newUser = new User({
        userName: userName,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        githubId: req.body.githubId,
        githubToken: req.body.githubToken,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json({ errors: errors });
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ errors: { email: "Email not found" } });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          email: user.email,
          userName: user.userName,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              authToken: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ errors: { password: "Password incorrect" } });
      }
    });
  });
});

router.post('/login/github',
  function (req, res) {
    const clientData = {
      client_id: keys.GITHUB_CLIENT_ID,
      client_secret: keys.GITHUB_CLIENT_SECRET,
      code: req.body.userData.code,
    }

    Request.post({
      "headers": { "content-type": "application/json" },
      "url": "https://github.com/login/oauth/access_token",
      "body": JSON.stringify(clientData)
    }, (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      let params = body.split('&');
      if (params.length > 0) {
        let key = decodeURIComponent(params[0].replace('access_token=', ''));

        Request.get({
          "headers": { "Authorization": 'token ' + key, 'User-Agent': 'request' },
          "url": "https://api.github.com/user",
        }, (error, response, body) => {

          if (!body) {
            return res.send(401, 'User Not Authenticated');
          }

          const userData = JSON.parse(body);
          
          User.findOne({
            'githubId': userData.id,
            //'email': userData.email,
          }, function (err, user) {
            
            if (!user) {
              var newUser = new User({
                email: userData.email,
                githubOauthId: userData.id,
                userName: userData.login,
              });

              newUser.save(function (error, savedUser) {
                if (error) {
                  console.log(error);
                }
                let payload = {
                  id: savedUser.id,
                  email: savedUser.email,
                  userName: savedUser.userName,
                };
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  {
                    expiresIn: 31556926 // 1 year in seconds
                  },
                  (err, token) => {
                    res.json({
                      success: true,
                      authToken: "Bearer " + token
                    });
                  }
                );
              });
            } else {
              let payload = {
                id: user.id,
                email: user.email,
                userName: user.userName
              };
              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                  res.json({
                    success: true,
                    authToken: "Bearer " + token
                  });
                }
              );
            }
          });
        });
      }
    });
  }
);

// @route GET users/currentuser
// @desc Return current user
// @access Private
router.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user.id }).select("-password").then(user => {
      res.json(user);
    })
  },
);

router.put(
  "/reset_password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const { errors, isValid } = validateChangePasswordInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        // userData.password = hash;
        User.findByIdAndUpdate({ _id: req.user.id }, {
          password: hash,
        }
        )
          .then(user => res.json({
            success: true,
            user: user,
          }))
          .catch(err => console.log(err));
      });
    });
  });

router.post("/update",
  passport.authenticate("jwt", { session: false }),
  upload.single('file'),
  (req, res) => {
    // Form validation
    const userData = JSON.parse(req.body.data);
    const url = req.protocol + '://' + req.get('host');
    const { errors, isValid } = validateUserInput(userData);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findById({ _id: req.user.id }).then(user => {
      if (user) {
        // const userName = userData.firstName + ' ' + userData.lastName;

        user.email = userData.email;
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        // user.userName = userName;
        user.githubId = userData.githubId;
        user.githubToken = userData.githubToken;
        if (req.file) {
          user.profileImg = url + '/uploads/profile-image/' + req.file.filename;
        }

        user
          .save()
          .then(user => res.json(user))
          .catch(err => res
            .status(400)
            .json({ ...err }))
      } else {
        return res.status(400).json({ error: "user not found" });
      }
    });
  });

module.exports = router;