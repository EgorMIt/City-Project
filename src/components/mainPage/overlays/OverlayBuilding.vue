<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <div>
      <!-- Оверлей здания -->
      <v-card
          color="#F7FAFC"
      >
        <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
          <div v-if="isChangeable===false" style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px">
            <br>Создать новое здание
          </div>

          <div v-if="isChangeable===true" style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px">
            <br>Информация о существующем здании
          </div>

          <div v-if="isChangeable===false"
               style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
            Заполните необходимые поля
          </div>

          <div v-if="isChangeable===true"
               style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
            При необходимости вы можете изменить поля
          </div>

          <v-text-field
              light
              v-model="BuildingName"
              label="Название"
              placeholder="Введите новое название"
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
              placeholder="Введите новый тип"
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
              placeholder="Введите новое значение этажности"
              name="BuildingFloors"
              type="number"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              :rules="rules.numberValid"
              style="border-radius: 10px;"
          />
          <v-btn v-if="this.isChangeable === false" style="margin-left: 20%; position: absolute"
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
                :rules="rules.clearFieldValid"
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
                :rules="rules.numberValid"
                color=#F58E43
                background-color=#EDF2F7
                outlined
                style="border-radius: 10px; margin-top: 20px"
            />

          </v-card-text>

          <v-btn style="margin-left: 25%; position: absolute; bottom: 5%"
                 color=#F58E43
                 outlined
                 @click="addMaterial"
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

  props: {
    isChangeable: Boolean,
    KvartalNameDone: String,

    BuildingNameDone: String,
    BuildingTypeDone: String,
    BuildingFloorsDone: Number,
    BuildingStreetDone: String,
    BuildingComitetDone: String,
    BuildingBrigadaDone: String,
  },

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

    addedMaterials: [],
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
        let data = {
          isChangeable: this.isChangeable,
          BuildingName: this.BuildingName,
          BuildingType: this.BuildingType,
          BuildingFloors: this.BuildingFloors,
          BuildingStreet: this.BuildingStreet,
          BuildingComitet: this.BuildingComitet,
          BuildingBrigada: this.BuildingBrigada,
          addedMaterials: this.addedMaterials,
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
    addMaterial() {
      this.overlayMaterialForBuilding = false;
      this.addedMaterials.push({
        BuildingMaterial: this.BuildingMaterial,
        BuildingMaterialCount: this.BuildingMaterialCount
      })
    },

    getListOfStreets() {
      axios.create({
        baseURL: 'http://localhost:10520/api/v1'
      }).get('/get/list')
          .then(resp => {
            console.log(resp.data)
            for (let i = 0; i < resp.data.length; i++) {
              this.Streets.push(resp.data[i].name)
            }
          })
    },
  },
  beforeMount() {
    //this.getListOfStreets()
    this.BuildingName = this.BuildingNameDone
    this.BuildingType = this.BuildingTypeDone
    this.BuildingFloors = this.BuildingFloorsDone
    this.BuildingStreet = this.BuildingStreetDone
    this.BuildingComitet = this.BuildingComitetDone
    this.BuildingBrigada = this.BuildingBrigadaDone
  },
}
</script>

<style scoped>

</style>