<template>
  <div>
    <section
      v-for="profile in resturant"
      :key="profile.id"
      class="inner-page-hero bg-image"
      :style="{ backgroundImage: `url(${profile.background})`}"
      style="background-size: 100% 100%; "
    >
      <div class="profile">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 profile-img">
              <div class="image-wrap">
                <figure>
                  <img
                    :src="profile.image"
                    style="max-width: 100%; height:200px;"
                    alt="Profile Image"
                  />
                </figure>
              </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 profile-desc">
              <div class="pull-left right-text white-txt">
                <h6>
                  <a href="#">{{profile.name}}</a>
                </h6>
                <a class="btn btn-small btn-green">{{profile.status}}</a>
                <p>{{profile.description}}</p>
                <ul class="nav nav-inline">
                  <li class="nav-item">
                    <a class="nav-link active" href="#">
                      <i class="fa fa-check"></i> Min $ 10,00
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      <i class="fa fa-motorcycle"></i> 30 min
                    </a>
                  </li>
                  <li class="nav-item ratings">
                    <a class="nav-link" href="#">
                      <span>
                        <i v-for="n in parseInt(profile.rating)" :key="n.id" class="fa fa-star"></i>
                        <i
                          v-for="(n , j) in (5 - parseInt(profile.rating))"
                          :key="j"
                          class="fa fa-star-o"
                        ></i>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["resturant"]
};
</script>

<style scoped>
section {
  text-transform: capitalize;
}
</style>