<template>
  <a-button id="operation-button" @click="click">{{ displayValue }}</a-button>
</template>

<script>
export default {
  name: "OperationButton",
  props: {
    displayValue: String,
    operationValue: String,
  },
  methods: {
    click() {
      console.log(this.operationValue);
      this.$emit("child-event", this.operationValue);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#operation-button {
  width: 100px;
  height: 100px;
  font-size: 50px;
}
</style>
