<template>
  <div>
    <v-container class="grey lighten-5" style="margin-top: 2%" v-if="renderComponent">
      <v-img src="../../assets/map.png"
             class="ml-auto mr-auto"
             height="850px"
             style="border-radius: 10px"
      >
        <v-row style="margin-left: 10px; margin-top: 10px">
          <v-col v-for="(n, index) in this.$store.getters.allKvartals" :key="index">
            <KvartalButton :count="index" :KvartalName="n"/>
          </v-col>
        </v-row>
      </v-img>
    </v-container>

    <v-btn disabled v-if="!renderComponent" height="100px" plain
           style="margin-top: 25%; color: black; font-size: 40px; font-weight: bold; text-align: center; margin-left: 23%"
    >
      <pre>Отсутствует покдлючение к серверу</pre>
    </v-btn>
  </div>
</template>

<script>
import KvartalButton from "@/components/mainPage/KvartalButton";
import axios from "axios";

export default {
  name: "CityComponent",
  components: {KvartalButton},

  data: () => ({
    KvartalsList: [],
    slotSize: 28,
    renderComponent: false,
  }),

  methods: {
    getListOfKvartals() {
      this.KvartalsList = new Array(28)
      let str = "/api/app/quarter/map"
      axios.create(this.getHeader()
      ).get(str)
          .then(resp => {
            for (let i = 0; i < resp.data.length; i++) {
              if (resp.data[i] != null) {
                this.KvartalsList[i] = resp.data[i].name
              } else this.KvartalsList[i] = null
            }
            this.renderComponent = true
            this.$store.commit('clearAll')
            this.$store.commit('updateKvartalsList', this.KvartalsList)
          }).catch(err => {
        this.renderComponent = false
        if (this.doRefresh(err.status)) this.getListOfKvartals()
      })
    },
  },
  created() {
    this.getListOfKvartals()
  },
}
</script>

<style scoped>

</style>