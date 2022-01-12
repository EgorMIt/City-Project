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

        <v-btn style="margin-left: 37%; margin-bottom: 5%"
               color=#F16063
               outlined
               :disabled="removeButton"
               :loading="loading"
               @click="removeElement"
        >
          <v-icon left>
            {{ icons.mdiDelete }}
          </v-icon>
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
            v-model="StreetToStreetName"
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

      <v-btn style="margin-left: 25%; margin-bottom: 5%"
             color=#F58E43
             outlined
             @click="submit"
      >
        <v-icon style="margin-right: 8px">mdi-cloud-upload</v-icon>
        Сохранить и закрыть
      </v-btn>
    </v-card>
  </v-form>
</template>

<script>
import axios from "axios";
import {mdiDelete} from "@mdi/js";

export default {
  name: "OverlayStreet",

  props: {
    KvartalNameDone: String,
  },
  data: () => ({
    icons: {
      mdiDelete,
    },
    loading: false,

    absolute: true,
    valid: true,
    removeButton: true,

    StreetNameList: '',
    StreetName: '',
    StreetNameOld: '',
    StreetToStreetName: '',
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
          name: this.StreetName,
          oldName: this.StreetNameOld,
          streetList: this.StreetToStreet,
          quarterName: this.KvartalNameDone,
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
        this.StreetToStreetName = ''
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
            this.StreetNameOld = resp.data.name
            this.StreetToStreet = resp.data
          })
    },
    getListOfStreets(KvartalName) {
      let str = "/api/app/street/quarter?name=" + KvartalName
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
    async removeElement() {
      this.loading = true
      let str = "/api/app/street/delete?name=" + this.StreetNameList
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

      await new Promise(resolve => setTimeout(resolve, this.awaitTimer))
      this.loading = false
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