<template>
  <div
    :class="$i18n.locale === 'ar' ? 'rtl' : ''"
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
  >
    <the-nav-bar />
      <Nuxt />


  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  created() {
    if(this.$auth.$storage.getUniversal("logged_In") == true) {
    }else{
      this.$auth.$storage.removeUniversal("userData");
      this.$auth.$storage.removeUniversal("token");
      this.$auth.$storage.setUniversal("logged_In", false);
    }
  },
  methods: {
    refreshUserData(){
      this.$Api.auth.getUser().then((response) => {
        if (response.data.status) {
          this.$auth.$storage.setUniversal("userData", response.data.userData);
          this.$store.commit("user/store", response.data.userData);
          this.form = response.data.userData
        }
      });
    }
  },
};
</script>
