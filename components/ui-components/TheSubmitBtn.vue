<template>
    <button :class="border_radius ? `submit-btn ${border_radius}` : 'submit-btn'" type="submit" :disabled="valid || isloading || accept" :title="text">
      <i v-if="icon" :class="`fas ${icon} px-2`"></i>
      {{text}}
      <span v-if="isloading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    </button>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: false
      },
      border_radius: {
        type: String,
        required: false
      },
      isloading: {
        type: Boolean,
        required: false,
        default: false
      },
      valid: {
        type: Boolean,
        required: false,
        default: false
      },
      accept: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
.submit-btn {
  background-color: var(--second-color);
  border-radius: 3px;
  border: 1px solid var(--second-color);
  color: var(--white);
  text-transform: uppercase;
  width: 100%;
  height: 50px;
  transition: 0.3s ease-in-out;
  font-size: 25px;
  &:hover {
    color: var(--second-color);
    background-color: var(--white);
  }
  &:disabled {
    border: 1px solid #cccccc;
    background-color: #cccccc;
    color: #fff;
    cursor: not-allowed;
    &:hover {
        box-shadow: none;
    }
  }
}
</style>
