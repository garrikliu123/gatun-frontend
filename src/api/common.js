import axios from "./config";

export function uploadImage(filename, formdata = {}, config = {}, callback) {
    const url = "https://storage.googleapis.com/apera-frontend.appspot.com/images/";
    return axios
        .post(url + filename, formdata, config)
        .then(() => {
            callback({
                name: filename,
                url: url + filename
            });
        })
        .catch(err => {
            console.log(err);
        });
}