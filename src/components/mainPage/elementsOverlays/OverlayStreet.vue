<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей улицы -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px">
          <br>Создать новую улицу
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
          Выберете элемент или создайте новый
        </div>
        <v-overflow-btn
            light
            v-model="StreetNameList"
            :items="Streets"
            :rules="rules.clearFieldValid"
            name="SluzbaName"
            color=#F58E43
            required
            editable
            segmented
            v-on:change="updateElements(StreetNameList)"
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
            v-model="StreetName"
            label="Название улицы"
            name="StreetName"
            type="text"
            :rules="rules.clearFieldValid"
            color=#F58E43
            background-color=#EDF2F7
            outlined
            style="border-radius: 10px;"
        />

        <v-overflow-btn
            v-model="StreetToStreet"
            :items="Streets"
            label="Пересекаемые улицы"
            multiple
            clearable
            light
            editable
            segmented
            color=#F58E43
        >
          <template v-slot:selection="{ item, index }">

            <span v-if="index === 0">{{ item }}</span>
            <span
                v-if="index === 1"
                class="grey--text text-caption"
            >
                  (+{{ StreetToStreet.length - 1 }} others)
                </span>
          </template>
        </v-overflow-btn>

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
  name: "OverlayStreet",

  props: {
    KvartalNameDone: String,
  },
  data: () => ({
    absolute: true,
    valid: true,
    removeButton: true,

    StreetNameList: '',
    StreetName: '',
    StreetToStreet: [],

    Streets: ['Добавить новый элемент'],

    rules: {
      clearFieldValid: [
        v => !!v || 'Поле не может быть пустым'
      ],
    },
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        let str
        if (this.StreetNameList !== this.Streets[0]) {
          str = "/api/app/street/update"
        } else {
          str = "/api/app/street/save"
        }

        let data2 = {
          dialog: false
        }
        this.$emit('updateParent', {data2})

        let data = {
          StreetName: this.StreetName,
          StreetToStreet: this.StreetToStreet,
          StreetKvartal: this.KvartalNameDone,
        }
        axios.create({
          baseURL: this.hostname
        }).post(str, data)
            .then(resp => {
              console.log(resp.data)
            })
      }
    },
    updateElements(StreetNameList) {
      if (this.StreetNameList !== this.Streets[0]) {
        this.getStreetByName(StreetNameList)
        this.removeButton = false
      } else if (this.StreetNameList === this.Streets[0]) {
        this.removeButton = true
        this.StreetName = ''
        this.StreetToStreet = ''
      }
    },
    getStreetByName: function (StreetNameList) {
      let str = "/api/app/street/single?name=" + StreetNameList
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            this.StreetName = resp.data.name
            this.StreetToStreet = resp.data
          })
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
    removeElement() {
      let str = "/api/app/street/remove?id=" + this.StreetNameList
      axios.create({
        baseURL: this.hostname
      }).post(str)
          .then(resp => {
            console.log(resp.data)
          })
      this.Streets = ['Добавить новый элемент']
      this.getListOfStreets(this.KvartalNameDone)
      this.StreetNameList = this.Streets[0]
      this.removeButton = true
    },
  },
  beforeMount() {
    this.KvartalName = this.KvartalNameDone
    this.StreetNameList = this.Streets[0]
    this.getListOfStreets(this.KvartalNameDone)
  },

}
</script>

<style scoped>

</style>