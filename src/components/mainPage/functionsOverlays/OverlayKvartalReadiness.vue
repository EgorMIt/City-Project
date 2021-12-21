<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей готовности квартала -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px; line-height: 1">
          <br>Готовность одного квартала
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">

        <v-overflow-btn
            v-model="ChooseKvartal"
            light
            :items="Kvartals"
            name="ChooseKvartal"
            color=#F58E43
            label="Выберете квартал"
            editable
            segmented
            required
        ></v-overflow-btn>

        <v-text-field
            light
            label="Квартал готов на:"
            :value=this.KvartalReadiness
            name="CityReadiness"
            readonly
            color=#F58E43
            background-color=#EDF2F7
            outlined
            style="border-radius: 10px;"
        />
      </v-card-text>

      <v-btn style="margin-left: 38%; margin-bottom: 5%"
             color=#F58E43
             outlined
             @click="doSomething"
      >
        Закрыть
      </v-btn>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: "OverlayKvartalReadiness",

  data: () => ({
    absolute: true,
    valid: true,

    KvartalReadiness: 0,
    ChooseKvartal: '',

    Kvartals: ['Kvartal 1', 'Kvartal 2', 'Kvartal 3', 'Kvartal 4', 'Kvartal 5'],

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

    updateBuildings() {

    },

  },
  beforeMount() {
    this.KvartalReadiness = this.KvartalReadiness + "%"
  },
}
</script>

<style scoped>

</style>