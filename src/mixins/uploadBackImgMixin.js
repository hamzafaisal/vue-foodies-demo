import { firebaseApp } from "../firebase/init";

export const uploadBackImgMixin = {
  data() {
    return {
      progressBack: null,
      background: null
    };
  },
  methods: {
    uploadBackImg(e) {
      this.background = null;
      let background = e.target.files[0];
      let storageRef = firebaseApp.storage().ref("users/" + background.name);
      let uploadTask = storageRef.put(background);

      uploadTask.on(
        "state_changed",
        snapshot => {
          var progressBack =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.progressBack = Math.round(progressBack);
        },
        error => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.background = downloadURL;
          });
        }
      );
    }
  }
};
