const UserModel = require('../models/Usermodel')

module.exports = {
    getUsers: function(req, res) {
        if (req.session.membership == 'Admin') {
            UserModel.getUsers(function(data) {
                return res.render('user/list', { list: data, admin: true })
            })
        } else {
            return res.redirect('/dev/home')
        }
    },
    getUser: function(req, res) {
        if (req.session.authlogin) {
            let { id } = req.params;
            UserModel.getUser(id, function(data) {
                console.log(req.session.membership)
                if (req.session.membership == 'Admin') {
                    admin = true
                } else {
                    admin = false
                }
                if (data.Membership == 'Normal') {
                    normal = true
                } else {
                    normal = false
                }
                console.log(data)
                res.render('user/profile', { viewTitle: 'User Profile', user: data, member: normal, adminrole: admin })
            })
        } else {
            return res.redirect('/dev/loginpage')
        }
    },
    addUser: function(req, res) {
        if (req.session.membership == 'Admin')
            return res.render('user/Add', { viewTitle: 'Add User' })
        else
            return res.redirect('/dev/home')
    },
    insertUser: function(req, res) {
        let UserData = req.body
        if (req.session.membership == 'Admin')
            UserModel.addUser(UserData, function(data) {
                if (data != 'Username / Email Exists') {
                    console.log("Inserted")
                    return res.redirect('/dev/user/list')
                } else {
                    console.log("Failed")
                    return res.send("FAILED")
                }
            })
        else
            return res.redirect('/dev/home')
    },
    deleteUser: function(req, res) {
        let { id } = req.params
        if (req.session.membership == 'Admin')
            UserModel.destroyUser(id, function(data) {
                console.log("Deleted!")
                return res.redirect('/dev/user/list')
            })
        else
            return res.redirect('/dev/home')
    },
    editUser: function(req, res) {
        let { id } = req.params
        UserModel.editUser(id, function(data) {
            if (req.session.membership == 'Admin')
                res.render('user/Edit', { viewTitle: 'Edit User', user: data, admin: true })
            else
                res.render('user/Edit', { viewTitle: 'Edit User', user: data, admin: false })
        })
    },
    updateUser: function(req, res) {
        let UserData = req.body
        let { id } = req.params
        if (req.params.id == req.session.userid || req.session.membership == 'Admin')
            UserModel.updateUser(UserData, id, function(data) {
                console.log("Edited!")
                if (req.session.membership == 'Admin')
                    return res.redirect('/dev/user/list')
                else
                    return res.redirect('/dev/home')
            })
        else
            return res.redirect('/dev/home')
    }
}