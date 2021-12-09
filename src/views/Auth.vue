<template>
  <v-app>
    <LeftPanelAuth/>
  </v-app>
</template>

<script>
import LeftPanelAuth from "../components/LeftPanelAuth";

export default {
  name: "Auth",
  components: {LeftPanelAuth}
}
</script>