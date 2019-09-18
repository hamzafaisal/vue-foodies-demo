<template>
  <section class="restaurants-page" style="margin-top: 20px;">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-5 col-md-5 col-lg-3">
          <div class="sidebar clearfix m-b-20">
            <div class="main-block">
              <div class="sidebar-title white-txt">
                <h6>Search Resturant</h6>
                <i class="fa fa-cutlery pull-right"></i>
              </div>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control search-field"
                  placeholder="Search your favorite resturant. . ."
                  v-model="search"
                />
              </div>

              <div class="clearfix"></div>
            </div>
            <!-- end search resturant -->
          </div>
        </div>

        <div class="col-xs-12 col-sm-7 col-md-7 col-lg-9">
          <div
            v-for="resturant in filterResturants"
            :key="resturant.id"
            class="bg-gray restaurant-entry"
            data-aos="fade-up"
          >
            <div class="row">
              <div class="col-sm-12 col-md-12 col-lg-8 text-xs-center text-sm-left">
                <div class="entry-logo">
                  <img
                    :src="resturant.image"
                    alt="Food logo"
                    style="width: 110px; height: 110px; border-radius: 10px;"
                  />
                </div>
                <div class="entry-dscr">
                  <h5>
                    <router-link
                      tag="a"
                      :to="'/resturant-profile/' + resturant.id"
                    >{{resturant.name}}</router-link>
                  </h5>
                  <span>{{resturant.description}}. . .</span>
                  <ul class="list-inline">
                    <li class="list-inline-item">
                      <i class="fa fa-check"></i> Min $ 10,00
                    </li>
                    <li class="list-inline-item">
                      <span
                        style="padding: 2px; border-radius: 5px;"
                        class="theme-btn"
                      >{{resturant.status}}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-sm-12 col-md-12 col-lg-4 text-xs-center">
                <div class="right-content bg-white">
                  <div class="right-review">
                    <div class="rating-block">
                      <i v-for="n in parseInt(resturant.rating)" :key="n.id" class="fa fa-star"></i>
                      <i
                        v-for="(n , j) in (5 - parseInt(resturant.rating))"
                        :key="j"
                        class="fa fa-star-o"
                      ></i>
                    </div>
                    <p>245 Reviews</p>
                    <router-link
                      :to="'/resturant-profile/' + resturant.id"
                      class="btn theme-btn"
                    >View Menu</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import db from "../../../firebase/init";

export default {
  data() {
    return {
      resturants: [],
      search: null
    };
  },
  computed: {
    filterResturants() {
      if (this.search) {
        return this.resturants.filter(resturant => {
          return resturant.name.toLowerCase().match(this.search);
        });
      } else {
        return this.resturants;
      }
    }
  },
  created() {
    const ref = db.collection("resturants");
    ref.get().then(snaphot => {
      snaphot.forEach(doc => {
        let resturantData = doc.data();
        resturantData.id = doc.id;
        this.resturants.push(resturantData);
        // console.log(this.resturants);
      });
    });
  }
};
</script>

<style scoped>
.restaurants-page {
  text-transform: capitalize;
}
</style>