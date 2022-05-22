<template>
  <a-button id="number-button" @click="click">{{ displayValue }}</a-button>
</template>

<script>
export default {
  name: "NumberButton",
  props: {
    displayValue: String,
    numberValue: Number,
  },
  methods: {
    click() {
      console.log(this.numberValue);
      this.$emit("child-event", this.numberValue);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#number-button {
  width: 100px;
  height: 100px;
  font-size: 50px;
}
</style>
