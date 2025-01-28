import { BASE_URL } from "@/config";
import { JoinUsType } from "../types/joinUsOrgs";
import axios from "axios";

const createModal = (joinUs: JoinUsType) => {
    const data: Promise<any> = new Promise((resolve, reject) => {
        axios.post(
            `${BASE_URL}api/joinuses`, {
            data: joinUs
        }
        ).then((res) => {
            // console.log("joinus", res);
            resolve(res.data)
        }).catch(err => {
            reject(err);
        });
    });
    return data;
};

export {createModal};
