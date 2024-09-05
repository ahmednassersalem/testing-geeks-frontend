<template>
  <div>

    <br>
    <br>
    <br>
    <br>
    <br>

    <div class="main__container main_container_custom_login" v-if="step == 1">
      <div class="main__content">

        <div class="main_profile_form">
          <div class="title_form w-100 d-flex justify-content-center">Login</div>
          <form class="row" @submit.prevent="login">


            <div class="w-100 d-flex justify-content-center my-1">
              <the-input
                placeholder="email"
                v-model="form.email"
                type="email"
                @input="$v.form.email.$touch"
                :inputError="$v.form.email.$error"
                :errorMsg="$t('error_msgs.email')"
              />
            </div>
            <div class="w-100 d-flex justify-content-center my-1">
              <the-password-input
                placeholder="password"
                v-model="form.password"
                @input="$v.form.password.$touch"
                :inputError="$v.form.password.$error"
                :errorMsg="$t('error_msgs.password')"
              />
            </div>


            <div class="w-100 d-flex justify-content-center my-1">
              <div class="col-lg-4 col-12">
                <the-submit-btn
                  border_radius=""
                  :isloading="isLoading"
                  :valid="$v.form.$invalid"
                  :text="$t('shared.sign_in')"
                />
              </div>
            </div>
            <div class="w-100 d-flex justify-content-center my-1">
              <div class="or_text">او</div>
            </div>
            <div class="w-100 d-flex justify-content-center">
              <div class="col-lg-4 col-12">
                <nuxt-link class="btn_to_go_reg" :to="localePath('/auth/partner/register')">
                  register as partner
                </nuxt-link>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>

    <div class="main__container main_container_custom_verif" v-else-if="step == 2">
      <div class="main__content">

        <div class="main_profile_form">
          <div class="title_form w-100 d-flex justify-content-center">{{ $t('shared.pls_enter_the_verif_code') }}</div>
          <form class="row" @submit.prevent="verifyCodeFun">
            <div class="mt-5 col-lg-12 col-12 d-flex justify-content-center align-items-center mb-4" style="direction: ltr;">
              <v-otp-input
                ref="otpInput"
                input-classes="otp-input"
                separator="  "
                :num-inputs="6"
                :should-auto-focus="true"
                :is-input-num="true"
                @on-change="handleOnChange"
                @on-complete="handleOnComplete"
              />
            </div>
            <div class="w-100 d-flex justify-content-center my-5">
              <div class="col-lg-10 col-12 ">
                <the-submit-btn
                  border_radius=""
                  :isloading="isLoading"
                  :text="$t('shared.sign_in')"
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
} from "vuelidate/lib/validators";
export default {
  head() {
    return {
      title: "Login",
      meta: [
        {
          name: "description",
          content: "This is a Login!",
          hid: "description",
        },
      ],
    };
  },
  middleware: 'authenticated',
  validations: {
    form: {
      email: {
        required,
      },
      password: {
        required,
        minLength: minLength(8)
      },
    },
  },
  validations() {
    return{
        form: {
          email: {
            required,
            email
          },
          password: {
            required
          },
        },
      }
  },
  data() {
    return {
      color: '#008041',
      isLoading: false,

      form: {
        email: "",
        password: "",
      },
      step: 1,
      verifyCode: '',
    }
  },
  created() {

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
  },
  methods: {
    async login() {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("email", this.form.email);
      formData.append("password", this.form.password);
      await this.$Api.auth.partnerLogin(formData).then((res) => {
        this.isLoading = false;
        console.log(res.data);
        if (res.data.message) {
          this.step = 2;
        }

      });
    },
    handleOnComplete(value) {
      this.verifyCode = value;
    },
    async verifyCodeFun(){
      this.isLoading = true;
      const formData = new FormData();
      formData.append("otp", this.verifyCode);
      formData.append("email", this.form.email);
      formData.append("password", this.form.password);
      formData.append("role", 'partner');
      await this.$Api.auth.partnerVerifyEmailCode(formData).then((res) => {
        this.isLoading = false;
        console.log('verifyEmailCodeUser',res);
        if (res.data.message && res.data.data.access_token) {
          this.$auth.$storage.setUniversal("token", res.data.data.access_token);
          this.$auth.$storage.setUniversal("logged_In", true);
          this.$auth.$storage.setUniversal("userData", res.data.data.user);
          this.$store.commit("user/store", res.data.data.user);

          window.location.href = this.localePath("/")
          // location.reload().then(() => {
          //   this.$router.push('/')
          // });

        }
      });
    }
  },
}
</script>

<style lang="scss">
.btn_to_go_reg{
  width: 100%;
  height: 50px;
  background-color: var(--main-color);
  color: var(--white);
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
}
.or_text{
  font-size: 22px;
  color: var(--second-color);
  font-weight: bold;
  margin: 20px 0;
}

.update-profile {

}
</style>
