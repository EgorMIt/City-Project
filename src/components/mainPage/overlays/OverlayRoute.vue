<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей маршрута -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px; line-height: 1">
          <br>Создать или изменить транспортный маршрут
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
          Выберете элемент или создайте новый
        </div>
        <v-select
            light
            v-model="RouteNameList"
            :items="Routes"
            :rules="rules.clearFieldValid"
            name="RouteNameList"
            color=#F58E43
            required
            v-on:change="updateElements"
        ></v-select>

        <div style="margin-top: 10%; margin-bottom: 20px; color: black; font-weight: lighter">
          Заполните необходимые поля
        </div>

        <v-text-field
            light
            v-model="RouteType"
            label="Тип транпорта"
            name="SluzbaType"
            type="text"
            :rules="rules.clearFieldValid"
            color=#F58E43
            background-color=#EDF2F7
            outlined
            style="border-radius: 10px;"
        />

        <v-select
            light
            v-model="RouteKvartalStart"
            :items="Kvartals"
            :rules="rules.clearFieldValid"
            label="Квартал отправления"
            name="RouteKvartalStart"
            color=#F58E43
            required
        ></v-select>

        <v-select
            light
            v-model="RouteKvartalFinish"
            :items="Kvartals"
            label="Квартал прибытия"
            :rules="rules.clearFieldValid"
            name="RouteKvartalFinish"
            color=#F58E43
            required
        ></v-select>

        <v-select
            v-model="RouteStreets"
            :items="Streets"
            label="Улицы в маршруте"
            multiple
            clearable
            light
            color=#F58E43
        >
          <template v-slot:selection="{ item, index }">

            <span v-if="index === 0">{{ item }}</span>
            <span
                v-if="index === 1"
                class="grey--text text-caption"
            >
                  (+{{ RouteStreets.length - 1 }} others)
                </span>
          </template>
        </v-select>
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
  name: "OverlayRoute",

  data: () => ({
    absolute: true,
    valid: true,

    RouteNameList:'',

    RouteType: '',
    RouteKvartalStart: '',
    RouteKvartalFinish: '',
    RouteStreets: [],

    Kvartals: ['Kvartal 1', 'Kvartal 2', 'Kvartal 3', 'Kvartal 4', 'Kvartal 5'],
    Streets: ['Street 1', 'Street 2', 'Street 3', 'Street 4', 'Street 5'],
    Routes: ['Добавить новый элемент', 'Route 1', 'Route 2', 'Route 3', 'Route 4', 'Route 5'],

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
        console.log("123213123")
        let data = {
          RouteType: this.RouteType,
          RouteKvartalStart: this.RouteKvartalStart,
          RouteKvartalFinish: this.RouteKvartalFinish,
          RouteStreets: this.RouteStreets,
        }
        axios.create({
          baseURL: this.hostname
        }).post('/addSluzba', data)
            .then(resp => {
              console.log(resp.data.SluzbaType)
              router.push({path: '/main'})
            })

      }
    },
    updateElements() {
      if (this.RouteNameList !== this.Routes[0]) {
        this.RouteType = "Текст"
        this.RouteKvartalStart = this.Kvartals[0]
        this.RouteKvartalFinish = this.Kvartals[1]
      } else if (this.RouteNameList === this.Routes[0]) {
        this.RouteType = ''
        this.RouteKvartalStart = ''
        this.RouteKvartalFinish = ''
        this.RouteStreets = ''
      }
    },
  },
  beforeMount() {
    this.RouteNameList = this.Routes[0]
  },
}
</script>

<style scoped>

</style>