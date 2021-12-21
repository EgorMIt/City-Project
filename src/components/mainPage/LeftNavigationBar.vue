<template>
  <div style="height: 100%">
    <v-card
        class="mx-0"
        height="100%"
    >
      <v-navigation-drawer
          class=EDF2F7
          width="100%"
          permanent
      >

        <div
            style="margin-top: 20%; color: black; font-size: 30px; font-weight: bold; text-align: center">
          City Project
        </div>


        <div style="margin-top: 50%; margin-left: 30px; margin-right: 20px">
          <v-switch
              v-model="modeSwitch"
              inset
              :label="modeSwitch ? 'Элементы' : 'Функции'"
              color="#F58E43"
              style="margin-left: 14%"
          ></v-switch>

          <v-divider></v-divider>


          <v-dialog width="500px" v-model="dialog">
            <template v-slot:activator="{ on, attrs }">

              <div v-if="modeSwitch === false">
                <div
                    style="margin-top: 5%; color: black; font-size: 18px; text-align: left;  margin-bottom: 15px">
                  Создание и редактирование объектов:
                </div>

                <v-btn @click="openWind='OverlayBrigada'" v-bind="attrs" v-on="on" width="95%"
                       style="border-radius: 10px; margin-bottom: 15px; color: #A0AEC0" outlined>
                  Стр. бригада
                </v-btn>
                <v-btn @click="openWind='OverlayDostavka'" v-bind="attrs" v-on="on" width="95%"
                       style="border-radius: 10px; margin-bottom: 15px; color: #A0AEC0" outlined>
                  Команда доставки
                </v-btn>
                <v-btn @click="openWind='OverlaySluzba'" v-bind="attrs" v-on="on" width="95%"
                       style="border-radius: 10px; margin-bottom: 15px; color: #A0AEC0" outlined>
                  Городская служба
                </v-btn>
                <v-btn @click="openWind='OverlayObsluga'" v-bind="attrs" v-on="on" width="95%"
                       style="border-radius: 10px; margin-bottom: 15px; color: #A0AEC0" outlined>
                  Обсл. команда
                </v-btn>
                <v-btn @click="openWind='OverlayRoute'" v-bind="attrs" v-on="on" width="95%"
                       style="border-radius: 10px; margin-bottom: 15px; color: #A0AEC0" outlined>
                  Тр. маршрут
                </v-btn>
                <v-btn @click="openWind='OverlayComitet'" v-bind="attrs" v-on="on" width="95%"
                       style="border-radius: 10px; margin-bottom: 15px; color: #A0AEC0" outlined>
                  Комитет сдачи
                </v-btn>
              </div>

              <div v-if="modeSwitch === true">
                <div
                    style="margin-top: 5%; color: black; font-size: 18px; text-align: left;  margin-bottom: 15px">
                  Доступные функции:
                </div>

                <v-btn @click="openWind='OverlayCostCount'" v-bind="attrs" v-on="on" width="95%"
                       style="border-radius: 10px; margin-bottom: 15px; color: #A0AEC0" outlined>
                  Посчитать стоимость
                </v-btn>
                <v-btn @click="openWind='OverlayFinishBuilding'" v-bind="attrs" v-on="on" width="95%"
                       style="border-radius: 10px; margin-bottom: 15px; color: #A0AEC0" outlined>
                  Принять объекты
                </v-btn>
                <v-btn @click="openWind='OverlayCityReadiness'" v-bind="attrs" v-on="on" width="95%"
                       style="border-radius: 10px; margin-bottom: 15px; color: #A0AEC0" outlined>
                  Готовность города
                </v-btn>
                <v-btn @click="openWind='OverlayKvartalReadiness'" v-bind="attrs" v-on="on" width="95%"
                       style="border-radius: 10px; margin-bottom: 15px; color: #A0AEC0" outlined>
                  Готовность квартала
                </v-btn>
              </div>
            </template>
            <OverlayBuilding v-if="openWind === 'overlayBuilding'" @updateParent="updateDialog"/>
            <OverlayStreet v-if="openWind === 'OverlayStreet'" @updateParent="updateDialog"/>
            <OverlayKvartal v-if="openWind === 'OverlayKvartal'" @updateParent="updateDialog"/>
            <OverlayBrigada v-if="openWind === 'OverlayBrigada'" @updateParent="updateDialog"/>
            <OverlayDostavka v-if="openWind === 'OverlayDostavka'" @updateParent="updateDialog"/>
            <OverlaySluzba v-if="openWind === 'OverlaySluzba'" @updateParent="updateDialog"/>
            <OverlayObsluga v-if="openWind === 'OverlayObsluga'" @updateParent="updateDialog"/>
            <OverlayRoute v-if="openWind === 'OverlayRoute'" @updateParent="updateDialog"/>
            <OverlayComitet v-if="openWind === 'OverlayComitet'" @updateParent="updateDialog"/>

            <OverlayCostCount v-if="openWind === 'OverlayCostCount'" @updateParent="updateDialog"/>
            <OverlayFinishBuilding v-if="openWind === 'OverlayFinishBuilding'" @updateParent="updateDialog"/>
            <OverlayCityReadiness v-if="openWind === 'OverlayCityReadiness'" @updateParent="updateDialog"/>
            <OverlayKvartalReadiness v-if="openWind === 'OverlayKvartalReadiness'" @updateParent="updateDialog"/>
          </v-dialog>
          <v-divider style="margin-top: 5%"></v-divider>
        </div>


        <template v-slot:append>
          <v-divider style="margin-bottom: 20px"></v-divider>
          <v-row style="margin: auto">
            <v-btn dark to="/" color=#F58E43 class="mx-auto"
                   style="border-radius: 10px; box-shadow: none !important; margin-left: 5px; margin-bottom: 20px; width: 80%">
              Выйти из системы
            </v-btn>
          </v-row>
        </template>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import OverlayBuilding from "./elementsOverlays/OverlayBuilding";
import OverlayStreet from "./elementsOverlays/OverlayStreet";
import OverlayKvartal from "./elementsOverlays/OverlayKvartal";
import OverlayBrigada from "./elementsOverlays/OverlayBrigada";
import OverlayDostavka from "./elementsOverlays/OverlayDostavka";
import OverlaySluzba from "./elementsOverlays/OverlaySluzba";
import OverlayObsluga from "./elementsOverlays/OverlayObsluga";
import OverlayRoute from "@/components/mainPage/elementsOverlays/OverlayRoute";
import OverlayComitet from "@/components/mainPage/elementsOverlays/OverlayComitet";
import OverlayCostCount from "@/components/mainPage/functionsOverlays/OverlayCostCount";
import OverlayFinishBuilding from "@/components/mainPage/functionsOverlays/OverlayFinishBuilding";
import OverlayCityReadiness from "@/components/mainPage/functionsOverlays/OverlayCityReadiness";
import OverlayKvartalReadiness from "@/components/mainPage/functionsOverlays/OverlayKvartalReadiness";

export default {
  name: "LeftNavigationBar",

  components: {
    OverlayBuilding,
    OverlayStreet,
    OverlayKvartal,
    OverlayBrigada,
    OverlayDostavka,
    OverlaySluzba,
    OverlayObsluga,
    OverlayRoute,
    OverlayComitet,
    OverlayCostCount,
    OverlayFinishBuilding,
    OverlayCityReadiness,
    OverlayKvartalReadiness
  },
  data: () => ({
    dialog: false,
    openWind: '',
    modeSwitch: true,
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