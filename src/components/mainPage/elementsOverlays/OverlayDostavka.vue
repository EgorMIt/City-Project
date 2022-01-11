<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей доставки -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px; line-height: 1">
          <br>Управление командами доставки
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
          Выберете элемент или создайте новый
        </div>
        <v-overflow-btn
            light
            v-model="DostavkaNameList"
            :items="Dostavka"
            :rules="rules.clearFieldValid"
            name="DostavkaNameList"
            color=#F58E43
            required
            editable
            segmented
            v-on:change="updateElements(DostavkaNameList)"
        ></v-overflow-btn>

        <div style="margin-top: 10%; margin-bottom: 20px; color: black; font-weight: lighter">
          Заполните необходимые поля
        </div>

        <v-text-field
            light
            v-model="DostavkaName"
            label="Название"
            name="DostavkaName"
            type="text"
            :rules="rules.clearFieldValid"
            color=#F58E43
            background-color=#EDF2F7
            outlined
            style="border-radius: 10px;"
        />

        <v-text-field
            light
            v-model="DostavkaPrice"
            label="Тариф за доставку"
            name="DostavkaPrice"
            type="number"
            :rules="rules.numberValid"
            color=#F58E43
            background-color=#EDF2F7
            outlined
            style="border-radius: 10px;"
        />

        <v-overflow-btn
            light
            v-model="DostavkaMaterial"
            :items="Materials"
            :rules="rules.clearFieldValid"
            name="DostavkaMaterial"
            color=#F58E43
            label="Выберете стройматериал"
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
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "OverlayDostavka",


  data: () => ({
    absolute: true,
    valid: true,

    DostavkaNameList: '',

    DostavkaName: '',
    DostavkaPrice: '',
    DostavkaMaterial: '',


    Materials: [],
    Dostavka: ['Добавить новый элемент'],

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
        let str
        if (this.DostavkaNameList !== this.Dostavka[0]) {
          str = "/api/app/delivery_service/update"
        } else {
          str = "/api/app/delivery_service/save"
        }

        let data2 = {
          dialog: false
        }
        this.$emit('updateParent', {data2})

        let data = {
          name: this.DostavkaName,
          rate: this.DostavkaPrice,
          materialType: this.DostavkaMaterial,
        }
        axios.create({
          baseURL: this.hostname
        }).post(str, data)
            .then(resp => {
              console.log(resp.data)
            })
      }
    },
    updateElements(DostavkaNameList) {
      if (this.DostavkaNameList !== this.Dostavka[0]) {
        this.getDostavkaByName(DostavkaNameList)
      } else if (this.DostavkaNameList === this.Dostavka[0]) {
        this.DostavkaName = ''
        this.DostavkaPrice = ''
        this.DostavkaMaterial = ''
      }
    },
    getListOfDostavka() {
      let str = "/api/app/delivery_service/all"
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            for (let i = 0; i < resp.data.length; i++) {
              this.Dostavka.push(resp.data[i].name)
            }
          })
    },
    getDostavkaByName: function (DostavkaNameList) {
      let str = "/api/app/delivery_service/single?name=" + DostavkaNameList
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            this.DostavkaName = resp.data.name
            this.DostavkaPrice = resp.data.rate
            this.DostavkaMaterial = resp.data.materialByMaterialId.type
          })
    },
    getListOfMaterial() {
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
    this.getListOfDostavka()
    this.getListOfMaterial()
    this.DostavkaNameList = this.Dostavka[0]
  },
}
</script>

<style scoped>

</style>