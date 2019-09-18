import { firebaseApp } from "../firebase/init";

export const uploadImgMixin = {
  data() {
    return {
      progress: null,
      image: null
    };
  },
  methods: {
    uploadImg(e) {
      this.image = null;
      let image = e.target.files[0];
      let storageRef = firebaseApp.storage().ref("users/" + image.name);
      let uploadTask = storageRef.put(image);

      uploadTask.on(
        "state_changed",
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.progress = Math.round(progress);
        },
        error => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.image = downloadURL;
          });
        }
      );
    }
  }
};
