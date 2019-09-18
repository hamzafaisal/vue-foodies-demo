<template>
  <div class="page-wrapper">
    <section class="contact-page inner-page">
      <div class="container">
        <div class="row">
          <!-- REGISTER -->
          <div class="col-md-8">
            <div class="widget">
              <div class="widget-body">
                <form>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Subject</label>
                    <input
                      class="form-control"
                      type="text"
                      value="Artisanal kale"
                      id="example-text-input"
                    />
                    <small
                      id="emailHelp"
                      class="form-text text-muted"
                    >We"ll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                    <small
                      class="form-text text-muted"
                    >We"ll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Phone number</label>
                    <input
                      class="form-control"
                      type="tel"
                      value="1-(555)-555-5555"
                      id="example-tel-input"
                    />
                    <small
                      class="form-text text-muted"
                    >We"ll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">URL</label>
                    <input
                      class="form-control"
                      type="url"
                      value="http://codenpixel.com"
                      id="example-url-input"
                    />
                    <small
                      class="form-text text-muted"
                    >We"ll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Open Hours</label>
                    <input class="form-control" value />
                    <small
                      class="form-text text-muted"
                    >We"ll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Closing Hours</label>
                    <input class="form-control" value />
                    <small
                      class="form-text text-muted"
                    >We"ll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                    <label>Open days</label>
                    <br />
                    <div class="btn-group" data-toggle="buttons">
                      <label class="btn btn-secondary">
                        <input type="checkbox" checked />Mon
                      </label>
                      <label class="btn btn-secondary">
                        <input type="checkbox" /> Tus
                      </label>
                      <label class="btn btn-secondary">
                        <input type="checkbox" /> Wen
                      </label>
                      <label class="btn btn-secondary">
                        <input type="checkbox" /> Thu
                      </label>
                      <label class="btn btn-secondary">
                        <input type="checkbox" /> Fri
                      </label>
                      <label class="btn btn-secondary">
                        <input type="checkbox" /> Sat
                      </label>
                      <label class="btn btn-secondary">
                        <input type="checkbox" /> San
                      </label>
                    </div>
                  </div>
                  <p>
                    <button type="submit" class="btn theme-btn">Submit</button>
                  </p>
                </form>
              </div>
            </div>
            <!-- end: Widget -->
          </div>
          <!-- /REGISTER -->
          <!-- WHY? -->
          <div class="col-md-4">
            <h4>Registration is fast, easy, and free.</h4>
            <p>Once you"re registered, you can:</p>
            <hr />
            <img src="../../../public/appFiles/images/Local.png" alt class="img-fluid" />
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