import axios from "./config";
import {
    v4 as uuidv4
} from "uuid";

export function uploadImage(filename, formdata = {}, config = {}, callback) {
    const url = "https://storage.googleapis.com/apera-frontend.appspot.com/images/";

    const filetype = filename
        .split(".")
        .pop()
        .toLowerCase();

    const fileUrl = url + uuidv4() + "." + filetype;

    return axios
        .post(fileUrl, formdata, config)
        .then(() => {
            callback({
                name: filename,
                url: fileUrl
            });
        })
        .catch(err => {
            console.log(err);
        });
}