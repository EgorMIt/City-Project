<template>
  <v-row>
    <v-col md="4" >
      <LeftPanelAuth/>
    </v-col>
    <v-col>
      <AuthForm/>
    </v-col>
  </v-row>
</template>

<script>
import LeftPanelAuth from "../components/LeftPanelAuth";
import AuthForm from "../components/AuthForm";

export default {
  name: "Auth",
  components: {AuthForm, LeftPanelAuth}
}
</script>