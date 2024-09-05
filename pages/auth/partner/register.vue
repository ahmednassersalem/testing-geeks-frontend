<template>
  <div>
    <!-- <button @click="addStep">+</button>
    <button @click="supStep">-</button> -->

    <div class="main__container main__container_custom" v-if="step == 1">
      <div class="main__content">

        <div class="main_profile_form">
          <div class="mb-4 title_form w-100 d-flex justify-content-center">{{ $t('shared.register_your_data') }}</div>
          <form class="row" @submit.prevent="register" >

            <div class="w-100 d-flex justify-content-center my-1">
              <the-input
                placeholder="name"
                v-model="form.name"
                type="text"
                @input="$v.form.name.$touch"
                :inputError="$v.form.name.$error"
                :errorMsg="$t('error_msgs.username')"
                class="col-lg-6 col-12"
              />
            </div>
            <div class="w-100 d-flex justify-content-center my-1">
              <the-input
                placeholder="email"
                v-model="form.email"
                type="email"
                @input="$v.form.email.$touch"
                :inputError="$v.form.email.$error"
                :errorMsg="$t('error_msgs.email')"
                class="col-lg-6 col-12"
              />
            </div>
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


            <div class="mt-5 w-100 d-flex justify-content-center my-1" v-if="showButtonSubmit">
              <div class="col-lg-7 col-12 ">
                <the-submit-btn
                  @buttonClicked="showOptCode = true"
                  :isloading="isLoading"
                  :valid="$v.form.$invalid"
                  :text="$t('shared.create_an_account')"
                />
              </div>
            </div>

            <div class="mt-5 w-100 d-flex justify-content-center my-1" v-else>
              <div class="col-lg-7 col-12 ">
                <the-submit-btn
                  border_radius=""
                  :isloading="isLoading"
                  :valid="$v.form.$invalid"
                  :text="$t('shared.create_an_account')"
                />
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
            <div class="w-100 d-flex justify-content-center my-1">
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
  middleware: 'authenticated',
  validations: {
    form: {
      name: {
        required,
      },
      email: {
        email,
        required,
      },
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
        name: {
          required,
        },
        email: {
          email,
          required,
        },
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
      locale: 'en-US',
      labels: {
        'ar-EG': {
          weekdayHeaderFormat: 'narrow',
          labelPrevDecade: 'العقد السابق',
          labelPrevYear: 'العام السابق',
          labelPrevMonth: 'الشهر السابق',
          labelCurrentMonth: 'الشهر الحالي',
          labelNextMonth: 'الشهر المقبل',
          labelNextYear: 'العام المقبل',
          labelNextDecade: 'العقد القادم',
          labelToday: 'اليوم',
          labelSelected: 'التاريخ المحدد',
          labelNoDateSelected: 'لم يتم اختيار تاريخ',
          labelCalendar: 'التقويم',
          labelNav: 'الملاحة التقويم',
          labelHelp: 'استخدم مفاتيح المؤشر للتنقل في التواريخ'
        }
      }
    }
  },
  created() {
    // console.log(this.form.email.length,this.form.phone_number.length)
    if(this.form.email.length > 0 ){
      this.doShowVirfy = true;
    }
    if(this.$i18n.locale === "ar"){
      this.locale = 'ar-EG'
    }else{
      this.locale = 'en-US'
    }
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
    async register() {
      this.isLoading = true;
      this.showOptCode = false;
      const formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      formData.append("password", this.form.password);
      formData.append("password_confirmation", this.form.password_confirmation);

      await this.$Api.auth.partnerRegister(formData).then((res) => {
        this.isLoading = false;
        console.log(res);
        if (res.data.message) {
          this.step = 2
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
      formData.append("role", 'partner');
      formData.append("otp", this.verifyCode);
      await this.$Api.auth.partnerVerifyEmailCode(formData).then((res) => {
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
