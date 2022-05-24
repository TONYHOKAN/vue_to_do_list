<template>
  <CalculatorComponent />
</template>

<script>
// @ is an alias to /src
import CalculatorComponent from "@/components/CalculatorComponent.vue";

export default {
  name: "HomeView",
  components: {
    CalculatorComponent,
  },
};
</script>
