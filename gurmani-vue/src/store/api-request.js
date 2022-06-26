import axios from "axios";
import store from "./index";

export default {
  async function(method, url, mutations, params) {
    console.log(params);
    return await axios({
      method: method,
      params: params,
      url: process.env.VUE_APP_API_URL + url,
    }).then((payload) => {
      if (mutations.length)
        for (const func of mutations) {
          store.commit(func, payload.data);
        }
      console.log("request");
      return payload;
    });
  },
};
