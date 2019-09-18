<template>
  <section class="featured-restaurants" @mouseover="hoverCard()">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="title-block pull-left">
            <h4>Featured Food Items</h4>
          </div>
        </div>
      </div>
      <!-- restaurants listing starts -->
      <div class="row">
        <div
          v-for="product in products"
          :key="product.id"
          class="col-xs-12 col-sm-12 col-md-6 col-lg-4 food-item"
          data-aos="flip-left"
          data-aos-delay="100"
          data-aos-duration="2000"
          data-aos-anchor-placement="top-center"
        >
          <div class="food-item-wrap">
            <div
              class="figure-wrap bg-image"
              :style="{ backgroundImage: 'url(' + product.image + ')' }"
              style="background-size: 100% 100%; "
            >
              <div class="distance">{{product.resturantStatus}}</div>
              <div class="rating pull-left">
                <i v-for="n in product.resturantRating" :key="n.id" class="fa fa-star"></i>
                <i v-for="(n , j) in (5 - product.resturantRating)" :key="j" class="fa fa-star-o"></i>
              </div>
              <div class="review pull-right">
                <!-- <a href="#">198 reviews</a> -->
              </div>
            </div>
            <div class="content">
              <h5>
                <span style="font-weight: bold;">{{product.name}}</span>
              </h5>
              <div class="product-name">{{product.description}}</div>
              <div class="price-btn-block">
                <span class="price">PKR. {{product.price}}</span>
                <router-link
                  :to="'/resturant-profile/' + product.resturantId"
                  class="btn theme-btn pull-right"
                >Order Now</router-link>
              </div>
            </div>
            <div class="restaurant-block">
              <div class="left">
                <img
                  @mouseenter="hoverCard($event , product.resturantId )"
                  class="pull-left"
                  :src="product.resturantImage"
                  alt="Restaurant logo"
                  style="width: 50px; height: 50px; border-radius: 5px;"
                />
                <div class="pull-left right-text" style="font-size: 1rem; ">
                  <router-link
                    style="font-weight: bold;"
                    :to="'/resturant-profile/' + product.resturantId"
                  >{{product.resturant}}</router-link>
                  <span>{{product.resturantAddress}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- restaurants listing ends -->
      <!-- add restaurant starts -->
    </div>
    <div
      v-if="hoverProduct"
      class="card card-img-top animated jackInTheBox slow"
      :style="{display: card , top: y + 'px !important', left: x + 'px !important'}"
      style="width:250px;"
    >
      <img
        class="animated fadeIn slow delay-1s"
        :src="hoverProduct[0].resturantBackground"
        alt="Card image"
        style="width:100%;  height: 140px;"
      />
      <div class="row justify-content-center">
        <div class="col-3 order-2">
          <div class="card-profile-image">
            <a href="#">
              <img
                :src="hoverProduct[0].resturantImage"
                class="rounded-circle imgthumbnail"
                style="height: 80px; width:80px;"
              />
            </a>
          </div>
        </div>
      </div>
      <div class="card-body">
        <h4 class="card-title">{{hoverProduct[0].resturant}}</h4>
        <p class="card-text">{{hoverProduct[0].resturantDescription}}</p>
      </div>
    </div>
  </section>
</template>

<script>
import db from "../../../firebase/init";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      products: [],
      card: null,
      x: 0,
      y: 0,
      hoverProduct: null
    };
  },
  methods: {
    async hoverCard(e, id) {
      if (id) {
        this.hoverProduct = await this.products.filter(product => {
          return product.resturantId == id;
        });
        this.x = e.clientX;
        this.y = e.clientY;
        this.card = "block !important";
      } else {
        this.card = "none !important";
      }
    }
  },

  created() {
    const ref = db.collection("products").limit(3);
    ref.get().then(snaphot => {
      snaphot.forEach(doc => {
        let productData = doc.data();
        productData.id = doc.id;
        // console.log(doc.data().resturant);

        // FETCH PRODUCT'S RESTURANT DATA
        const ref2 = db
          .collection("resturants")
          .where("name", "==", doc.data().resturant);
        ref2.get().then(snapshot2 => {
          snapshot2.forEach(doc2 => {
            productData.resturantAddress = doc2.data().address;
            productData.resturantId = doc2.id;
            productData.resturantStatus = doc2.data().status;
            productData.resturantRating = parseInt(doc2.data().rating);
            productData.resturantImage = doc2.data().image;
            productData.resturantBackground = doc2.data().background;
            productData.resturantDescription = doc2.data().description;

            this.products.push(productData);
          });
        });
        // END FETCHING RESTURANT
      });
    });
  }
};
</script>

<style scoped>
.card {
  display: none;
  position: absolute;
  z-index: 10 !important;
}
.card-body {
  padding: 10px;
  text-align: center;
  margin-top: 40px;
}
.card-title {
  font-weight: bold;
  font-size: 20px;
}
.card-text {
  font-size: 12px;
}

.rounded-circle {
  border-radius: 50%;
}

.featured-restaurants {
  text-transform: capitalize;
  position: relative;
}
</style>