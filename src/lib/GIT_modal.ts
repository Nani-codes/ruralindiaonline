import { BASE_URL } from "@/config";
import { GIT_Types } from "@/types/getintouch_form";

import axios from "axios";

const createForm = (getInTouch: GIT_Types) => {
    const data: Promise<any> = new Promise((resolve, reject) => {
        axios.post(
            `${BASE_URL}api/get-in-touch-models`, {
            data: getInTouch
        }
        ).then((res) => {
            // console.log("Getintouch", res);
            resolve(res.data)
        }).catch(err => {
            reject(err);
        });
    });
    return data;
};

export {createForm};