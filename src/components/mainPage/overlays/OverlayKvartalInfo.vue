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

          <v-row style="margin-left: 3%; margin-bottom: 10px">
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
                    Добавить улицу
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
              name="BuildingName"
              type="text"
              :rules="rules.clearFieldValid"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />

          <v-select
              v-model="ChooseStreetForBuilding"
              light
              :items="Streets"
              name="BuildingStreet"
              color=#F58E43
              label="Выберете улицу"
              required
          ></v-select>

          <v-select
              v-model="ChooseBuilding"
              light
              :items="Streets"
              name="BuildingStreet"
              color=#F58E43
              label="Выберете здание"
              required
              style="margin-top: 10px"
          ></v-select>

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
import router from "@/router";
import OverlayBuilding from "@/components/mainPage/overlays/OverlayBuilding";
import OverlayStreet from "@/components/mainPage/overlays/OverlayStreet";
import OverlayBuilding2 from "@/components/mainPage/overlays/OverlayBuilding";

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

    BuildingName: '',
    BuildingType: '',
    BuildingFloors: '',
    BuildingStreet: '',
    BuildingComitet: '',
    BuildingBrigada: '',

    Streets: ['Street 1', 'Street 2', 'Street 3', 'Street 4', 'Street 5'],
    Comitets: ['Comitet 1', 'Comitet 2', 'Comitet 3', 'Comitet 4', 'Comitet 5'],
    Brigada: ['Brigada 1', 'Brigada 2', 'Brigada 3', 'Brigada 4', 'Brigada 5'],

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
    doSomething() {
      this.$emit('updateParent', {
        dialog: false,
      })
    },
    updateDialog(data) {
      this.dialog = data.dialog
    },
    submit() {
      if (this.$refs.form.validate()) {
        console.log("123213123")
        let data = {
          KvartalName: this.KvartalName,

          BuildingName: this.BuildingName,
          BuildingType: this.BuildingType,
          BuildingFloors: this.BuildingFloors,
          BuildingStreet: this.BuildingStreet,
          BuildingComitet: this.BuildingComitet,
          BuildingBrigada: this.BuildingBrigada,
        }
        axios.create({
          baseURL: this.hostname
        }).post('/changeBuilding', data)
            .then(resp => {
              console.log(resp.data.KvartalName)
              router.push({path: '/main'})
            })
      }
    },
  },
  beforeMount() {
    this.KvartalName = this.KvartalNameDone

  },
}
</script>

<style scoped>

</style>