<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <div>
      <!-- Оверлей информации о квартале -->
      <v-card
          color="#F7FAFC"
      >
        <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
          <div style="color: black; text-align: center; margin-bottom: 10%; font-size: 25px">
            <br>{{ this.KvartalNameDone }}
          </div>

          <v-row style="margin-left: 1%; margin-right: 1%; margin-bottom: 10px">
            <v-col>
              <v-dialog width="500px" v-model="dialog">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn style=""
                         color=#F58E43
                         outlined
                         @click="openWind='OverlayBuilding'"
                         v-bind="attrs" v-on="on"
                  >
                    Добавить здание
                  </v-btn>
                </template>

                <OverlayBuilding :KvartalName="this.KvartalNameDone" :isChangeable="false"
                                 v-if="openWind === 'OverlayBuilding'"
                                 @updateParent="updateDialog"/>
              </v-dialog>
            </v-col>

            <v-col>
              <v-dialog width="500px" v-model="dialog">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn style=""
                         color=#F58E43
                         outlined
                         @click="openWind='OverlayStreet'"
                         v-bind="attrs" v-on="on"
                  >
                    Управление улицами
                  </v-btn>
                </template>
                <OverlayStreet v-if="openWind === 'OverlayStreet'"
                               @updateParent="updateDialog"/>
              </v-dialog>
            </v-col>
          </v-row>

          <v-text-field
              light
              v-model="KvartalName"
              placeholder="Введите новое название"
              label="Название квартала"
              name="KvartalName"
              type="text"
              :rules="rules.clearFieldValid"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />

          <v-overflow-btn
              v-model="ChooseStreetForBuilding"
              light
              :items="Streets"
              name="ChooseStreetForBuilding"
              color=#F58E43
              label="Выберете улицу"
              required
              editable
              segmented
              v-on:change="updateListOfBuildings(ChooseStreetForBuilding)"
          ></v-overflow-btn>

          <v-overflow-btn
              v-model="ChooseBuilding"
              light
              :items="Buildings"
              name="ChooseBuilding"
              color=#F58E43
              label="Выберете здание"
              required
              editable
              segmented
              style="margin-top: 10px"
          ></v-overflow-btn>

          <v-dialog width="500px" v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
              <v-btn style="margin-left: 16%; margin-bottom: 5%" @click="openWind='OverlayBuilding2'"
                     v-bind="attrs" v-on="on"
                     color=#F58E43
                     outlined
              >
                Показать информацию о доме
              </v-btn>
            </template>
            <OverlayBuilding2 :KvartalName="this.KvartalNameDone" :isChangeable="true" :BuildingNameDone="'ПримерДома1'"
                              v-if="openWind === 'OverlayBuilding2'"
                              @updateParent="updateDialog"/>
          </v-dialog>
          <v-divider style="margin-bottom: 10px"></v-divider>

        </v-card-text>

        <v-btn style="margin-left: 27%; margin-bottom: 5%"
               color=#F58E43
               outlined
               @click="submit"
        >
          Сохранить и закрыть
        </v-btn>
      </v-card>
    </div>
  </v-form>
</template>

<script>
import axios from "axios";
import OverlayBuilding from "@/components/mainPage/elementsOverlays/OverlayBuilding";
import OverlayStreet from "@/components/mainPage/elementsOverlays/OverlayStreet";
import OverlayBuilding2 from "@/components/mainPage/elementsOverlays/OverlayBuilding";

export default {
  name: "OverlayKvartalInfo",
  components: {OverlayBuilding, OverlayStreet, OverlayBuilding2},

  props: {
    indexInArray: Number,
    KvartalNameDone: String,
  },
  data: () => ({
    valid: true,
    dialog: false,
    openWind: '',

    absolute: true,

    KvartalName: '',
    ChooseStreetForBuilding: '',
    ChooseBuilding: '',

    Streets: [],
    Buildings: [],

    rules: {
      clearFieldValid: [
        v => !!v || 'Поле не может быть пустым'
      ],
      numberValid: [
        v => !!v || 'Поле не может быть пустым',
        v => !!/^\d*$/.test(v) || 'Допустимы только числа',
      ],
    },
  }),
  methods: {
    updateDialog(data) {
      this.dialog = data.dialog
    },
    submit() {
      if (this.$refs.form.validate()) {
        let str = "/api/app/quarter/save"
        let data2 = {
          dialog: false
        }
        this.$emit('updateParent', {data2})

        let data = {
          KvartalName: this.KvartalName,

        }
        axios.create({
          baseURL: this.hostname
        }).post(str, data)
            .then(resp => {
              console.log(resp.data)
            })
      }
    },
    getListOfStreets(KvartalName) {
      let str = "/api/app/street/single?name=" + KvartalName
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            for (let i = 0; i < resp.data.length; i++) {
              this.Streets.push(resp.data[i].name)
            }
          })
    },
    updateListOfBuildings(ChooseStreetForBuilding) {
      let str = "/api/app/street/single?name=" + ChooseStreetForBuilding
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            for (let i = 0; i < resp.data.length; i++) {
              this.Buildings.push(resp.data[i].name)
            }
          })
    },
  },
  beforeMount() {
    this.KvartalName = this.KvartalNameDone
    this.getListOfStreets(this.KvartalNameDone)

  },
}
</script>

<style scoped>

</style>