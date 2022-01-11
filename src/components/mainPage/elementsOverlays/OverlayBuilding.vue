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
          <v-btn v-if="this.isChangeable === false" style="margin-left: 20%; position: absolute;"
                 color=#F58E43
                 outlined
                 @click="overlayMaterialForBuilding = !overlayMaterialForBuilding"
          >
            Добавить стройматериал
          </v-btn>

          <v-overflow-btn
              v-model="BuildingStreet"
              light
              :items="Streets"
              :rules="rules.clearFieldValid"
              name="BuildingStreet"
              color=#F58E43
              label="Выберете улицу"
              required
              editable
              segmented
              style="margin-top: 50px"
          ></v-overflow-btn>

          <v-overflow-btn
              light
              v-model="BuildingComitet"
              :items="Comitets"
              :rules="rules.clearFieldValid"
              name="BuildingComitet"
              color=#F58E43
              label="Выберете комитет"
              required
              editable
              segmented
          ></v-overflow-btn>

          <v-overflow-btn
              light
              v-model="BuildingBrigada"
              :items="Brigada"
              :rules="rules.clearFieldValid"
              color=#F58E43
              name="BuildingBrigada"
              label="Выберете бригаду"
              required
              editable
              segmented
          ></v-overflow-btn>

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

            <v-overflow-btn
                light
                v-model="BuildingMaterial"
                :items="Materials"
                :rules="rules.clearFieldValid"
                name="BuildingMaterial"
                color=#F58E43
                label="Выберете стройматериал"
                editable
                segmented
                required
            ></v-overflow-btn>

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
    Streets: [],
    Comitets: [],
    Brigada: [],
    Materials: [],

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
    submit() {
      if (this.$refs.form.validate()) {
        let str = "/api/app/building/save"
        let data2 = {
          dialog: false
        }
        this.$emit('updateParent', {data2})

        let data = {
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
        }).post(str, data)
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

    getBuildingByName(BuildingNameDone) {
      let str = "/api/app/street/single?name=" + BuildingNameDone
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            this.BuildingType = resp.data.type
            this.BuildingFloors = resp.data.floors
            this.BuildingStreet = resp.data.street
            this.BuildingComitet = resp.data.comitet
            this.BuildingBrigada = resp.data.brigada
            this.addedMaterials = resp.data.materials
          })
    },
    getListOfStreets(KvartalNameDone) {
      let str = "/api/app/street/single?name=" + KvartalNameDone
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
    getListOfBrigada() {
      let str = "/api/app/construction_crew/all"
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            for (let i = 0; i < resp.data.length; i++) {
              this.Brigada.push(resp.data[i].id)
            }
          })
    },
    getListOfComitets() {
      let str = "/api/app/committee/all"
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            for (let i = 0; i < resp.data.length; i++) {
              this.Comitets.push(resp.data[i].id)
            }
          })
    },
    getListOfMaterials() {
      let str = "/api/app/material/all"
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            for (let i = 0; i < resp.data.length; i++) {
              this.Materials.push(resp.data[i].type)
            }
          })
    },
  },
  beforeMount() {
    if (this.isChangeable === true) {
      this.BuildingName = this.BuildingNameDone
      this.getBuildingByName(this.BuildingNameDone)
    }
    this.getListOfStreets()
    this.getListOfBrigada()
    this.getListOfComitets()
    this.getListOfMaterials()
  },
}
</script>

<style scoped>

</style>