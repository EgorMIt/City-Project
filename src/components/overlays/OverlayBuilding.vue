<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <div>
      <!-- Оверлей здания -->
      <v-card
          color="#F7FAFC"
      >
        <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
          <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px">
            <br>Создать новое здание
          </div>

          <div style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
            Заполните необходимые поля
          </div>

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
          <v-btn style="margin-left: 20%; position: absolute"
                 color=#F58E43
                 outlined
                 @click="overlayMaterialForBuilding = !overlayMaterialForBuilding"
          >
            Добавить стройматериал
          </v-btn>

          <v-select
              v-model="BuildingStreet"
              light
              :items="Streets"
              :rules="rules.clearFieldValid"
              name="BuildingStreet"
              color=#F58E43
              label="Выберете улицу"
              required
              style="margin-top: 50px"
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

      <!-- Оверлей материала для здания -->
      <v-overlay
          :absolute="absolute"
          :value="overlayMaterialForBuilding"
      >
        <v-card
            height="400px"
            width="500px"
            style="background-color: #F7FAFC"
        >
          <v-card-text class="font-weight-medium" style="font-size: 20pt; ">

            <div style="margin-top: 5%; color: black; text-align: center">
              Добавить стройметариал для здания
            </div>
          </v-card-text>

          <v-card-text class="font-weight-medium" style="font-size: 15pt; ">

            <div style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
              Заполните необходимые поля
            </div>

            <v-select
                light
                v-model="BuildingMaterial"
                :items="Materials"
                :rules="rules.building"
                name="BuildingMaterial"
                color=#F58E43
                label="Выберете стройматериал"
                required
            ></v-select>

            <v-text-field
                light
                v-model="BuildingMaterialCount"
                label="Количество стройматериала"
                name="BuildingMaterialCount"
                type="number"
                color=#F58E43
                background-color=#EDF2F7
                outlined
                style="border-radius: 10px; margin-top: 20px"
            />

          </v-card-text>

          <v-btn style="margin-left: 25%; position: absolute; bottom: 5%"
                 color=#F58E43
                 outlined
                 @click="overlayMaterialForBuilding = false"
          >
            Добавить стройматериал
          </v-btn>
        </v-card>
      </v-overlay>
    </div>
  </v-form>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "OverlayBuilding",


  data: () => ({
    overlayMaterialForBuilding: false,
    valid: true,

    absolute: true,

    BuildingName: '',
    BuildingType: '',
    BuildingFloors: '',
    BuildingStreet: '',
    BuildingComitet: '',
    BuildingBrigada: '',

    BuildingMaterial: '',
    BuildingMaterialCount: '',

    Streets: ['Street 1', 'Street 2', 'Street 3', 'Street 4', 'Street 5'],
    Comitets: ['Comitet 1', 'Comitet 2', 'Comitet 3', 'Comitet 4', 'Comitet 5'],
    Brigada: ['Brigada 1', 'Brigada 2', 'Brigada 3', 'Brigada 4', 'Brigada 5'],
    Materials: ['Material 1', 'Material 2', 'Material 3', 'Material 4', 'Material 5'],

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
          BuildingName: this.BuildingName,
          BuildingType: this.BuildingType,
          BuildingFloors: this.BuildingFloors,
          BuildingStreet: this.BuildingStreet,
          BuildingComitet: this.BuildingComitet,
          BuildingBrigada: this.BuildingBrigada,
        }
        axios.create({
          baseURL: this.hostname
        }).post('/addBuilding', data)
            .then(resp => {
              console.log(resp.data.BuildingName)
              router.push({path: '/main'})
            })
      }
    },
  }
}
</script>

<style scoped>

</style>