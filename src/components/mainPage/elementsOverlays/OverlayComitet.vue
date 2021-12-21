<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей комитета -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px; line-height: 1">
          <br>Создать или изменить комитет сдачи объектов
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
          Выберете элемент или создайте новый
        </div>
        <v-overflow-btn
            light
            v-model="ComitetNameList"
            :items="Comitets"
            :rules="rules.clearFieldValid"
            name="ComitetNameList"
            color=#F58E43
            required
            editable
            segmented
            v-on:change="updateElements"
        ></v-overflow-btn>

        <div style="margin-top: 10%; margin-bottom: 20px; color: black; font-weight: lighter">
          Заполните необходимые поля
        </div>

        <v-text-field
            light
            label="Строгость принятия объектов (от 0 до 9)"
            v-model="ComitetRigor"
            name="ComitetRigor"
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
        Добавить и закрыть
      </v-btn>
    </v-card>
  </v-form>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "OverlayComitet",


  data: () => ({
    absolute: true,
    valid: true,

    ComitetNameList: '',

    ComitetRigor: '',

    Comitets: ['Добавить новый элемент', 'Comitet 1', 'Comitet 2', 'Comitet 3', 'Comitet 4', 'Comitet 5'],

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
          ComitetRigor: this.ComitetRigor,
        }
        axios.create({
          baseURL: this.hostname
        }).post('/addComitet', data)
            .then(resp => {
              console.log(resp.data.ComitetRigor)
              router.push({path: '/main'})
            })

      }
    },
    updateElements() {
      if (this.ComitetNameList !== this.Comitets[0]) {
        this.ComitetRigor = "1"
      } else if (this.ComitetNameList === this.Comitets[0]) {
        this.ComitetRigor = ''
      }
    },
  },
  beforeMount() {
    this.ComitetNameList = this.Comitets[0]
  },
}
</script>

<style scoped>

</style>