<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей бригады -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px">
          <br>Создать новую строительную бригаду
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">

        <div style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
          Заполните необходимые поля
        </div>

        <v-text-field
            light
            label="Количество людей в бригаде"
            name="BrigadaPeople"
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
  name: "OverlayBrigada",


  data: () => ({
    absolute: true,
    valid: true,

    BrigadaPeople: '',

    rules: {
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
          BrigadaPeople: this.BrigadaPeople,
        }
        axios.create({
          baseURL: this.hostname
        }).post('/addBrigada', data)
            .then(resp => {
              console.log(resp.data.BrigadaPeople)
              router.push({path: '/main'})
            })

      }
    },
  }
}
</script>

<style scoped>

</style>