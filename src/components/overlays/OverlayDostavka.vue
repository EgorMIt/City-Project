<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей доставки -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px">
          <br>Создать новую команду доставки
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">

        <div style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
          Заполните необходимые поля
        </div>

        <v-text-field
            light
            v-model="DostavkaName"
            label="Название"
            name="DostavkaName"
            type="text"
            :rules="rules.clearFieldValid"
            color=#F58E43
            background-color=#EDF2F7
            outlined
            style="border-radius: 10px;"
        />

        <v-text-field
            light
            v-model="DostavkaPrice"
            label="Тариф за доставку"
            name="DostavkaPrice"
            type="number"
            :rules="rules.numberValid"
            color=#F58E43
            background-color=#EDF2F7
            outlined
            style="border-radius: 10px;"
        />

        <v-select
            light
            v-model="DostavkaMaterial"
            :items="Materials"
            :rules="rules.clearFieldValid"
            name="DostavkaMaterial"
            color=#F58E43
            label="Выберете стройматериал"
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
  name: "OverlayBuilding",


  data: () => ({
    absolute: true,
    valid: true,

    DostavkaName: '',
    DostavkaPrice: '',
    DostavkaMaterial: '',

    Materials: ['Material 1', 'Material 2', 'Material 3', 'Material 4', 'Material 5'],

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
          DostavkaName: this.DostavkaName,
          DostavkaPrice: this.DostavkaPrice,
          DostavkaMaterial: this.DostavkaMaterial,
        }
        axios.create({
          baseURL: this.hostname
        }).post('/addDostavka', data)
            .then(resp => {
              console.log(resp.data.DostavkaName)
              router.push({path: '/main'})
            })

      }
    },
  }
}
</script>

<style scoped>

</style>