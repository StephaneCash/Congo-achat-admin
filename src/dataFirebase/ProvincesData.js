import { db } from "../config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import {useState} from "react";

const provincesCollection = collection(db, 'ads');
let data = [];

export default {
    collectionProvinces: async () => {
        const provinces = await getDocs(provincesCollection);
        data.push(provinces.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        return console.log(data);
    }
}