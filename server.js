const axios = require('axios');

const express = require("express");
const proxy = require("http-proxy-middleware").createProxyMiddleware;
const history = require("connect-history-api-fallback");
const port = process.env.PORT || 8080;

const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_T8sJUFdurO2ekP7zDvuxlw9100iM4JHaWC');

// 创建 express 实例
const app = express();
const checkoutRouter = express.Router();

//重定向到index.html
history({
    rewrites: [{
        from: /^\/libs\/.*$/,
        to: "/index.html",
    }, ],
});

app.use(history());

// 静态资源地址
app.use(express.static("./dist"));

checkoutRouter.post("/createSession", async function(req, res) {
    let err = null;
    let session = null;

    try {
        session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: req.body.items,
            locale: 'en',
            customer_email: req.body.customerEmail,
            shipping_address_collection: {
                allowed_countries: ['CA']
            },
            client_reference_id: req.body.userId,
            success_url: `http://localhost:8080/checkout/success?checkout_session_id={CHECKOUT_SESSION_ID}&user_id=${req.body.userId}`,
            cancel_url: 'http://localhost:8080/checkout',
        });
    } catch (e) {
        err = e;
    } finally {
        if (err) {
            res.send({
                success: false,
                errMsg: err.raw.message,
            })
        } else {
            res.send({
                success: true,
                session,
            })
        }
    }
});

checkoutRouter.get("/success", function(req, res) {
    const params = req.query;

    axios.get('http://localhost:8080/checkout/checkSession', {
        params: {
            sessionId: params.checkout_session_id,
        }
    }).then(res => {
        if (res.data && res.data.session) {
            const session = res.data.session;
            const orderId = session.payment_intent;
            const userId = params.user_id;
            const shipping = session.shipping;
            const display_items = session.display_items;

            const orderDetail = display_items.map(item => {
                return {
                    name: item.custom.name,
                    description: item.custom.description,
                    amount: item.amount,
                    quantity: item.quantity,
                    imageUrl: item.custom.images[0]
                };
            });

            const orderShipping = shipping.address;
            orderShipping.name = shipping.name;

            axios.post('http://localhost:8080/api/order/addOrder', JSON.stringify({
                orderId: orderId,
                userId: userId,
                orderDetail: JSON.stringify(orderDetail),
                orderShipping: JSON.stringify(orderShipping)
            }), {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            })
        }
    }).catch(e => {
        console.log(e)
    })

    res.redirect(
        `http://localhost:8080/checkout?checkout_session_id=${params.checkout_session_id}`)
})

checkoutRouter.get("/checkSession", async function(req, res) {
    const params = req.query;
    try {
        if (params && params.sessionId) {
            await stripe.checkout.sessions.retrieve(
                params.sessionId,
                function(err, session) {
                    if (err) {
                        res.send({
                            success: false,
                            errMsg: err.raw.message,
                        })
                    } else {
                        res.send({
                            success: true,
                            session,
                        })
                    }
                }
            );
        }
    } catch (err) {
        res.send({
            success: false,
            errMsg: err.raw.message,
        })
    }
});

app.use('/checkout', bodyParser.urlencoded({
    extended: true
}));
app.use('/checkout', bodyParser.json())
app.use('/checkout', checkoutRouter);

app.use(
    "/api",
    proxy({
        target: "http://localhost:8081/gatun",
        changeOrigin: true,
        pathRewrite: {
            "^/api": "",
        },
    })
);

app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log("Server is listening " + port + " port\n");
});