<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей бригады -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px; line-height: 1">
          <br>Управление строительными бригадами
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
          Выберете номер бригады или создайте новую
        </div>
        <v-overflow-btn
            light
            v-model="BrigadaNameList"
            :items="Brigada"
            :rules="rules.clearFieldValid"
            name="BrigadaNameList"
            color=#F58E43
            required
            editable
            segmented
            v-on:change="updateElements(BrigadaNameList)"
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
            label="Количество людей в бригаде"
            v-model="BrigadaPeople"
            name="BrigadaPeople"
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
  name: "OverlayBrigada",


  data: () => ({
    absolute: true,
    valid: true,
    removeButton: true,

    BrigadaNameList: '',

    BrigadaPeople: '',

    Brigada: ['Добавить новый элемент'],

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
        let str = "/api/app/construction_crew/save"

        let data2 = {
          dialog: false
        }
        this.$emit('updateParent', {data2})

        let data = {
          size: this.BrigadaPeople,
        }
        axios.create({
          baseURL: this.hostname
        }).post(str, data)
            .then(resp => {
              console.log(resp.data.size)
            })

      }
    },
    updateElements(BrigadaNameList) {
      if (BrigadaNameList !== this.Brigada[0]) {
        this.getBrigadaByID(BrigadaNameList)
        this.removeButton = false
      } else if (BrigadaNameList === this.Brigada[0]) {
        this.BrigadaPeople = ''
        this.removeButton = true
      }
    },
    removeElement() {
      let str = "/api/app/construction_crew/remove?id=" + this.BrigadaNameList
      axios.create({
        baseURL: this.hostname
      }).post(str)
          .then(resp => {
            console.log(resp.data)
          })
      this.Brigada = ['Добавить новый элемент']
      this.getListOfBrigada()
      this.BrigadaNameList = this.Brigada[0]
      this.removeButton = true
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
    getBrigadaByID: function (BrigadaNameList) {
      let str = "/api/app/construction_crew/single?id=" + BrigadaNameList
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data.size)
            this.BrigadaPeople = resp.data.size
          })
    },
  },
  beforeMount() {
    this.getListOfBrigada()
    this.BrigadaNameList = this.Brigada[0]
  },
}
</script>

<style scoped>

</style>