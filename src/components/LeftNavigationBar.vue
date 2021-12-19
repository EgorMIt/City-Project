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


        <div style="margin-top: 60%; margin-left: 30px; margin-right: 20px">
          <v-switch
              v-model="modeSwitch"
              inset
              :label="modeSwitch ? 'Элементы' : 'Функции'"
              color="#F58E43"
              style="margin-left: 14%"
          ></v-switch>

          <v-divider></v-divider>
          <div v-if="modeSwitch === true">
            <div
                style="margin-top: 5%; color: black; font-size: 18px; text-align: left;  margin-bottom: 15px">
              Создание и редактирование объектов:
            </div>

            <v-dialog width="500px" v-model="dialog">
              <template v-slot:activator="{ on, attrs }">

                <v-btn @click="openWind='OverlayBrigada'" v-bind="attrs" v-on="on" width="95%"
                       style="border-radius: 10px; margin-bottom: 15px; color: #A0AEC0" outlined>
                  Бригада
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
                  Обслуж. команда
                </v-btn>

              </template>
              <OverlayBuilding v-if="openWind === 'overlayBuilding'" @updateParent="updateDialog"/>
              <OverlayStreet v-if="openWind === 'OverlayStreet'" @updateParent="updateDialog"/>
              <OverlayKvartal v-if="openWind === 'OverlayKvartal'" @updateParent="updateDialog"/>
              <OverlayBrigada v-if="openWind === 'OverlayBrigada'" @updateParent="updateDialog"/>
              <OverlayDostavka v-if="openWind === 'OverlayDostavka'" @updateParent="updateDialog"/>
              <OverlaySluzba v-if="openWind === 'OverlaySluzba'" @updateParent="updateDialog"/>
              <OverlayObsluga v-if="openWind === 'OverlayObsluga'" @updateParent="updateDialog"/>
            </v-dialog>
          </div>

          <div v-if="modeSwitch === false">
            <div
                style="margin-top: 5%; color: black; font-size: 18px; text-align: left;  margin-bottom: 15px">
              Доступные функции:
            </div>

            <v-dialog width="500px" v-model="dialog">
              <template>

                <v-btn width="95%"
                       style="border-radius: 10px; margin-bottom: 15px; color: #A0AEC0" outlined>
                  Функция 1
                </v-btn>
                <v-btn width="95%"
                       style="border-radius: 10px; margin-bottom: 15px; color: #A0AEC0" outlined>
                  Функция 2
                </v-btn>
                <v-btn width="95%"
                       style="border-radius: 10px; margin-bottom: 15px; color: #A0AEC0" outlined>
                  Функция 3
                </v-btn>
                <v-btn width="95%"
                       style="border-radius: 10px; margin-bottom: 15px; color: #A0AEC0" outlined>
                  Функция 4
                </v-btn>
              </template>
            </v-dialog>
          </div>
          <v-divider style="margin-top: 5%"></v-divider>

        </div>
        <template v-slot:append>
          <v-row style="margin: auto">
            <v-btn dark to="/" color=#F58E43 class="mx-auto"
                   style="border-radius: 10px; box-shadow: none !important; margin-left: 5px; margin-bottom: 20px; width: 200px">
              Выйти
            </v-btn>
          </v-row>
        </template>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
import OverlayBuilding from "./overlays/OverlayBuilding";
import OverlayStreet from "./overlays/OverlayStreet";
import OverlayKvartal from "./overlays/OverlayKvartal";
import OverlayBrigada from "./overlays/OverlayBrigada";
import OverlayDostavka from "./overlays/OverlayDostavka";
import OverlaySluzba from "./overlays/OverlaySluzba";
import OverlayObsluga from "./overlays/OverlayObsluga";

export default {
  name: "LeftNavigationBar",

  components: {
    OverlayBuilding,
    OverlayStreet,
    OverlayKvartal,
    OverlayBrigada,
    OverlayDostavka,
    OverlaySluzba,
    OverlayObsluga
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