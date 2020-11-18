const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const debug = require("debug")("Appmelia-Backend:auth");
const models = require("../../db/models");
const bcryp = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
/*const GoogleStrategy = require("passport-google-oauth2").Strategy;*/

const { badCredentials, disable, badToken } = require("../../lib/newError");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, cb) {
      try {
        const user = await models.Users.findOne({
          attributes: ["id", "password"],
          where: {
            email,
          },
        });
        if (!user) return cb(badCredentials(), false);
        const match = await bcryp.compare(password, user.password);
        if (!match) return cb(badCredentials(), false);

        return cb(null, user);
      } catch (err) {
        return cb(err, false);
      }
    }
  )
);
passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWTSECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async function (jwtPayload, cb) {
      try {
        const user = await models.Users.findOne({
          where: { id: jwtPayload.UserId },
          raw: true,
        });
        if (!user) {
          return cb(badToken());
        }
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);
/*
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://yourdomain:3000/auth/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);*/
