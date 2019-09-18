<template>
  <div class="container animated slideInDown slow">
    <div class="card o-hidden border-0 shadow-lg mt-2">
      <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
          <div
            class="col-lg-6 d-none d-lg-block"
            style="background: url(https://i.pinimg.com/originals/d0/97/c0/d097c07b2e32828b838d237eb11802f7.jpg) center no-repeat;"
          ></div>
          <div class="col-lg-6">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                <h6
                  v-if="error"
                  class="text-danger text-center text-capitalize"
                >. . . {{error}} . . .</h6>
              </div>
              <form class="user">
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      placeholder="First Name"
                      v-model="fname"
                    />
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      placeholder="Last Name"
                      v-model="lname"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control form-control-user"
                    placeholder="Email Address"
                    v-model="email"
                  />
                </div>
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="password"
                      class="form-control form-control-user"
                      placeholder="Password"
                      v-model="password"
                    />
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="password"
                      class="form-control form-control-user"
                      placeholder="Repeat Password"
                    />
                  </div>
                </div>
                <button
                  class="btn btn-primary btn-user btn-block"
                  @click.prevent="signup()"
                >Register Account</button>
                <hr />
                <a href="index.html" class="btn btn-google btn-user btn-block">
                  <i class="fab fa-google fa-fw"></i> Register with Google
                </a>
                <button class="btn btn-facebook btn-user btn-block">
                  <i class="fab fa-facebook-f fa-fw"></i> Register with Facebook
                </button>
              </form>
              <hr />
              <div class="text-center">
                <router-link class="small" to="/forgetPassword">Forgot Password?</router-link>
              </div>
              <div class="text-center">
                <router-link class="small" to="/login">Already have an account? Login!</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../../firebase/init";
import firebase from "firebase";
export default {
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      password: "",
      type: "user",
      error: ""
    };
  },
  methods: {
    signup() {
      if (this.email && this.password && this.fname && this.lname) {
        const ref = db.collection("users");
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            ref
              .add({
                fname: this.fname,
                lname: this.lname,
                email: this.email,
                password: this.password,
                type: this.type,
                user_id: cred.user.uid
              })
              .then(result => {
                (this.fname = ""),
                  (this.lname = ""),
                  (this.email = ""),
                  (this.password = ""),
                  (this.error = "");
                this.$router.push("/login");
              });
          })
          .catch(err => {
            this.error = err.message;
          });
      } else {
        this.error = "Required All Fields";
      }
    }
  },
  created() {
    // Import CSS files of Admin
    import("../../../../public/css/sb-admin-2.min.css");
  }
};
</script>

<style scoped>
</style>