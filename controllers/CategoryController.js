const CategoryModel = require('../models/Categorymodel')

module.exports = {
    getCategories: function(req, res) {
        if (req.session.membership == 'Admin') {
            checkrole = true
        } else {
            checkrole = false
        }
        CategoryModel.getCategories(function(data) {
            return res.render('category/list', { list: data, admin: checkrole })
        })
    },
    getCategory: function(req, res) {
        let { id } = req.params;
        CategoryModel.getCategory(id, function(data) {
            return res.render('category/detail', { viewTitle: 'Category Detail', category: data })
        })
    },
    addCategory: function(req, res) {
        if (req.session.membership == 'Admin')
            return res.render('category/Add', { viewTitle: 'Add Category' })
        else
            return res.redirect('/dev/category/list')
    },
    insertCategory: function(req, res) {
        let CategoryData = req.body
        if (req.session.membership == 'Admin')
            CategoryModel.addCategory(CategoryData, function(data) {
                if (data) {
                    return res.redirect('/dev/category/list')
                } else {
                    return res.send("FAILED")
                }
            })
        else
            return res.redirect('/dev/category/list')
    },
    destroyCategory: function(req, res) {
        let { id } = req.params
        if (req.session.membership == 'Admin')
            CategoryModel.destroyCategory(id, function(data) {
                return res.redirect('/dev/category/list')
            })
        else
            return res.redirect('/dev/home')
    },
    editCategory: function(req, res) {
        let { id } = req.params
        CategoryModel.editCategory(id, function(data) {
            return res.render('category/Edit', { viewTitle: 'Edit Category', category: data })
        })
    },
    updateCategory: function(req, res) {
        let CategoryData = req.body
        let { id } = req.params
        if (req.session.membership == 'Admin')
            CategoryModel.updateCategory(CategoryData, id, function(data) {
                return res.redirect('/dev/category/list')
            })
        else
            return res.redirect('/dev/home')
    }
}