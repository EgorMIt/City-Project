<template>
  <v-container class="grey lighten-5" style="margin-top: 3%; margin-left: 1%; ">
    <v-row style="background-color: white">
      <v-col
          v-for="(n, index) in KvartalsList"
          :key="index"
      >
        <KvartalButton :obj="n" :count="index"/>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import KvartalButton from "@/components/mainPage/KvartalButton";
import axios from "axios";

export default {
  name: "CityComponent",
  components: {KvartalButton},

  data: () => ({
    KvartalsList: [null, null, null, null, {KvartalName: 'Квартал один'}, {KvartalName: 'Квартал два'}, null],
    //KvartalsList: [],
    slotSize: 28,
  }),

  methods: {
    getListOfKvartals() {
      this.KvartalsList = []
      axios.create({
        baseURL: 'http://localhost:10520/api/v1'
      }).get('/get/list')
          .then(resp => {
            console.log(resp.data)
            for (let i = 0; i < resp.data.length; i++) {
              this.KvartalsList.push(resp.data[i].KvartalName)
            }
          })
    },
    getKvartalsList() {
      let str = "/api/app/quarter/map"
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            for (let i = 0; i < resp.data.length; i++) {
              this.KvartalsList.push(resp.data[i])
            }
          })
    },
  },
  beforeMount() {
    this.getKvartalsList()
    let listSize = this.KvartalsList.length
    if (listSize < this.slotSize) {
      for (let i = 0; i < (this.slotSize - listSize); i++) {
        this.KvartalsList.push(null)
      }
    }
  },
}
</script>

<style scoped>

</style>