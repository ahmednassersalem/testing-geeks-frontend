export default function ({ $auth, i18n, $axios, app }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Content-Language": i18n.locale,
    },
  });
  api.setBaseURL("http://127.0.0.1:8000/api/");
  api.setToken($auth?.$storage?.getUniversal("token"), "Bearer");

  // handle errors
  api.onError((error) => {
    $nuxt.$loading.finish();
    if (
      error &&
      error?.response?.data?.errors &&
      error?.response?.data?.errors.length
    ) {
      $nuxt.$bvToast.toast(error.response.data.errors[0], {
        toaster: "b-toaster-top-right",
        noCloseButton: false,
        solid: true,
        autoHideDelay: 3000,
        variant: "danger",
      });
    }
  });

  api.onResponse((response) => {
    $nuxt.$loading.finish();
    if (response?.data?.status == 400) {
      $auth.$storage.removeUniversal("userData");
      $auth.$storage.removeUniversal("token");
      $auth.$storage.setUniversal("logged_In", false);
      $nuxt.refresh();
    }

    for(var index in response.data.body){
      if(response.data.body[index]['Error Details']){
        if(response.data.body[index]['Error Details'].Error_Code != -1){
          $nuxt.$bvToast.toast(response.data.body[index]['Error Details'].Error_Message, {
            title: response.data.body[index]['Error Details'].Error_Code,
            toaster: "b-toaster-top-right",
            noCloseButton: false,
            solid: true,
            autoHideDelay: 4000,
            variant: "info",
          });
        }
      }
    }
    if (
      response.config.method === "post" ||
      response.config.method === "put" ||
      response.config.method === "delete"
    ) {
      if (response?.data?.message) {
        $nuxt.$bvToast.toast(response.data.message, {
          toaster: "b-toaster-top-right",
          noCloseButton: false,
          solid: true,
          autoHideDelay: 3000,
          variant: "success",
        });
      }

      if (response?.data?.error) {
        $nuxt.$bvToast.toast(response.data.error, {
          toaster: "b-toaster-top-right",
          noCloseButton: false,
          solid: true,
          autoHideDelay: 3000,
          variant: "danger",
        });
      }
      if (response?.data?.errors) {
        for (let index = 0; index < response.data.errors.length; index++) {
          $nuxt.$bvToast.toast(response.data.errors[index], {
            toaster: "b-toaster-top-right",
            noCloseButton: false,
            solid: true,
            autoHideDelay: 3000,
            variant: "danger",
          });
        }
      }
    }
    if (response?.data?.error) {
      $nuxt.$bvToast.toast(response.data.error, {
        toaster: "b-toaster-top-right",
        noCloseButton: false,
        solid: true,
        autoHideDelay: 3000,
        variant: "danger",
      });
    }

    if (!response?.data?.status && response?.data?.errors && response?.data?.code == 404) {
      for (let index = 0; index < response.data.errors.length; index++) {
        $nuxt.$bvToast.toast(response.data.errors[index], {
          toaster: "b-toaster-top-right",
          noCloseButton: false,
          solid: true,
          autoHideDelay: 3000,
          variant: "danger",
        });
      }
    }
  });
  inject("api", api);
}
