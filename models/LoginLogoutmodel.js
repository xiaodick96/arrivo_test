const db = require('./db')
const crypto = require('crypto')

module.exports = {
    login: function(Username, Password, callback) {
        const hash = crypto
            .createHash('sha256')
            .update(Password)
            .digest('hex')

        let sql = `SELECT * from User where Username = ` + db.escape(Username) + ` and Password = ` + db.escape(hash) + `;`
        db.query(sql, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data)
            }
        })
    },
    getFullName: function(Username, callback) {
        let sql = `SELECT FullName, Membership, UserID FROM User where Username = ` + db.escape(Username) + `;`
        db.query(sql, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data[0])
            }
        })
    },
    addUser: function(Username, Password, Email, callback) {
        checkUsername(Username, function(data) {
            const hash = crypto
                .createHash('sha256')
                .update(Password)
                .digest('hex')
            if (data.length > 0) {
                return callback('Username Exists')
            } else {
                let sql = `INSERT INTO User SET Username = ` + db.escape(Username) + `, Password = ` + db.escape(hash) + `, Email = ` + db.escape(Email) + `, Membership = 'Normal';`
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
    checkUser: function(Email, callback) {
        let checksql = `SELECT * FROM User WHERE Email = ` + db.escape(Email) + `;`
        db.query(checksql, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data[0])
            }
        })
    }
}


function checkUsername(Keyword, callback) {
    let checksql = `SELECT * FROM User WHERE Username = ` + db.escape(Keyword) + `;`
    db.query(checksql, function(err, data) {
        if (err) {
            throw err
        } else {
            return callback(data)
        }
    })
}