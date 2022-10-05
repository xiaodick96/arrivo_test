const db = require('./db')

module.exports = {
    addPayment: function(PaymentID, Amount, callback) {
        let price = Amount
        if ((Amount % 100) == 0) {
            price = 'RM' + (Amount / 100) + '.00'
        } else {
            price = 'RM' + (Amount / 100)
            if (price.length != 6) {
                price = price + '0'
            }
        }
        let sql = `INSERT INTO Payment SET PaymentID = ` + db.escape(PaymentID) + `, Amount = ` + db.escape(price) + `, Status = 'due';`
        db.query(sql, function(err, data) {
            if (err) {
                throw err
            } else {
                return callback(data)
            }
        })
    },
    updatePaymentStatus: function(PaymentID, paidstatus, methods, callback) {
        if (paidstatus == 'true') {
            let payment_methods = JSON.stringify(methods)
            let status = 'paid'
            let sql = `UPDATE Payment SET Status = ` + db.escape(status) + `, PaymentMethod = ` + db.escape(payment_methods) + `, UpdatedAt = ` + db.escape(new Date()) + ` WHERE PaymentID = ` + db.escape(PaymentID) + `;`
            db.query(sql, function(err, data) {
                if (err) {
                    throw err
                } else {
                    return callback(data)
                }
            })
        } else {
            let sql = `UPDATE Payment SET UpdatedAt = ` + db.escape(new Date()) + ` WHERE PaymentID = ` + db.escape(PaymentID) + `;`
            db.query(sql, function(err, data) {
                if (err) {
                    throw err
                } else {
                    return callback(data)
                }
            })
        }
    }
}