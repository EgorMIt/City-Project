<template>
  <v-container class="grey lighten-5" style="margin-top: 2%" v-if="renderComponent">
    <v-img src="../../assets/map.png"
           class="ml-auto mr-auto"
           height="850px"
           style="border-radius: 10px"
    >
      <v-row style="margin-left: 10px; margin-top: 10px">

        <v-col
            v-for="(n, index) in this.KvartalsList"
            :key="index"
        >

          <KvartalButton :count="index" :KvartalName="n"/>
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
    //KvartalsList2: [null, null, null, null, 'Квартал один', 'Квартал два', null],
    KvartalsList: [],
    slotSize: 28,
    renderComponent: false,
  }),

  methods: {
    getListOfKvartals() {
      this.KvartalsList = new Array(28)

      for (let i = 0; i < this.slotSize; i++) {
        this.KvartalsList[i] = "хуета"
      }

      let str = "/api/app/quarter/map"
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            for (let i = 0; i < resp.data.length; i++) {
              if (resp.data[i] != null) {
                this.KvartalsList[i] = resp.data[i].name
              } else this.KvartalsList[i] = null
            }
            this.renderComponent = true
          })
    },
  },
  created() {
    this.getListOfKvartals()
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