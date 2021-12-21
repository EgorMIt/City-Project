<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей принятия завершенных объектов -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px; line-height: 1">
          <br>Выбранный комитет принимает все завершенные здания
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <v-overflow-btn
            v-model="ChooseComitetForBuilding"
            light
            :items="Comitets"
            name="ChooseComitetForBuilding"
            color=#F58E43
            label="Выберете квартал"
            editable
            segmented
            required
        ></v-overflow-btn>

        <v-btn style="margin-left: 26%; margin-bottom: 5%"
               color=#F58E43
               outlined
        >
          Принять все здания
        </v-btn>

        <v-divider style="margin-bottom: 30px"></v-divider>

        <v-text-field
            light
            label="Зданий завершено:"
            :value=this.BuildingsFinished
            name="BuildingsFinished"
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
  name: "OverlayFinishBuilding",

  data: () => ({
    absolute: true,
    valid: true,

    ChooseComitetForBuilding: '',

    BuildingsFinished: 0,

    Comitets: ['Comitet 1', 'Comitet 2', 'Comitet 3', 'Comitet 4', 'Comitet 5'],

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

  },
}
</script>

<style scoped>

</style>