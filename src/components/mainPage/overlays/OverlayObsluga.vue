<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей обслуживающей команды -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px; line-height: 1">
          <br>Создать или изменить обслуживающую команду
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
          Выберете элемент или создайте новый
        </div>
        <v-select
            light
            v-model="ObslugaNameList"
            :items="Obsluga"
            :rules="rules.clearFieldValid"
            name="ObslugaName"
            color=#F58E43
            required
            v-on:change="updateElements"
        ></v-select>

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

        <v-select
            light
            v-model="ObslugaKvartal"
            :items="Kvartals"
            :rules="rules.clearFieldValid"
            name="ObslugaKvartal"
            color=#F58E43
            label="Выберете квартал"
            required
        ></v-select>

        <v-select
            light
            v-model="ObslugaSluzba"
            :items="Sluzba"
            :rules="rules.clearFieldValid"
            name="ObslugaSluzba"
            color=#F58E43
            label="Выберете городскую службу"
            required
        ></v-select>
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
  name: "OverlayObsluga",

  data: () => ({
    absolute: true,
    valid: true,

    ObslugaNameList: '',

    ObslugaPrice: '',
    ObslugaKvartal: '',
    ObslugaSluzba: '',

    Obsluga: ['Добавить новый элемент', 'Obsluga 1', 'Obsluga 2', 'Obsluga 3', 'Obsluga 4', 'Obsluga 5'],
    Kvartals: ['Kvartal 1', 'Kvartal 2', 'Kvartal 3', 'Kvartal 4', 'Kvartal 5'],
    Sluzba: ['Sluzba 1', 'Sluzba 2', 'Sluzba 3', 'Sluzba 4', 'Sluzba 5'],

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
        console.log("123213123")
        let data = {
          ObslugaPrice: this.ObslugaPrice,
          ObslugaKvartal: this.ObslugaKvartal,
          ObslugaSluzba: this.ObslugaSluzba,
        }
        axios.create({
          baseURL: this.hostname
        }).post('/addDostavka', data)
            .then(resp => {
              console.log(resp.data.ObslugaPrice)
              router.push({path: '/main'})
            })

      }
    },
    updateElements() {
      if (this.ObslugaNameList !== this.Obsluga[0]) {
        this.ObslugaPrice = "123"
        this.ObslugaKvartal = this.Kvartals[0]
        this.ObslugaSluzba = this.Sluzba[0]
      } else if (this.ObslugaNameList === this.Obsluga[0]) {
        this.ObslugaPrice = ''
        this.ObslugaKvartal = ''
        this.ObslugaSluzba = ''
      }
    },
  },
  beforeMount() {
    this.ObslugaNameList = this.Obsluga[0]
  },
}
</script>

<style scoped>

</style>