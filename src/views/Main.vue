<template>
  <v-row >
    <v-col cols="4">
      <LeftNavigationBar/>
    </v-col>
    <v-col cols="max">

    </v-col>
  </v-row>
</template>

<script>
import LeftNavigationBar from "@/components/LeftNavigationBar";

export default {
  name: "Main",
  components: {LeftNavigationBar}
}
</script>

<style scoped>

</style>