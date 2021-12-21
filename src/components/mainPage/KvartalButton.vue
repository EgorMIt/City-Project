<template>
  <div>
    <v-dialog width="500px" v-model="dialog" v-if="obj == null">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark color=#A0AEC0 class="mx-auto" outlined @click="openWind='OverlayKvartal'"
               v-bind="attrs" v-on="on"
               style="border-radius: 10px; box-shadow: none !important; width: 180px; height: 180px"> Свободное место
        </v-btn>
      </template>

      <OverlayKvartal :indexInArray="count" v-if="openWind === 'OverlayKvartal'" @updateParent="updateDialog"/>
    </v-dialog>

    <v-dialog width="500px" v-model="dialog" v-if="obj != null">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark color=#A0AEC0 class="mx-auto" @click="openWind='OverlayKvartalInfo'"
               v-bind="attrs" v-on="on"
               style="border-radius: 10px; box-shadow: none !important; width: 180px; height: 180px; background-color: #F58E43">
          {{ obj.KvartalName }}
        </v-btn>
      </template>

      <OverlayKvartalInfo :indexInArray="count" :KvartalNameDone="obj.KvartalName"
                          v-if="openWind === 'OverlayKvartalInfo'"
                          @updateParent="updateDialog"/>
    </v-dialog>
  </div>
</template>

<script>
import OverlayKvartal from "./elementsOverlays/OverlayKvartal";
import OverlayKvartalInfo from "@/components/mainPage/elementsOverlays/OverlayKvartalInfo";

export default {
  name: "KvartalButton",
  components: {OverlayKvartal, OverlayKvartalInfo},

  props: {
    count: Number,
    obj: {KvartalName: ''},
  },
  data: () => ({
    dialog: false,
    openWind: '',
  }),
  methods: {
    updateDialog(data) {
      this.dialog = data.dialog
    }
  },
}
</script>

<style scoped>

</style>