const express = require("express");
const config = require("../manifest");
const PosterApi = require("../api/poster");
// const cors = require('cors');
const ctrlTelegram = require("../api/telegram");
const addresses = require("../addresses.json");
const banners = require("../banners.json");
const popular_names = require("../popular_names.json");
const product_positions = require("../category_positions_config.json");
const categories = require("../categories.json");
const fs = require("fs");
const path = require("path");
const e = require("express");
const axios = require("axios");
const fileMiddleWare = require("../file");
var request = require("request");

const router = new express.Router();

router.post("/deleteImage", async (req, res) => {
  fs.unlink(
    `gurmani-backend/uploads/${req.headers.path}/${req.body.img}.jpg`,
    await function (err) {
      if (err) {
        res.status(500).send("Somthing wrong!");
      } else {
        console.log("Файл удалён");
        res.status(200).send("Файл удалён");
      }
    }
  );
});

router.post("/addCategory", fileMiddleWare.single("file"), async (req, res) => {
  // let categoryData = JSON.parse(req.body.obj);
  // categoryData.category_id = +categoryData.category_id;
  // let categories = JSON.parse(
  //   fs.readFileSync(path.resolve("gurmani-backend/categories.json"), "utf8")
  // );

  // if (
  //   categories.filter((item) => item.category_id == categoryData.category_id)
  //     .length
  // ) {
  //   res.status(400).send("Такой ID уже существует");
  // } else {
  //   categories.unshift(categoryData);
  //   let fullData = JSON.stringify(categories, null, 2);

  //   fs.writeFileSync("gurmani-backend/categories.json", fullData, (err) => {
  //     if (err) console.log(err);
  //     else res.status(200).send("Категория добавлена");
  //   });
  // }

  res.end();
});
// router.post(
//   "/saveImage",
//   upload.single("file"),
//   async function (req, res, next) {
//     console.log(req.file);

//     res.end();
//   }
// );

// router.post("/saveImage", async (req, res) => {
//   console.log(req.files);

//   res.end();
// });

router.post("/fronthook", async (req, res) => {
  let products_arr = req.body.products.map((item) => item.id);
  let products_kol = req.body.count.map((item) => item.count);

  let affilate =
    req.body.pickup_address.affilate_number == ""
      ? req.body.delivery_affilate
      : req.body.pickup_address.affilate_number;

  if (req.body.pickup_address.affilate_number == "") {
    if (affilate == null || affilate == undefined) {
      affilate = "";
    }
  } else {
    affilate = req.body.pickup_address.affilate_number;
  }

  var options = {
    method: "POST",
    url: "https://app.frontpad.ru/api/index.php?new_order",
    headers: {},
    formData: {
      secret:
        "triQaQz3Q3ysNHGnYrs9r6en29Bntz9QQirR2QEBE2SdzkseEKdYFi9shAGEZFeBSzdE9G5EyKGSZ3ZrA4a5a9iiASQikYK5eQyehnHE2diK674sZ4hZ3y8naKAkt8eBNDFYRdnEhAbby5teYE5H2323BkbYhfhYHRFnYYS5hY6EQnHzTD7GsTyS6ABdFK3dryt9da4nYZSzarTTSRr8zNRs9eyFRhH6E55H5YZQFE9FTTnBAFAYebadfz",
      name: req.body.name,
      phone: req.body.phone,
      affiliate: affilate,
      street:
        req.body.address.search_value !== ""
          ? req.body.address.search_value
          : "",
      home: req.body.address.house !== "" ? req.body.address.house : "",
      apart:
        req.body.address.apartment !== "" ? req.body.address.apartment : "",
      et: req.body.address.floor !== "" ? req.body.address.floor : "",
      pod: req.body.address.entrance !== "" ? req.body.address.entrance : "",
      descr: `${req.body.descr} ${
        req.body.delivery !== 0 ? `| Доставка ${req.body.delivery}₽` : ""
      }`,
      "product[]": products_arr,
      "product_kol[]": products_kol,
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });

  res.end();
});

router.get("/getProductsFromCategory", async (req, res) => {
  let id = req.query[0];

  const products = jsonDecoder(
    fs.readFileSync(__dirname + "/products.json", "utf8")
  );

  const category_products = products.filter((item) => item.category_id == id);

  res.send(category_products);
});

router.get("/getPopulars", async (req, res) => {
  const products = jsonDecoder(
    fs.readFileSync(__dirname + "/products.json", "utf8")
  );

  const populars = products.filter(
    (item) => item.second_category_name == "Популярное"
  );

  res.send(populars);
});

router.get("/categories", async (req, res) => {
  let fake_categories = JSON.parse(
    fs.readFileSync(path.resolve("gurmani-backend/categories.json"), "utf8")
  );
  let payload = {
    categories: categories,
    fake_categories: fake_categories,
  };
  res.send(payload);
});
// router.get('/categories', async (req, res) => {

//     const posterApi = new PosterApi({
//         token: config.token
//     });

//     const categories = await posterApi.makePosterRequest('menu.getCategories')

//     res.send(categories)
// })

router.get("/promocodes", async (req, res) => {
  const promocodes = jsonDecoder(
    fs.readFileSync(__dirname + "/promocodes.json", "utf8")
  );

  res.send(promocodes);
});

router.get("/getDiscountProduct:id", async (req, res) => {
  const posterApi = new PosterApi({
    token: config.token,
  });

  const discount_product = await posterApi.makePosterRequest(
    "menu.getProduct",
    "GET",
    {
      body: {
        product_id: req.params.id,
      },
    }
  );
  console.log(req.params.id);
  res.send(discount_product);
});

router.get("/getAddresses", async (req, res) => {
  res.send(addresses);
});

router.post("/order", async (req, res) => {
  const posterApi = new PosterApi({
    token: config.token,
  });
  const order_data = req.query;
  const order_data_address1 = JSON.parse(order_data.client_address);
  const order_data_address2 = JSON.parse(order_data.client_address2);

  const order = await posterApi.makePosterRequest(
    "incomingOrders.createIncomingOrder",
    "post",
    {
      body: {
        spot_id: 1,
        first_name: order_data.first_name,
        phone: order_data.phone,
        delivery_price:
          order_data.service_mode == "3" ? order_data.delivery_price : "",
        client_address: {
          address1:
            order_data.service_mode == "3"
              ? `${order_data_address1.street} |`
              : "",
          address2: `Дом: ${order_data_address2.house} | Квартира: ${order_data_address2.apartment} | Подъезд: ${order_data_address2.entrance} | Этаж ${order_data_address2.floor}`,
        },
        comment: order_data.comment,
        products: order_data.products.map((item) => JSON.parse(item)),

        // проблема с модификаторами либо в строке, либо в том, что я передаю modification в целом в заказ, а не конкретно в объект product
      },
    }
  );

  res.send(order);
});

router.get("/banners", async (req, res) => {
  res.send(banners);
});

router.post("/promoD", async (req, res) => {
  const data = await req.query;

  if (
    banners.filter((item) => item.promo_name == data.promo_name).length &&
    data.action === "add"
  ) {
    console.log("exists");
  } else if (data.action === "add") {
    await banners.push(data);
    let fullData = JSON.stringify(banners, null, 2);
    fs.writeFile("gurmani-backend/banners.json", fullData, (err) => {
      if (err) console.log(err);
    });
  }

  if (data.action === "delete") {
    let fullData = JSON.stringify(
      banners.filter(function (f) {
        return f.promo_name !== data.promo_name;
      }),
      null,
      2
    );
    fs.writeFile("gurmani-backend/banners.json", fullData, (err) => {
      if (err) console.log(err);
    });
  }

  res.end();
});

router.post("/telegram", ctrlTelegram.sendMsg);

router.post("/setNewAddress", async (req, res) => {
  const data = await req.query;

  data.id = addresses.length.toString();

  await addresses.push(data);
  let fullData = JSON.stringify(addresses, null, 2);
  fs.writeFile("gurmani-backend/addresses.json", fullData, (err) => {
    if (err) console.log(err);
  });
  res.end();
});

router.post("/deleteAddress", async (req, res) => {
  const data = await req.query;

  addresses.splice(data.id, 1);
  let fullData = JSON.stringify(addresses, null, 2);
  fs.writeFile("gurmani-backend/addresses.json", fullData, (err) => {
    if (err) console.log(err);
  });
  res.end();
});

router.post("/setNewPopular", async (req, res) => {
  const data = await req.query;

  await popular_names.push(data[0]);
  let fullData = JSON.stringify(popular_names, null, 2);
  fs.writeFile("gurmani-backend/popular_names.json", fullData, (err) => {
    if (err) console.log(err);
  });

  res.end();
});

router.post("/deletePopular", async (req, res) => {
  const data = await req.query;

  popular_names.splice(data[0], 1);

  let fullData = JSON.stringify(popular_names, null, 2);
  fs.writeFile("gurmani-backend/popular_names.json", fullData, (err) => {
    if (err) console.log(err);
  });

  res.end();
});

router.post("/saveProductPositions", async (req, res) => {
  const data = await req.body;

  let obj = {
    category_id: data[0].menu_category_id,
    products: data.map((item) => {
      return {
        product_name: item.product_name,
        category_name: item.category_name,
        category_id: item.menu_category_id,
        sort_id: item.sort_id,
      };
    }),
  };

  if (
    product_positions.filter((item) => item.category_id == obj.category_id)
      .length
  ) {
    console.log("change");
    let index = product_positions.filter(
      (item) => item.category_id == obj.category_id
    );
    product_positions.splice(product_positions.indexOf(index[0]), 1);
    product_positions.push(obj);
  } else {
    product_positions.push(obj);
  }

  let fullData = JSON.stringify(product_positions, null, 2);
  fs.writeFile(
    "gurmani-backend/category_positions_config.json",
    fullData,
    (err) => {
      if (err) console.log(err);
    }
  );

  res.end();
});

// router.post('/changePromocodeType', async (req, res) => {
//     const promocode = await req.body

//     if (promocodes_usage.filter(item => item.name.toUpperCase() == promocode.name.toUpperCase()).length) {
//         let index = promocodes_usage.filter(item => item.name.toUpperCase() == promocode.name.toUpperCase())
//         promocodes_usage.splice(promocodes_usage.indexOf(index[0]), 1)
//         promocodes_usage.push(promocode)
//         console.log('exist');
//     } else {
//         promocodes_usage.push(promocode)
//     }

//     let fullData = JSON.stringify(promocodes_usage, null, 2)
//     fs.writeFile(`gurmani-backend/promocode_type.json`, fullData, (err) => {
//         if (err) console.log(err)
//     })

//     res.end()
// })

function jsonDecoder(data) {
  return JSON.parse(data);
}

module.exports = router;
