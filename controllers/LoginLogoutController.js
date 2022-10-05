const LoginLogoutModel = require('../models/LoginLogoutmodel')
const UserModel = require('../models/Usermodel')

module.exports = {
    backdefault: function(req, res) {
        return res.redirect('/dev/loginpage')
    },
    login: function(req, res) {
        let { Username, Password } = req.body
        LoginLogoutModel.login(Username, Password, function(data) {
            if (data.length > 0) {
                req.session.login = true
                req.session.authlogin = true
                req.session.user = Username
                req.session.userid = data[0].UserID
                req.session.membership = data[0].Membership
                return res.redirect('/dev/home')
            } else {
                return res.redirect('/dev/loginpage')
            }
        })
    },
    logout: function(req, res) {
        req.session.destroy()
        return res.redirect('/dev/loginpage')
    },
    homepage: function(req, res) {
        if (req.oidc.isAuthenticated() || req.session.login) {
            if (!req.session.authlogin) {
                LoginLogoutModel.checkUser(req.oidc.user.name, function(data) {
                    if (data) {
                        req.session.authlogin = true
                        req.session.user = data.Username
                        req.session.membership = data.Membership
                        req.session.userid = data.UserID
                        res.redirect('/dev/home')
                    } else {
                        return res.render('home/auth0newuser', { viewTitle: 'Welcome to our webiste!', email: req.oidc.user.name })
                    }
                })
            } else {
                if (req.oidc.isAuthenticated()) {
                    LoginLogoutModel.getFullName(req.session.user, function(data) {
                        req.session.membership = data.Membership
                        if (req.session.membership == 'Admin') {
                            member = true
                        } else {
                            member = false
                        }
                        return res.render('home/index', { user: data.FullName, status: true, admin: member, id: data.UserID })
                    })
                } else {
                    LoginLogoutModel.getFullName(req.session.user, function(data) {
                        req.session.membership = data.Membership
                        if (req.session.membership == 'Admin') {
                            member = true
                        } else {
                            member = false
                        }
                        return res.render('home/index', { user: data.FullName, status: false, admin: member, id: data.UserID })
                    })
                }
            }
        } else {
            return res.redirect('/dev/loginpage')
        }
    },
    loginpage: function(req, res) {
        UserModel.getUsers(function(data) {
            if (req.session.login) {
                return res.redirect('/dev/home')
            } else if (req.oidc.isAuthenticated()) {
                return res.redirect('/dev/home')
            } else {
                return res.render('home/login')
            }
        })
    },
    newUserfromAuth0: function(req, res) {
        LoginLogoutModel.checkUser(req.oidc.user.name, function(data) {
            if (data == 'Email Exists') {
                return res.send("Email Exists")
            } else {
                return res.render('home/auth0newuser', { viewTitle: 'Welcome to our webiste!', email: req.oidc.user.name })
            }
        })
    },
    addAuth0User: function(req, res) {
        let { Username, Password, Email } = req.body
        LoginLogoutModel.addUser(Username, Password, Email, function(data) {
            if (data == 'Username Exists') {
                return res.send("Username Exists")
            } else {
                return res.redirect('/dev/user/edit/' + data.insertId)
            }
        })
    },
}