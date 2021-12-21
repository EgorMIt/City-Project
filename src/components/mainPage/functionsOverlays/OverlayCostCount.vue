<template>
  <v-form v-model="valid" lazy-validation ref="form">
    <!-- Оверлей для подсчета цены здания -->
    <v-card
        color="#F7FAFC"
    >
      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <div style="color: black; text-align: center; margin-bottom: 5%; font-size: 25px; line-height: 1">
          <br>Посчитать стоимость материалов и подключения служб для здания
        </div>
      </v-card-text>

      <v-card-text class="font-weight-medium" style="font-size: 15pt; ">
        <v-overflow-btn
            v-model="ChooseKvartalForBuilding"
            light
            :items="Kvartals"
            name="ChooseKvartalForBuilding"
            color=#F58E43
            label="Выберете квартал"
            editable
            segmented
            required
        ></v-overflow-btn>

        <v-overflow-btn
            v-model="ChooseStreetForBuilding"
            light
            :items="Streets"
            name="ChooseStreetForBuilding"
            color=#F58E43
            label="Выберете улицу"
            editable
            segmented
            required
        ></v-overflow-btn>

        <v-overflow-btn
            v-model="ChooseBuilding"
            light
            :items="Streets"
            name="ChooseBuilding"
            color=#F58E43
            label="Выберете здание"
            required
            editable
            segmented
        ></v-overflow-btn>

        <v-divider style="margin-bottom: 30px"></v-divider>

        <v-text-field
            light
            label="Итоговая стоимость"
            :value=this.FinalCost
            name="FinalCost"
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
  name: "OverlayCostCount",

  data: () => ({
    absolute: true,
    valid: true,

    ChooseKvartalForBuilding: '',
    ChooseStreetForBuilding: '',
    ChooseBuilding: '',

    FinalCost: '',

    Kvartals: ['Kvartal 1', 'Kvartal 2', 'Kvartal 3', 'Kvartal 4', 'Kvartal 5'],
    Streets: ['Street 1', 'Street 2', 'Street 3', 'Street 4', 'Street 5'],
    Buildings: ['Building 1', 'Building 2', 'Building 3', 'Building 4', 'Building 5'],

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

    updateStreets() {

    },
    updateBuildings() {

    },
    getFinalCost() {

    },
  },
  beforeMount() {

  },
}
</script>

<style scoped>

</style>