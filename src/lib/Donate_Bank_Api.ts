import { BASE_URL } from "@/config";
import { Donate_Bank_Type } from "@/types/donate_bank";


import axios from "axios";

const createForm_Donate_Bank = (donate_Bank_data: Donate_Bank_Type) => {
    const data: Promise<any> = new Promise((resolve, reject) => {
        axios.post(
            `${BASE_URL}api/donate-to-pari-bank-transfers`, {
            data: donate_Bank_data
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

export {createForm_Donate_Bank};