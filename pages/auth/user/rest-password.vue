<template>
  <div>
    <!-- <button @click="addStep">+</button>
    <button @click="supStep">-</button> -->

    <div class="main__container main__container_custom" v-if="step == 1">
      <div class="main__content">

        <div class="main_profile_form">
          <div class="mb-4 title_form w-100 d-flex justify-content-center">rest password</div>
          <form class="row" @submit.prevent="restPassword" >



            <div class="w-100 d-flex justify-content-center my-1">
              <the-password-input
                :placeholder="$t('shared.password') + ' *'"
                v-model="form.password"
                @input="$v.form.password.$touch"
                :inputError="$v.form.password.$error"
                :errorMsg="$t('error_msgs.password')"
                class="col-lg-6 col-12"
              />
            </div>
            <div class="w-100 d-flex justify-content-center my-1">
              <the-password-input
                :placeholder="$t('shared.confirm_password') + ' *'"
                v-model="form.password_confirmation"
                @input="$v.form.password_confirmation.$touch"
                :inputError="$v.form.password_confirmation.$error"
                :errorMsg="$t('error_msgs.confrim_password')"
                class="col-lg-6 col-12"
              />
            </div>


            <div class="mt-5 w-100 d-flex justify-content-center my-1">
              <div class="col-lg-7 col-12 ">
                <the-submit-btn
                  :isloading="isLoading"
                  :valid="$v.form.$invalid"
                  text="rest password"
                />
              </div>
            </div>


          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  numeric,
  email,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  head() {
    return {
      title: "Register",
      meta: [
        {
          name: "description",
          content: "This is a Register!",
          hid: "description",
        },
      ],
    };
  },
  middleware: 'login-guard',
  validations: {
    form: {

      password: {
        required,
        minLength: minLength(8),
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
    formTwo:{
      choose: {
        required,
      },
    }
  },
  validations() {
    return{
      form: {
        password: {
          required,
          minLength: minLength(8),
        },
        password_confirmation: {
          required,
          sameAsPassword: sameAs("password"),
        },
      },
    }
  },
  data() {
    return {
      color: '#008041',
      isLoading: false,

      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      formTwo:{
        choose: "",
      },
      step: 1,
      verifyCode: '',
      showOptCode: false,
      doShowVirfy: false,

    }
  },
  created() {
    console.log(this.$auth.$storage.getUniversal("userData"));
  },
  computed: {
    availableLocales() {
      let local = this.$i18n.locales.filter(
        (i) => i.code !== this.$i18n.locale
      );
      if (local[0].code == "en") {
        return true;
      } else {
        return false;
      }
    },
    showButtonSubmit(){
      if(this.form.email.length > 0){
        return true;
      }else{
        return false;
      }
    }
  },
  methods: {
    async restPassword() {
      this.isLoading = true;
      var user = this.$auth.$storage.getUniversal("userData");
      const formData = new FormData();
      formData.append("role", 'user');
      formData.append("email", user.email);
      formData.append("password", this.form.password);
      formData.append("password_confirmation", this.form.password_confirmation);

      await this.$Api.auth.userRestPassword(formData).then((res) => {
        this.isLoading = false;
        console.log(res);
        if (res.data.message) {
          //this.step = 2
        }
      });
    },
    showDate(){
      // console.log(this.form.date_of_birth)
    },
    addStep(){
      this.step++;
    },
    supStep(){
      this.step--;
    },
    handleOnChange(value) {
      // this.verifyCode = value;
      // console.log('handleOnChange',value);
    },
    handleOnComplete(value) {
      this.verifyCode = value;
      //console.log('handleOnComplete',value);
    },
    async verifyCodeFun(){

      this.isLoading = true;
      const formData = new FormData();
      formData.append("email", this.form.email);
      formData.append("password", this.form.password);
      formData.append("role", 'user');
      formData.append("otp", this.verifyCode);
      await this.$Api.auth.verifyEmailCode(formData).then((res) => {
        this.isLoading = false;
        console.log(res);
        if (res.data.message && res.data.data.access_token) {
          this.$auth.$storage.setUniversal("token", res.data.data.access_token);
          this.$auth.$storage.setUniversal("logged_In", true);
          this.$auth.$storage.setUniversal("userData", res.data.data.user);
          this.$store.commit("user/store", res.data.data.user);
          window.location.href = this.localePath("/")
          this.step = 2
        }
      });
    },
    closeOpt(){
      this.showOptCode = false
    }
  },
}
</script>

<style lang="scss">

</style>
