<template>
  <div class="form-group">
    <input
      class="custome-input"
      :class="{ 'is-invalid': inputError }"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
      v-bind="$attrs" />
      <span class="error-msg" v-if="inputError">{{errorMsg}}</span>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      errorMsg: {
        type: String,
        required: false
      },
      inputError: {
        type: Boolean,
        required: false,
        default: false
      },
      placeholder: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: false,
        default: 'text'
      },
      value: {
        type: [Number, String]
      }
    },
    methods: {
      handleInput(event) {
        this.$emit("input", event.target.value);
      }
    }
  }
</script>

<style lang="scss" scoped>
.custome-input {
  border: 1px solid var(--border-input);
  border-radius: 10px;
  background-color: var(--white);
  outline: none;
  width: 100%;
  padding: 12px 15px;
}
.is-invalid {
  border: 1px solid var(--error);
}
.error-msg {
  display: block;
  color:var(--error);
  font-size: 12px;
  padding: 5px 10px;
}

</style>
