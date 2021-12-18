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

          <v-text-field
              light
              v-model="KvartalName"
              :label=this.KvartalNameDone
              placeholder="Введите новое название"
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
              :rules="rules.clearFieldValid"
              name="BuildingStreet"
              color=#F58E43
              label="Выберете улицу"
              required
              style="margin-top: 20px"
          ></v-select>

          <v-select
              v-model="ChooseBuilding"
              light
              :items="Streets"
              :rules="rules.clearFieldValid"
              name="BuildingStreet"
              color=#F58E43
              label="Выберете здание"
              required
              style="margin-top: 10px"
          ></v-select>

          <v-btn style="margin-left: 16%; margin-bottom: 5%"
                 color=#F58E43
                 outlined
                 @click="getInfo"
          >
            Показать информацию о доме
          </v-btn>
          <v-divider style="margin-bottom: 10px"></v-divider>

          <v-text-field
              light
              v-model="BuildingName"
              label="Название здания"
              name="BuildingName"
              type="text"
              :rules="rules.clearFieldValid"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />
          <v-text-field
              v-model="BuildingType"
              light
              label="Тип"
              name="BuildingType"
              type="text"
              :rules="rules.clearFieldValid"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />
          <v-text-field
              light
              v-model="BuildingFloors"
              label="Этажность"
              name="BuildingFloors"
              type="number"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              :rules="rules.numberValid"
              style="border-radius: 10px;"
          />

          <v-select
              v-model="BuildingStreet"
              light
              :items="Streets"
              :rules="rules.clearFieldValid"
              name="BuildingStreet"
              color=#F58E43
              label="Выберете улицу"
              required
              style="margin-top: 20px"
          ></v-select>

          <v-select
              light
              v-model="BuildingComitet"
              :items="Comitets"
              :rules="rules.clearFieldValid"
              name="BuildingComitet"
              color=#F58E43
              label="Выберете комитет"
              required
          ></v-select>

          <v-select
              light
              v-model="BuildingBrigada"
              :items="Brigada"
              :rules="rules.clearFieldValid"
              color=#F58E43
              name="BuildingBrigada"
              label="Выберете бригаду"
              required
          ></v-select>
        </v-card-text>

        <v-btn style="margin-left: 28%; margin-bottom: 5%"
               color=#F58E43
               outlined
               @click="submit"
        >
          Добавить и закрыть
        </v-btn>
      </v-card>
    </div>
  </v-form>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "OverlayBuilding",

  props: {
    indexInArray: Number,
    KvartalNameDone: String,
  },
  data: () => ({
    valid: true,

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
    getInfo() {

    }
  }
}
</script>

<style scoped>

</style>