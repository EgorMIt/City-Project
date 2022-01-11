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
          Добавить и закрыть
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
      } else if (this.StreetNameList === this.Streets[0]) {
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
    beforeMount() {
      this.KvartalName = this.KvartalNameDone
      this.getListOfStreets(this.KvartalNameDone)
    },
  }
}
</script>

<style scoped>

</style>