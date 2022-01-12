<template>
  <v-container class="grey lighten-5" style="margin-top: 2%">
    <v-img src="../../assets/map.png"
           class="ml-auto mr-auto"
           height="850px"
           style="border-radius: 10px"
    >
      <v-row style="margin-left: 10px; margin-top: 10px">

        <v-col
            v-for="(n, index) in KvartalsList"
            :key="index"
        >

          <KvartalButton :obj="n" :count="index"/>
        </v-col>
      </v-row>

    </v-img>

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
        //this.KvartalsList.push(null)
      }
    }
  },
}
</script>

<style scoped>

</style>