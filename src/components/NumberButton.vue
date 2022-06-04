<template>
  <a-button id="number-button" @click="click">{{ displayValue }}</a-button>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  displayValue: String,
  numberValue: Number,
});

const { numberValue } = toRefs(props);
const emit = defineEmits(["child-event"]);
const click = () => {
  // console.log(numberValue);
  emit("child-event", numberValue.value);
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
