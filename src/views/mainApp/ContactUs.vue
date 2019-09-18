<template>
  <div class="page-wrapper">
    <section class="bg-image inner-page-hero space-md">
      <div class="profile">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-sm-4 col-lg-4 profile-img">
              <h1 class="font-white">Contact&nbsp;Us</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="contact-page inner-page">
      <div class="container">
        <div class="row">
          <!-- REGISTER -->
          <div class="col-md-8">
            <div class="widget">
              <div class="widget-body">
                <!-- Contact form -->
                <div class="form-horizontal contact-form" role="form">
                  <fieldset>
                    <div class="row form-group">
                      <div class="col-xs-6">
                        <input
                          class="form-control"
                          id="fname"
                          name="fname"
                          type="text"
                          placeholder="First Name *"
                          required
                        />
                      </div>
                      <div class="col-xs-6">
                        <input
                          class="form-control"
                          id="lname"
                          name="lname"
                          type="text"
                          placeholder="Last Name *"
                          required
                        />
                      </div>
                    </div>
                    <div class="row form-group">
                      <div class="col-xs-6">
                        <input
                          class="form-control"
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email *"
                          required
                        />
                      </div>
                      <div class="col-xs-6">
                        <input
                          class="form-control"
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                    <div class="row form-group">
                      <div class="col-xs-12">
                        <input
                          class="form-control"
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="Subject *"
                          required
                        />
                      </div>
                    </div>
                    <div class="row form-group">
                      <div class="col-xs-12">
                        <textarea
                          class="form-control"
                          id="message"
                          name="message"
                          rows="10"
                          placeholder="Message *"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div class="row form-group">
                      <div class="col-xs-12">
                        <button class="btn btn-lg theme-btn" type="submit">Send Message</button>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <!-- End Contact form -->
              </div>
            </div>
            <!-- end: Widget -->
          </div>
          <!-- /REGISTER -->
          <!-- WHY? -->
          <div class="col-md-4">
            <h4>Registration is fast, easy, and free.</h4>
            <p>Once you"re registered, you can:</p>
            <ul class="list-check list-unstyled">
              <li>Buy, sell, and interact with other members.</li>
              <li>Save your favorite searches and get notified.</li>
              <li>Watch the status of up to 200 items.</li>
              <li>View yourinformation from any computer in the world.</li>
              <li>Connect with the Atropos community.</li>
            </ul>
          </div>
          <!-- /WHY? -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>