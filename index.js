var stripe = require('stripe')('sk_test_pKhMO9LAIc3aEb4SHqOxgZif'); 
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

router.get('/processpay/:tokenid/:amount', function (request, response) {
//    console.log('Request:' , request);

var stripetoken = request.params.tokenid;
// stripetoken = 'tok_1Bxl7DAPEFpkLkhTqhvQC0K8';
var amountpayable = request.params.amount;
amountpayable = amountpayable * 100;
console.log('Body params:', JSON.stringify(ropeequest.params) );
console.log('###########  Received token:',stripetoken);
console.log('###########  Received amt:',amountpayable);
//    console.log('Stripe:',stripe);
 //   console.log('Stripe.Charge:',stripe.charge);
    var charge = stripe.charges.create({
        amount: amountpayable,
        currency: 'usd',
        description: 'Sample transaction',
        source: stripetoken
    }, function (err, charge) {
        if (err)
            console.log(err);
        else{
	    console.log('SUCCESS',charge);
            response.send({ success: true });
}
    })
})

app.use(router);
app.listen(3333, function () {
    console.log('Server started');
})
