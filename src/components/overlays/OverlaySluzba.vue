<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей службы -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px">
          <br>Создать новую городскую службу
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">

        <div style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
          Заполните необходимые поля
        </div>

        <v-text-field
            light
            v-model="SluzbaType"
            label="Тип службы"
            name="SluzbaType"
            type="text"
            :rules="rules.clearFieldValid"
            color=#F58E43
            background-color=#EDF2F7
            outlined
            style="border-radius: 10px;"
        />

        <v-text-field
            light
            v-model="SluzbaPrice"
            label="Цена"
            name="SluzbaPrice"
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
  name: "OverlaySluzba",


  data: () => ({
    absolute: true,
    valid: true,

    SluzbaType: '',
    SluzbaPrice: '',

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
          SluzbaType: this.SluzbaType,
          SluzbaPrice: this.SluzbaPrice,
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
  }
}
</script>

<style scoped>

</style>