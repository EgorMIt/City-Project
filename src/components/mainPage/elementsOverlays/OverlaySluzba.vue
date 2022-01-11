<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей службы -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px; line-height: 1">
          <br>Управление городскими службами
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
          Выберете элемент или создайте новый
        </div>
        <v-overflow-btn
            light
            v-model="SluzbaNameList"
            :items="Sluzba"
            :rules="rules.clearFieldValid"
            name="SluzbaName"
            color=#F58E43
            required
            editable
            segmented
            v-on:change="updateElements(SluzbaNameList)"
        ></v-overflow-btn>

        <v-btn style="margin-left: 39%; margin-bottom: 5%"
               color=#F16063
               :disabled="removeButton"
               outlined
               @click="removeElement"
        >
          Удалить
        </v-btn>

        <div style="margin-top: 10%; margin-bottom: 20px; color: black; font-weight: lighter">
          Заполните необходимые поля
        </div>

        <v-text-field
            light
            v-model="SluzbaType"
            label="Тип службы"
            name="SluzbaType"
            type="text"
            :rules="rules.clearFieldValid"
            color=#F58E43
            background-color=#EDF2F7
            outlined
            style="border-radius: 10px;"
        />

        <v-text-field
            light
            v-model="SluzbaPrice"
            label="Цена"
            name="SluzbaPrice"
            type="number"
            :rules="rules.numberValid"
            color=#F58E43
            background-color=#EDF2F7
            outlined
            style="border-radius: 10px;"
        />
      </v-card-text>

      <v-btn style="margin-left: 28%; margin-bottom: 5%"
             color=#F58E43
             outlined
             @click="submit"
      >
        Сохранить и закрыть
      </v-btn>
    </v-card>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "OverlaySluzba",


  data: () => ({
    absolute: true,
    valid: true,
    removeButton: true,

    SluzbaNameList: '',
    SluzbaType: '',
    SluzbaPrice: '',

    Sluzba: ['Добавить новый элемент'],

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
        let str = "/api/app/city_service/save"
        let data2 = {
          dialog: false
        }
        this.$emit('updateParent', {data2})

        let data = {
          type: this.SluzbaType,
          price: this.SluzbaPrice,
        }
        axios.create({
          baseURL: this.hostname
        }).post(str, data)
            .then(resp => {
              console.log(resp.data)
            })
      }
    },
    updateElements(SluzbaNameList) {
      if (this.SluzbaNameList !== this.Sluzba[0]) {
        this.removeButton = false
        this.getSluzbaByType(SluzbaNameList)
      } else if (this.SluzbaNameList === this.Sluzba[0]) {
        this.removeButton = true
        this.SluzbaType = ''
        this.SluzbaPrice = ''
      }
    },
    getListOfSluzba() {
      let str = "/api/app/city_service/all"
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            for (let i = 0; i < resp.data.length; i++) {
              this.Sluzba.push(resp.data[i].type)
            }
          })
    },
    getSluzbaByType: function (SluzbaNameList) {
      let str = "/api/app/city_service/single?type=" + SluzbaNameList
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            this.SluzbaType = resp.data.type
            this.SluzbaPrice = resp.data.price
          })
    },
    removeElement() {
      let str = "/api/app/city_service/remove?id=" + this.SluzbaNameList
      axios.create({
        baseURL: this.hostname
      }).post(str)
          .then(resp => {
            console.log(resp.data)
          })
      this.Sluzba = ['Добавить новый элемент']
      this.getListOfSluzba()
      this.SluzbaNameList = this.Sluzba[0]
      this.removeButton = true
    },
  },
  beforeMount() {
    this.getListOfSluzba()
    this.SluzbaNameList = this.Sluzba[0]
  },
}
</script>

<style scoped>

</style>