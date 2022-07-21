import axios from "axios";

export default {
  IS_AUTH({ commit }, payload) {
    commit("SET_IS_AUTH", payload);
  },
  async PUSH_NEW_CATEGORY({ commit }, payload) {
    commit, payload;
    payload.category_image = payload.category_show_image;

    let formData = new FormData();

    formData.append("file", payload.category_image);
    formData.append("obj", JSON.stringify(payload));

    return await axios({
      method: "POST",
      url: `${process.env.VUE_APP_API_URL}/addCategory`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        path: "category-icons",
      },
    }).then((res) => {
      res;
      // commit("SEND_ORDER_DATA", order_data);
      commit;
    });
  },
  async DELETE_IMAGE({ commit }, payload) {
    return await axios({
      method: "POST",
      url: `${process.env.VUE_APP_API_URL}/deleteImage`,
      data: { img: payload },
      headers: {
        path: "category-icons",
      },
    }).then((res) => {
      res;
      // commit("SEND_ORDER_DATA", order_data);
      commit;
    });
  },
};
