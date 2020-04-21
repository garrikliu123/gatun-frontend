const axios = require('axios');
const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_T8sJUFdurO2ekP7zDvuxlw9100iM4JHaWC');

// 创建 express 实例
const app = express();
const checkoutRouter = express.Router();

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
})

module.exports = {
    chainWebpack: (config) => {
        const oneOfsMap = config.module.rule("less").oneOfs.store;
        oneOfsMap.forEach((item) => {
            item
                .use("sass-resources-loader")
                .loader("sass-resources-loader")
                .options({
                    // Provide path to the file with resources//此处为less全局变量放置的位置
                    resources: "./src/common/style/variable.less",
                })
                .end();
        });
    },

    configureWebpack: {
        resolve: {
            // 路径别名
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                "@": resolve("src"),
                src: resolve("src"),
                components: resolve("src/components"),
                common: resolve("src/common"),
                store: resolve("src/store"),
                router: resolve("src/router"),
                views: resolve("src/views"),
                api: resolve("src/api"),
            },
        },
    },

    devServer: {
        before: function(app) {
            app.use('/checkout', bodyParser.urlencoded({
                extended: true
            }));
            app.use('/checkout', bodyParser.json())
            app.use('/checkout', checkoutRouter);
        },
        proxy: {
            "/api": {
                target: "http://localhost:8081/gatun",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    },
};

function resolve(dir) {
    return path.join(__dirname, dir);
}