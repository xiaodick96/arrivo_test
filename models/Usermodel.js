const db = require('./db')
const crypto = require('crypto')

module.exports = {
    getUsers: function(callback) {
        let sql = `SELECT * from User;`
        db.query(sql, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data)
            }
        })
    },
    getUser: function(UserID, callback) {
        let sql = `SELECT * from User WHERE UserID = ?;`
        db.query(sql, UserID, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data[0])
            }
        })
    },
    addUser: function(UserData, callback) {
        checkUser(UserData.Username, UserData.Email, function(data) {
            const hash = crypto
                .createHash('sha256')
                .update(UserData.Password)
                .digest('hex')
            if (data.length > 0) {
                return callback('Username / Email Exists')
            } else {
                let sql = `INSERT INTO User SET Username = ` + db.escape(UserData.Username) + `, Password = ` + db.escape(hash) + `, Email = ` + db.escape(UserData.Email) + `, FullName = ` + db.escape(UserData.FullName) + `, Membership = ` + db.escape(UserData.Membership) + `;`
                db.query(sql, function(err, data) {
                    if (err) {
                        throw err
                    } else {
                        return callback(data)
                    }
                })
            }
        })

    },
    destroyUser: function(UserID, callback) {
        let sql = 'DELETE FROM User WHERE UserID = ?;'
        db.query(sql, UserID, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data)
            }
        })
    },
    editUser: function(UserID, callback) {
        let sql = `SELECT * FROM User WHERE UserID = ?`
        db.query(sql, UserID, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data[0])
            }
        })
    },
    updateUser: function(UserData, UserID, callback) {
        if (UserData.Password) {
            const hash = crypto
                .createHash('sha256')
                .update(UserData.Password)
                .digest('hex')
            let sql = `UPDATE User SET Username = ` + db.escape(UserData.Username) + `, Password = ` + db.escape(hash) + `, Email = ` + db.escape(UserData.Email) + `, FullName = ` + db.escape(UserData.FullName) + `, Membership = ` + db.escape(UserData.Membership) + `, UpdatedAt = ` + db.escape(new Date()) + ` WHERE UserID = ` + UserID + `;`
            db.query(sql, function(err, data) {
                if (err) {
                    throw err
                } else {
                    return callback(data)
                }
            })
        } else {
            let sql = `UPDATE User SET Username = ` + db.escape(UserData.Username) + `, Email = ` + db.escape(UserData.Email) + `, FullName = ` + db.escape(UserData.FullName) + `, Membership = ` + db.escape(UserData.Membership) + `, UpdatedAt = ` + db.escape(new Date()) + ` WHERE UserID = ` + UserID + `;`
            db.query(sql, function(err, data) {
                if (err) {
                    throw err
                } else {
                    return callback(data)
                }
            })
        }
    },
    updateUserMembership: function(UserID, callback) {
        let sql = `UPDATE User SET Membership = 'Premium', UpdatedAt = ` + db.escape(new Date()) + ` WHERE UserID = ` + db.escape(UserID) + `;`
        db.query(sql, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data)
            }
        })
    }
}

function checkUser(Username, Email, callback) {
    let checksql = `SELECT * FROM User WHERE Email = ` + db.escape(Email) + ` OR Username = ` + db.escape(Username) + `;`
    db.query(checksql, function(err, data) {
        if (err) {
            throw err
        } else {
            return callback(data)
        }
    })
}