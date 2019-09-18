<template>
  <div>
    <section class="hero bg-image">
      <div class="hero-inner">
        <div class="container text-center hero-text font-white">
          <h1 class="animated tada slow delay-1s">Order Delivery & Take-Out</h1>
          <h5 class="font-white space-xs">Find restaurants, specials, and coupons for free</h5>
          <div class="banner-form">
            <form class="form-inline">
              <div class="form-group">
                <label class="sr-only" for="exampleInputAmount">Search Your Location....</label>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="exampleInputAmount"
                    placeholder="Search Your Location...."
                  />
                </div>
              </div>
              <button type="button" class="btn theme-btn btn-lg">Search Location</button>
            </form>
          </div>
          <div class="steps">
            <div class="step-item step1">
              <h4>
                <span>1.</span>Choose Location
              </h4>
            </div>
            <div class="step-item step2">
              <h4>
                <span>2.</span>Order Food
              </h4>
            </div>
            <div class="step-item step3">
              <h4>
                <span>3.</span>Delivery or take out
              </h4>
            </div>
          </div>
        </div>
      </div>
      <!--end:Hero inner -->
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>