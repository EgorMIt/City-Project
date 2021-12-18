<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей квартала -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px">
          <br>Создать новый квартал
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">

        <div style="margin-top: 5px; margin-bottom: 20px; color: black; font-weight: lighter">
          Заполните необходимые поля
        </div>

        <v-text-field
            light
            v-model="KvartalName"
            label="Название квартала"
            name="KvartalName"
            type="text"
            :rules="rules.clearFieldValid"
            color=#F58E43
            background-color=#EDF2F7
            outlined
            style="border-radius: 10px;"
        />
        <v-select
            v-model="KvartalToKvartal"
            :items="Kvartals"
            label="Соседние кварталы"
            multiple
            color=#F58E43
            clearable
            light
        >
          <template v-slot:selection="{ item, index }">

            <span v-if="index === 0">{{ item }}</span>
            <span
                v-if="index === 1"
                class="grey--text text-caption"
            >
                  (+{{ KvartalToKvartal.length - 1 }} others)
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
  name: "OverlayBuilding",

  props: {
    indexInArray: Number,
  },
  data: () => ({
    absolute: true,
    valid: true,

    KvartalName: '',
    KvartalToKvartal: [],

    Kvartals: ['Kvartal 1', 'Kvartal 2', 'Kvartal 3', 'Kvartal 4', 'Kvartal 5'],

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
          KvartalName: this.KvartalName,
          KvartalToKvartal: this.KvartalToKvartal,
          indexInArray: this.indexInArray,
        }
        axios.create({
          baseURL: this.hostname
        }).post('/addKvartal', data)
            .then(resp => {
              console.log(resp.data.KvartalName)
              router.push({path: '/main'})
            })

      }
    },
  }
}
</script>

<style scoped>

</style>