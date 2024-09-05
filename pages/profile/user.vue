<template>
  <div>

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <h1 class="text-center">User Dashboard</h1>
    <div class="text-center">
      <nuxt-link :to="localePath('/auth/rest-password')">
        rest-password
      </nuxt-link>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

  </div>
</template>

<script>
export default {
  name: "home",
  head() {
    return {
      title: "User Dashboard",
      meta: [
        {
          name: "description",
          content: "This is a User Dashboard!",
          hid: "description",
        },
      ],
    };
  },
  middleware: 'login-guard',
  data() {
    return {
      activeBtn: 1,
      filterBy: '',
      filterSearch: '',
      units: [],
    };
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
  computed: {
    userInfo() {
      return this.$auth.$storage.getUniversal("userData");
    },
  },
  created() {

  },
  methods: {
    filterDataSearch(event) {

    }
  },

};
</script>

<style lang="scss" scoped>

@media (min-width: 1260px) {
}

@media (max-width: 1260px) {
}
</style>
