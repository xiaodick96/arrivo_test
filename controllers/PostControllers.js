const PostModel = require('../models/Postmodel')

module.exports = {
    getPosts: function(req, res) {
        if (req.session.membership == 'Admin') {
            checkrole = true
        } else {
            checkrole = false
        }
        PostModel.getPosts(req.session.membership, function(data) {
            return res.render('post/list', { list: data, admin: checkrole })
        })
    },
    getPost: function(req, res) {
        let { id } = req.params;
        if (req.session.membership == 'Admin')
            PostModel.getPost(id, function(data) {
                return res.render('post/detail', { viewTitle: 'Post Detail', post: data, body: data.Body, admin: true })
            })
        else
            PostModel.getPost(id, function(data) {
                return res.render('post/detail', { viewTitle: 'Post Detail', post: data, body: data.Body, admin: false })
            })
    },
    addPost: function(req, res) {
        if (req.session.membership == 'Admin')
            return res.render('post/Add', { viewTitle: 'Add Post' })
        else
            return res.redirect('/dev/home')
    },
    insertPost: function(req, res) {
        let PostData = req.body
        PostModel.addPost(PostData, function(data) {
            if (data) {
                return res.redirect('/dev/post/list')
            } else {
                return res.send("FAILED")
            }
        })
    },
    destroyPost: function(req, res) {
        let { id } = req.params
        if (req.session.membership == 'Admin')
            PostModel.destroyPost(id, function(data) {
                return res.redirect('/dev/post/list')
            })
        else
            return res.redirect('/dev/home')
    },
    editPost: function(req, res) {
        let { id } = req.params
        if (req.session.membership == 'Admin')
            PostModel.editPost(id, function(data) {
                return res.render('post/Edit', { viewTitle: 'Edit Post', post: data, body: data.Body })
            })
        else
            return res.redirect('/dev/home')
    },
    updatePost: function(req, res) {
        let PostData = req.body
        let { id } = req.params
        if (req.session.membership == 'Admin')
            PostModel.updatePost(PostData, id, function(data) {
                return res.redirect('/dev/post/list')
            })
        else
            return res.redirect('/dev/home')
    }
}