<template>
  <v-container class="grey lighten-5" style="margin-top: 3%; margin-left: 1%">
    <v-row style="background-color: white">
      <v-col
          v-for="(n, index) in arr"
          :key="n"
      >
        <ButtonActive :obj="n" :count="index"/>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ButtonActive from "@/components/ButtonActive";

export default {
  name: "CityComponent",
  components: {ButtonActive},

  data: () => ({
    arr: [null, null, null, null, { KvartalName: 'Квартал один'},
      { KvartalName: 'Квартал два'}, null],
  }),

  methods: {
  },
}
</script>

<style scoped>

</style>