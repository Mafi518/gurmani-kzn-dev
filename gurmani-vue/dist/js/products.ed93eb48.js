(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["products"],{"2a4d":function(t,e,c){},"408b":function(t,e,c){"use strict";c("2a4d")},9495:function(t,e,c){},e6dc:function(t,e,c){"use strict";c.r(e);var a=c("7a23"),r={class:"products"};function n(t,e,c,n,o,s){var i=Object(a["K"])("v-product-list"),u=Object(a["K"])("v-footer");return Object(a["C"])(),Object(a["h"])("div",r,[Object(a["l"])(i),Object(a["l"])(u)])}var o={class:"products"},s={key:0,class:"products__title"},i={class:"products__list"};function u(t,e,c,r,n,u){var O=Object(a["K"])("v-back-btn"),d=Object(a["K"])("v-back-menu"),b=Object(a["K"])("v-category-list"),p=Object(a["K"])("v-product-item"),_=Object(a["K"])("v-product-popup");return Object(a["C"])(),Object(a["h"])(a["a"],null,[Object(a["i"])("section",o,[Object(a["l"])(d,{class:"fix"},{default:Object(a["T"])((function(){return[Object(a["l"])(O,{to:"/"}),0!==t.CATEGORY_PRODUCTS.length?(Object(a["C"])(),Object(a["h"])("h2",s,Object(a["O"])(t.CATEGORY_PRODUCTS[0].category_name),1)):Object(a["g"])("",!0)]})),_:1}),Object(a["l"])(b,{style:{padding:"30px 0px"}}),Object(a["i"])("div",i,[(Object(a["C"])(!0),Object(a["h"])(a["a"],null,Object(a["I"])(t.CATEGORY_PRODUCTS,(function(t){return Object(a["C"])(),Object(a["f"])(p,{key:t.product_id,product_data:t},null,8,["product_data"])})),128))])]),Object(a["l"])(a["b"],{name:"popup",mode:"out-in"},{default:Object(a["T"])((function(){return[t.PRODUCT.product_name?(Object(a["C"])(),Object(a["f"])(_,{key:0})):Object(a["g"])("",!0)]})),_:1})],64)}var O=c("1da1"),d=c("5530"),b=(c("96cf"),c("fb6a"),{class:"card__head"}),p={class:"card__image"},_=["src"],j={class:"card__body"},l={class:"card__title"},f={class:"card__description"},v={class:"card__footer buy-btn"},T={class:"card__price"};function m(t,e,c,r,n,o){var s=Object(a["K"])("v-favorite-btn"),i=Object(a["K"])("v-favorite-btn-active"),u=Object(a["K"])("v-icon");return Object(a["C"])(),Object(a["h"])("article",{class:"card",onClick:e[0]||(e[0]=function(){return o.getProductInfo&&o.getProductInfo.apply(o,arguments)})},[Object(a["J"])(t.$slots,"default",{},(function(){return[Object(a["i"])("div",b,[Object(a["i"])("picture",p,[Object(a["i"])("img",{src:"https://gurmanikzndev.joinposter.com".concat(c.product_data.photo_origin),alt:""},null,8,_)]),c.product_data.favorites?Object(a["g"])("",!0):(Object(a["C"])(),Object(a["f"])(s,{key:0})),1==c.product_data.favorites?(Object(a["C"])(),Object(a["f"])(i,{key:1})):Object(a["g"])("",!0)]),Object(a["i"])("div",j,[Object(a["i"])("h3",l,Object(a["O"])(c.product_data.product_name),1),Object(a["i"])("p",f,Object(a["O"])(c.product_data.product_production_description),1)]),Object(a["i"])("div",v,[Object(a["i"])("p",T,Object(a["O"])(c.product_data.price[1].slice(0,-2))+" ₽",1),Object(a["l"])(u,{name:"plus-icon",class:"plus-icon"})])]}),!0)])}var R=c("5502"),C={name:"v-product-item",props:{product_data:{type:Object,default:function(){return{}}}},methods:Object(d["a"])(Object(d["a"])({},Object(R["b"])(["GET_PRODUCT_INFO","GET_POPULAR_FROM_API","ADD_TO_CART","ADD_TO_FAVORITES"])),{},{reset:function(){this.size="small-size"},getCategoryID:function(t){t=this.PRODUCT.menu_category_id,console.log(t)},getProductInfo:function(t,e){var c=this;return Object(O["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e=c.product_data,!(t.target.classList.contains("buy-btn")||t.target.classList.contains("plus-icon")||t.target.classList.contains("plus-icon-path"))){a.next=9;break}return a.next=4,c.GET_PRODUCT_INFO(c.product_data);case 4:return a.next=6,c.ADD_TO_CART(c.product_data);case 6:c.$store.state.product={product:"empty"},a.next=10;break;case 9:t.target.parentNode.classList.contains("favorite-btn")||t.target.classList.contains("favorite-icon-path")||t.target.classList.contains("favorite-icon-active")||t.target.classList.contains("favorite-icon")?c.ADD_TO_FAVORITES(e):c.GET_PRODUCT_INFO(e);case 10:case"end":return a.stop()}}),a)})))()}}),computed:Object(d["a"])({},Object(R["c"])(["PRODUCT","POPULAR"])),mounted:function(){}},g=(c("408b"),c("6b0d")),h=c.n(g);const P=h()(C,[["render",m],["__scopeId","data-v-190a8e46"]]);var A=P,D=c("4fe6"),I={name:"v-product-list",components:{vProductItem:A,vCategoryList:D["a"]},computed:Object(d["a"])({},Object(R["c"])(["CATEGORY_PRODUCTS","PRODUCT"])),methods:Object(d["a"])(Object(d["a"])({},Object(R["b"])(["GET_CATEGORY_PRODUCTS_FROM_API","GET_CATEGORIES_FROM_API"])),{},{reRenderCards:function(){var t=this;return Object(O["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.GET_CATEGORY_PRODUCTS_FROM_API(localStorage.getItem("categoryID"));case 2:case"end":return e.stop()}}),e)})))()}}),mounted:function(){this.GET_CATEGORIES_FROM_API(),this.reRenderCards()}};c("f57e");const E=h()(I,[["render",u],["__scopeId","data-v-b6be8712"]]);var y=E,G={name:"v-category-products",methods:{},mounted:function(){},computed:{},components:{vProductList:y}};const k=h()(G,[["render",n]]);e["default"]=k},f57e:function(t,e,c){"use strict";c("9495")}}]);
//# sourceMappingURL=products.ed93eb48.js.map