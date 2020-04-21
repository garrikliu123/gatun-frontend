import axios from 'axios';
import {
    Loading,
    Message
} from 'element-ui';


let loading = null;

axios.interceptors.request.use(
    request => {
        loading = Loading.service({
            fullscreen: true,
            lock: true
        });

        return request;
    },
    err => {
        Message({
            message: "Request Error !!!",
            type: "error",
            duration: 0
        });

        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    res => {
        if (loading) {
            loading.close();
        }


        if (res.data && res.data.success !== true) {
            console.log(res.data)
            Message({
                showClose: true,
                message: res.data.errMsg,
                type: "error",
            });
        }


        return res.data;
    }, err => {
        Message({
            message: "Response Error !!!",
            type: "error",
            duration: 0
        });

        return Promise.reject(err);
    }
);

export default axios