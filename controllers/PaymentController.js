const PaymentModel = require('../models/Paymentmodel')
const UserModel = require('../models/Usermodel')
const Billplz = require('billplz')
const axios = require('axios')
const Usermodel = require('../models/Usermodel')

const billplz = new Billplz({
    'key': process.env.BILLPLZ_KEY,
    'endpoint': process.env.BILLPLZ_ENDPOINT,
    'sandbox': true
})

module.exports = {
    createPremiumBill: function(req, res) {
        let { id } = req.params
        UserModel.getUser(id, function(data) {
            createbill(req.session.user, data.Email, function(callback) {
                req.session.premiumuserid = id
                return res.redirect(callback)
            })
        })
    },
    finishpayBill: function(req, res) {
        if (req.query.billplz.paid == 'true') {
            getMethod(function(methods) {
                PaymentModel.updatePaymentStatus(req.query.billplz.id, req.query.billplz.paid, methods, function(data) {
                    Usermodel.updateUserMembership(req.session.premiumuserid, function(data) {
                        return res.redirect('/dev/user/' + req.session.premiumuserid)
                    })
                })
            })
        } else {
            return res.send('your pay is failed')
        }
    }
}

function createbill(user, email, callback) {
    billplz.create_bill({
        'collection_id': 'iifvvmbg',
        'description': 'Testing for Premium Member',
        'email': email,
        'name': user,
        'amount': 135, //RM5.50
        'reference_1_label': "Testing",
        'reference_1': "Arrivo",
        'callback_url': "https://b59qfht3fd.execute-api.ap-southeast-1.amazonaws.com/dev/payment/",
        'redirect_url': "https://b59qfht3fd.execute-api.ap-southeast-1.amazonaws.com/dev/payment/finishpay",
        'due_at': new Date()
    }, function(err, res) {
        PaymentModel.addPayment(res.id, res.amount, function(data) {
            paymenturl = res.url
            return callback(paymenturl)
        })
    })
}

function getMethod(callback) {
    let config = {
        headers: { 'Authorization': 'Basic ' + Buffer.from(process.env.BILLPLZ_KEY).toString('base64') }
    }
    axios.get('https://www.billplz-sandbox.com/api/v3/collections/iifvvmbg/payment_methods', config)
        .then(function(payload) {
            return callback(payload.data)
        })
        .catch(function(error) {
            throw error
        })
}