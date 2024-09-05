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
    <h1 class="text-center">Testing</h1>
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
      title: "Home",
      meta: [
        {
          name: "description",
          content: "This is a homepage!",
          hid: "description",
        },
      ],
    };
  },
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
  mounted() {
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
