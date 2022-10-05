const db = require('./db')

module.exports = {
    getPosts: function(membership, callback) {
        if (membership == 'Admin' || membership == 'Premium') {
            let sql = `SELECT * from Post;`
            db.query(sql, function(err, data) {
                if (err) {
                    throw err
                } else {
                    return callback(data)
                }
            })
        } else {
            let sql = `SELECT * from Post WHERE Label = ` + db.escape(membership) + `;`
            db.query(sql, function(err, data) {
                if (err) {
                    throw err
                } else {
                    return callback(data)
                }
            })
        }
        // let sql = `SELECT * from Post;`
        // db.query(sql, function(err, data) {
        //     if (err) {
        //         throw err
        //     } else {
        //         return callback(data)
        //     }
        // })
    },
    getPost: function(PostID, callback) {
        let sql = `SELECT * from Post WHERE PostID = ?;`
        db.query(sql, PostID, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data[0])
            }
        })
    },
    addPost: function(PostData, callback) {
        let sql = `INSERT INTO Post SET Title = ` + db.escape(PostData.Title) + `, Body = ` + db.escape(PostData.Body) + `, CategoryID = ` + db.escape(PostData.CategoryID) + `, Status = ` + db.escape(PostData.Status) + `, Label = ` + db.escape(PostData.Label) + `;`
        db.query(sql, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data)
            }
        })
    },
    destroyPost: function(PostID, callback) {
        let sql = 'DELETE FROM Post WHERE PostID = ?;'
        db.query(sql, PostID, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data)
            }
        })
    },
    editPost: function(PostID, callback) {
        let sql = `SELECT * FROM Post WHERE PostID = ?`
        db.query(sql, PostID, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data[0])
            }
        })
    },
    updatePost: function(PostData, PostID, callback) {
        let sql = `UPDATE Post SET Title = ` + db.escape(PostData.Title) + `, Body = ` + db.escape(PostData.Body) + `, CategoryID = ` + PostData.CategoryID + `, Status = ` + db.escape(PostData.Status) + `, Label = ` + db.escape(PostData.Label) + `, UpdatedAt = ` + db.escape(new Date()) + ` WHERE PostID = ` + PostID + `;`
        db.query(sql, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data)
            }
        })
    }
}