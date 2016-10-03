var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {
    var User = app.models.Users;
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Usuário incorreto.' });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, { message: 'Senha incorreta.' });
                }
                return done(null, user);
            });
        }
        ));

    return passport;

}
