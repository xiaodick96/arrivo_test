const db = require('./db')

module.exports = {
    getCategories: function(callback) {
        let sql = `SELECT * from Category;`
        db.query(sql, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data)
            }
        })
    },
    getCategory: function(CategoryID, callback) {
        let sql = `SELECT * from Category WHERE CategoryID = ?;`
        db.query(sql, CategoryID, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data[0])
            }
        })
    },
    addCategory: function(CategoryData, callback) {
        let sql = `INSERT INTO Category SET Name = ` + db.escape(CategoryData.Name) + `, Description = ` + db.escape(CategoryData.Description) + `, Activated = ` + db.escape(CategoryData.Activated) + `;`
        db.query(sql, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data)
            }
        })
    },
    destroyCategory: function(CategoryID, callback) {
        let sql = 'DELETE FROM Category WHERE CategoryID = ?;'
        db.query(sql, CategoryID, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data)
            }
        })
    },
    editCategory: function(CategoryID, callback) {
        let sql = `SELECT * FROM Category WHERE CategoryID = ?`
        db.query(sql, CategoryID, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data[0])
            }
        })
    },
    updateCategory: function(CategoryData, CategoryID, callback) {
        let sql = `UPDATE Category SET Name = ` + db.escape(CategoryData.Name) + `, Description = ` + db.escape(CategoryData.Description) + `, Activated = ` + db.escape(CategoryData.Activated) + `, UpdatedAt = ` + db.escape(new Date()) + ` WHERE CategoryID = ` + CategoryID + `;`
        db.query(sql, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data)
            }
        })
    }
}