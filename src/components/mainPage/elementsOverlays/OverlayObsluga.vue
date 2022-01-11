<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей обслуживающей команды -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px; line-height: 1">
          <br>Управление обслуживающими командами
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
          Выберете элемент или создайте новый
        </div>
        <v-overflow-btn
            light
            v-model="ObslugaNameList"
            :items="Obsluga"
            :rules="rules.clearFieldValid"
            name="ObslugaName"
            color=#F58E43
            required
            editable
            segmented
            v-on:change="updateElements(ObslugaNameList)"
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
            v-model="ObslugaPrice"
            label="Тариф за обслуживание"
            name="ObslugaPrice"
            type="number"
            :rules="rules.numberValid"
            color=#F58E43
            background-color=#EDF2F7
            outlined
            style="border-radius: 10px;"
        />

        <v-overflow-btn
            light
            v-model="ObslugaKvartal"
            :items="Kvartals"
            :rules="rules.clearFieldValid"
            name="ObslugaKvartal"
            color=#F58E43
            label="Выберете квартал"
            required
            editable
            segmented
        ></v-overflow-btn>

        <v-overflow-btn
            light
            v-model="ObslugaSluzba"
            :items="Sluzba"
            :rules="rules.clearFieldValid"
            name="ObslugaSluzba"
            color=#F58E43
            label="Выберете городскую службу"
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
        Сохранить и закрыть
      </v-btn>
    </v-card>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "OverlayObsluga",

  data: () => ({
    absolute: true,
    valid: true,
    removeButton: true,

    ObslugaNameList: '',

    ObslugaPrice: '',
    ObslugaKvartal: '',
    ObslugaSluzba: '',

    Obsluga: ['Добавить новый элемент'],
    Kvartals: [],
    Sluzba: [],

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
        if (this.ObslugaNameList !== this.Obsluga[0]) {
          str = "/api/app/service_team/update"
        } else {
          str = "/api/app/service_team/save"
        }

        let data2 = {
          dialog: false
        }
        this.$emit('updateParent', {data2})

        let data = {
          price: this.ObslugaPrice,
          quarter: this.ObslugaKvartal,
          service: this.ObslugaSluzba,
        }
        axios.create({
          baseURL: this.hostname
        }).post(str, data)
            .then(resp => {
              console.log(resp.data)
            })
      }
    },
    updateElements(ObslugaNameList) {
      if (this.ObslugaNameList !== this.Obsluga[0]) {
        this.getObslugaByID(ObslugaNameList)
        this.removeButton = false
      } else if (this.ObslugaNameList === this.Obsluga[0]) {
        this.removeButton = true
        this.ObslugaPrice = ''
        this.ObslugaKvartal = ''
        this.ObslugaSluzba = ''
      }
    },
    getListOfObsluga() {
      let str = "/api/app/service_team/all"
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            for (let i = 0; i < resp.data.length; i++) {
              this.Obsluga.push(resp.data[i].id)
            }
          })
    },
    getObslugaByID: function (ObslugaNameList) {
      let str = "/api/app/service_team/single?id=" + ObslugaNameList
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            this.ObslugaPrice = resp.data.rate
            this.ObslugaKvartal = resp.data.quarterByQuarterId.name
            this.ObslugaSluzba = resp.data.cityServiceByServiceId.type
          })
    },
    getListOfKvartals() {
      let str = "/api/app/quarter/all"
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            for (let i = 0; i < resp.data.length; i++) {
              this.Kvartals.push(resp.data[i].name)
            }
          })
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
    removeElement() {
      let str = "/api/app/delivery_service/remove?id=" + this.ObslugaNameList
      axios.create({
        baseURL: this.hostname
      }).post(str)
          .then(resp => {
            console.log(resp.data)
          })
      this.Obsluga = ['Добавить новый элемент']
      this.getListOfObsluga()
      this.ObslugaNameList = this.Obsluga[0]
      this.removeButton = true
    },
  },
  beforeMount() {
    this.getListOfKvartals()
    this.getListOfSluzba()
    this.getListOfObsluga()
    this.ObslugaNameList = this.Obsluga[0]
  },
}
</script>

<style scoped>

</style>