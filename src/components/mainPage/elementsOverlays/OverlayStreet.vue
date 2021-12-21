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
import router from "@/router";

export default {
  name: "OverlayStreet",

  props: {
    KvartalNameDone: String,
  },
  data: () => ({
    absolute: true,
    valid: true,

    StreetName: '',
    StreetToStreet: [],
    StreetKvartal: '',

    Streets: ['Street 1', 'Street 2', 'Street 3', 'Street 4', 'Street 5'],

    rules: {
      clearFieldValid: [
        v => !!v || 'Поле не может быть пустым'
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
          StreetName: this.StreetName,
          StreetToStreet: this.StreetToStreet,
          StreetKvartal: this.StreetKvartal,
        }
        axios.create({
          baseURL: this.hostname
        }).post('/addStreet', data)
            .then(resp => {
              console.log(resp.data.StreetName)
              router.push({path: '/main'})
            })

      }
    },
  }
}
</script>

<style scoped>

</style>