import { BASE_URL } from "@/config";
import { Donate_Online_Type } from "@/types/donate_online";

import axios from "axios";

const createForm = (donate_online_data: Donate_Online_Type) => {
    const data: Promise<any> = new Promise((resolve, reject) => {
        axios.post(
            `${BASE_URL}api/donate-to-pari-onlines`, {
            data: donate_online_data
        }
        ).then((res) => {
            // console.log("Donate", res);
            resolve(res.data)
        }).catch(err => {
            reject(err);
        });
    });
    return data;
};

export {createForm};