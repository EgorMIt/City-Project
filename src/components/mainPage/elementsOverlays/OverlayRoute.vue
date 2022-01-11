<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей маршрута -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px; line-height: 1">
          <br>Управление транспортными маршрутами
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
          Выберете элемент или создайте новый
        </div>
        <v-overflow-btn
            light
            v-model="RouteNameList"
            :items="Routes"
            :rules="rules.clearFieldValid"
            name="RouteNameList"
            color=#F58E43
            required
            editable
            segmented
            v-on:change="updateElements(RouteNameList)"
        ></v-overflow-btn>

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

        <v-overflow-btn
            light
            v-model="RouteKvartalStart"
            :items="Kvartals"
            :rules="rules.clearFieldValid"
            label="Квартал отправления"
            name="RouteKvartalStart"
            color=#F58E43
            required
            editable
            segmented
        ></v-overflow-btn>

        <v-overflow-btn
            light
            v-model="RouteKvartalFinish"
            :items="Kvartals"
            label="Квартал прибытия"
            :rules="rules.clearFieldValid"
            name="RouteKvartalFinish"
            color=#F58E43
            required
            editable
            segmented
        ></v-overflow-btn>

        <v-overflow-btn
            v-model="RouteStreets"
            :items="Streets"
            label="Улицы в маршруте"
            multiple
            clearable
            light
            color=#F58E43
            editable
            segmented
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
  name: "OverlayRoute",

  data: () => ({
    absolute: true,
    valid: true,

    RouteNameList: '',

    RouteType: '',
    RouteKvartalStart: '',
    RouteKvartalFinish: '',
    RouteStreets: [],

    Kvartals: [],
    Streets: [],
    Routes: ['Добавить новый элемент'],

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
        let str = "/api/app/route/save"
        let data2 = {
          dialog: false
        }
        this.$emit('updateParent', {data2})

        let data = {
          RouteType: this.RouteType,
          RouteKvartalStart: this.RouteKvartalStart,
          RouteKvartalFinish: this.RouteKvartalFinish,
          RouteStreets: this.RouteStreets,
        }
        axios.create({
          baseURL: this.hostname
        }).post(str, data)
            .then(resp => {
              console.log(resp.data)
            })

      }
    },
    updateElements(RouteNameList) {
      if (this.RouteNameList !== this.Routes[0]) {
        this.getRouteByType(RouteNameList)
      } else if (this.RouteNameList === this.Routes[0]) {
        this.RouteType = ''
        this.RouteKvartalStart = ''
        this.RouteKvartalFinish = ''
        this.RouteStreets = ''
      }
    },
    getListOfRoutes() {
      let str = "/api/app/route/all"
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            for (let i = 0; i < resp.data.length; i++) {
              this.Routes.push(resp.data[i].id)
            }
          })
    },
    getRouteByType: function (RouteNameList) {
      let str = "/api/app/route/single?type=" + RouteNameList
      axios.create({
        baseURL: this.hostname
      }).get(str)
          .then(resp => {
            console.log(resp.data)
            this.RouteType = resp.data.type
            this.RouteKvartalStart = resp.data
            this.RouteKvartalFinish = resp.data
            this.RouteStreets = resp.data
          })
    },
  },
  beforeMount() {
    this.getListOfRoutes()
    this.RouteNameList = this.Routes[0]
  },
}
</script>

<style scoped>

</style>