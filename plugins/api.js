import apis from "../api/index";

export default (context, inject) => {
  inject("Api", apis);
};
