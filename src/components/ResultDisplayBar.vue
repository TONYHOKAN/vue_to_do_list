<template>
  <div id="result-display-bar">
    <a-input :value="inputHistory" :bordered="false" />
    <a-input :value="calculatedResult" :bordered="false" />
  </div>
</template>

<script>
export default {
  name: "ResultDisplayBar",
  props: {
    inputHistory: {
      type: [String],
      required: true,
    },
    calculatedResult: {
      type: [String, Number],
      default: 0,
      required: true,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#result-display-bar {
  border: solid;
}
</style>
