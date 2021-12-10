<template>
  <div>
    <v-card
        class="mx-0"
        height="100%"
        width="250px"
    >
      <v-navigation-drawer
          class=EDF2F7
          permanent
      >
        <div
            style="margin-top: 20%; color: black; font-size: 30px; font-weight: bold; text-align: center">
          City Project
        </div>

        <div style="margin-top: 50%; margin-left: 40px; margin-right: 20px">
          <div
              style="margin-top: 20%; color: black; font-size: 20px; text-align: left;  margin-bottom: 10px">
            Создание объектов
          </div>

          <v-btn @click="overlayBuilding = !overlayBuilding"
                 style="border-radius: 10px; margin-bottom: 20px; color: #A0AEC0"
                 outlined>
            Здание
          </v-btn>
          <v-btn @click="overlayKvartal = !overlayKvartal"
                 style="border-radius: 10px; margin-bottom: 20px; color: #A0AEC0" outlined>
            Квартал
          </v-btn>
          <v-btn @click="overlayStreet = !overlayStreet" style="border-radius: 10px; margin-bottom: 20px; color: #A0AEC0" outlined>
            Улица
          </v-btn>
          <v-btn @click="overlayBrigada = !overlayBrigada" style="border-radius: 10px; margin-bottom: 20px; color: #A0AEC0" outlined>
            Бригада
          </v-btn>
          <v-btn @click="overlayDostavka = !overlayDostavka" style="border-radius: 10px; margin-bottom: 20px; color: #A0AEC0" outlined>
            Команда доставки
          </v-btn>
          <v-btn @click="overlaySluzba = !overlaySluzba" style="border-radius: 10px; margin-bottom: 20px; color: #A0AEC0" outlined>
            Городская служба
          </v-btn>
          <v-btn @click="overlayObsluga = !overlayObsluga" style="border-radius: 10px; margin-bottom: 20px; color: #A0AEC0" outlined>
            Обслуж. команда
          </v-btn>
        </div>
        <template v-slot:append>
          <v-row style="margin: auto">
            <v-btn small block dark to="/" color=#F58E43
                   style="border-radius: 10px; box-shadow: none !important; margin-left: 5px; margin-bottom: 20px">
              Выйти
            </v-btn>
          </v-row>

        </template>
      </v-navigation-drawer>
    </v-card>

    <!-- Оверлей здания -->
    <v-overlay
        :absolute="absolute"
        :value="overlayBuilding"
    >
      <v-card
          height="700px"
          width="500px"
          style="background-color: #F7FAFC"
      >
        <v-card-text class="font-weight-medium" style="font-size: 20pt; ">

          <div style="margin-top: 5%; color: black; text-align: center">
            Создать новое здание
          </div>
        </v-card-text>

        <v-card-text class="font-weight-medium" style="font-size: 15pt; ">

          <div style="margin-top: 5px; margin-left: 5%; margin-bottom: 15px; color: black; font-weight: lighter">
            Заполните необходимые поля
          </div>

          <v-text-field
              label="Название здания"
              name="BuildingName"
              type="text"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />
          <v-text-field
              label="Тип"
              name="BuildingType"
              type="text"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />
          <v-text-field
              label="Этажность"
              name="BuildingFloors"
              type="number"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />

          <v-select
              :items="Streets"
              :rules="rules.building"
              name="BuildingStreet"
              color=#F58E43
              label="Выберете улицу"
              required
          ></v-select>

          <v-select
              :items="Comitets"
              :rules="rules.building"
              name="BuildingKomitet"
              color=#F58E43
              label="Выберете комитет"
              required
          ></v-select>

          <v-select
              :items="Brigada"
              :rules="rules.building"
              color=#F58E43
              name="BuildingBrigada"
              label="Выберете бригаду"
              required
          ></v-select>

        </v-card-text>

        <v-btn style="margin-left: 28%; position: absolute; bottom: 5%"
               color=#F58E43
               outlined
               @click="overlayBuilding = false"
        >
          Добавить и закрыть
        </v-btn>
      </v-card>
    </v-overlay>

    <!-- Оверлей квартала -->
    <v-overlay
        :absolute="absolute"
        :value="overlayKvartal"
    >
      <v-card
          height="400px"
          width="500px"
          style="background-color: #F7FAFC"
      >
        <v-card-text class="font-weight-medium" style="font-size: 20pt; ">

          <div style="margin-top: 5%; color: black; text-align: center">
            Создать новый квартал
          </div>
        </v-card-text>

        <v-card-text class="font-weight-medium" style="font-size: 15pt; ">

          <div style="margin-top: 5px; margin-left: 5%; margin-bottom: 15px; color: black; font-weight: lighter">
            Заполните необходимые поля
          </div>

          <v-text-field
              label="Название квартала"
              name="KvartalName"
              type="text"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />
          <v-text-field
              label="Соседние кварталы"
              name="KvartalToKvartal"
              type="text"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />

        </v-card-text>

        <v-btn style="margin-left: 28%; position: absolute; bottom: 5%"
               color=#F58E43
               outlined
               @click="overlayKvartal = false"
        >
          Добавить и закрыть
        </v-btn>
      </v-card>
    </v-overlay>

    <!-- Оверлей улицы -->
    <v-overlay
        :absolute="absolute"
        :value="overlayStreet"
    >
      <v-card
          height="400px"
          width="500px"
          style="background-color: #F7FAFC"
      >
        <v-card-text class="font-weight-medium" style="font-size: 20pt; ">

          <div style="margin-top: 5%; color: black; text-align: center">
            Создать новую улицу
          </div>
        </v-card-text>

        <v-card-text class="font-weight-medium" style="font-size: 15pt; ">

          <div style="margin-top: 5px; margin-left: 5%; margin-bottom: 15px; color: black; font-weight: lighter">
            Заполните необходимые поля
          </div>

          <v-text-field
              label="Название улицы"
              name="StreetName"
              type="text"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />
          <v-text-field
              label="Пересекаемые улицы"
              name="StreetToStreet"
              type="text"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />

        </v-card-text>

        <v-btn style="margin-left: 28%; position: absolute; bottom: 5%"
               color=#F58E43
               outlined
               @click="overlayStreet = false"
        >
          Добавить и закрыть
        </v-btn>
      </v-card>
    </v-overlay>

    <!-- Оверлей бригады -->
    <v-overlay
        :absolute="absolute"
        :value="overlayBrigada"
    >
      <v-card
          height="400px"
          width="500px"
          style="background-color: #F7FAFC"
      >
        <v-card-text class="font-weight-medium" style="font-size: 20pt; ">

          <div style="margin-top: 5%; color: black; text-align: center">
            Создать новую строительную бригаду
          </div>
        </v-card-text>

        <v-card-text class="font-weight-medium" style="font-size: 15pt; ">

          <div style="margin-top: 5px; margin-left: 5%; margin-bottom: 15px; color: black; font-weight: lighter">
            Заполните необходимые поля
          </div>

          <v-text-field
              label="Количество людей в бригаде"
              name="BrigadaPeople"
              type="number"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />

        </v-card-text>

        <v-btn style="margin-left: 28%; position: absolute; bottom: 5%"
               color=#F58E43
               outlined
               @click="overlayBrigada = false"
        >
          Добавить и закрыть
        </v-btn>
      </v-card>
    </v-overlay>

    <!-- Оверлей доставки -->
    <v-overlay
        :absolute="absolute"
        :value="overlayDostavka"
    >
      <v-card
          height="500px"
          width="500px"
          style="background-color: #F7FAFC"
      >
        <v-card-text class="font-weight-medium" style="font-size: 20pt; ">

          <div style="margin-top: 5%; color: black; text-align: center">
            Создать новую команду доставки
          </div>
        </v-card-text>

        <v-card-text class="font-weight-medium" style="font-size: 15pt; ">

          <div style="margin-top: 5px; margin-left: 5%; margin-bottom: 15px; color: black; font-weight: lighter">
            Заполните необходимые поля
          </div>
          <v-text-field
              label="Название"
              name="DostavkaName"
              type="text"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />

          <v-text-field
              label="Тариф за доставку"
              name="DostavkaPrice"
              type="number"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />

          <v-select
              :items="Materials"
              :rules="rules.building"
              name="DostavkaMaterial"
              color=#F58E43
              label="Выберете стройматериал"
              required
          ></v-select>
        </v-card-text>

        <v-btn style="margin-left: 28%; position: absolute; bottom: 5%"
               color=#F58E43
               outlined
               @click="overlayDostavka = false"
        >
          Добавить и закрыть
        </v-btn>
      </v-card>
    </v-overlay>

    <!-- Оверлей службы -->
    <v-overlay
        :absolute="absolute"
        :value="overlaySluzba"
    >
      <v-card
          height="400px"
          width="500px"
          style="background-color: #F7FAFC"
      >
        <v-card-text class="font-weight-medium" style="font-size: 20pt; ">

          <div style="margin-top: 5%; color: black; text-align: center">
            Создать новую городскую службу
          </div>
        </v-card-text>

        <v-card-text class="font-weight-medium" style="font-size: 15pt; ">

          <div style="margin-top: 5px; margin-left: 5%; margin-bottom: 15px; color: black; font-weight: lighter">
            Заполните необходимые поля
          </div>
          <v-text-field
              label="Тип службы"
              name="SvluzbaType"
              type="text"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />

          <v-text-field
              label="Цена"
              name="SvluzbaPrice"
              type="number"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />
        </v-card-text>

        <v-btn style="margin-left: 28%; position: absolute; bottom: 5%"
               color=#F58E43
               outlined
               @click="overlaySluzba = false"
        >
          Добавить и закрыть
        </v-btn>
      </v-card>
    </v-overlay>

    <!-- Оверлей обслуживающей команды -->
    <v-overlay
        :absolute="absolute"
        :value="overlayObsluga"
    >
      <v-card
          height="500px"
          width="500px"
          style="background-color: #F7FAFC"
      >
        <v-card-text class="font-weight-medium" style="font-size: 20pt; ">

          <div style="margin-top: 5%; color: black; text-align: center">
            Создать новую обслуживающую команду
          </div>
        </v-card-text>

        <v-card-text class="font-weight-medium" style="font-size: 15pt; ">

          <div style="margin-top: 5px; margin-left: 5%; margin-bottom: 15px; color: black; font-weight: lighter">
            Заполните необходимые поля
          </div>
          <v-text-field
              label="Тариф за обслуживание"
              name="ObslugaPrice"
              type="text"
              color=#F58E43
              background-color=#EDF2F7
              outlined
              style="border-radius: 10px;"
          />

          <v-select
              :items="Kvartals"
              :rules="rules.building"
              name="ObslugaKvartal"
              color=#F58E43
              label="Выберете квартал"
              required
          ></v-select>

          <v-select
              :items="Sluzba"
              :rules="rules.building"
              name="ObslugaSluzba"
              color=#F58E43
              label="Выберете городскую службу"
              required
          ></v-select>
        </v-card-text>

        <v-btn style="margin-left: 28%; position: absolute; bottom: 5%"
               color=#F58E43
               outlined
               @click="overlayObsluga = false"
               @keydown.esc="overlayObsluga = false"
        >
          Добавить и закрыть
        </v-btn>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>

export default {
  name: "LeftNavigationBar",
  data: () => ({
    absolute: true,
    overlayBuilding: false,
    overlayKvartal: false,
    overlayStreet: false,
    overlayBrigada: false,
    overlayDostavka: false,
    overlaySluzba: false,
    overlayObsluga: false,

    rules: {
      building: [val => (val || '').length > 0 || 'Это поле обязательно'],
    },
    Streets: ['Street 1', 'Street 2', 'Street 3', 'Street 4', 'Street 5'],
    Comitets: ['Comitet 1', 'Comitet 2', 'Comitet 3', 'Comitet 4', 'Comitet 5'],
    Brigada: ['Brigada 1', 'Brigada 2', 'Brigada 3', 'Brigada 4', 'Brigada 5'],
    Materials: ['Material 1', 'Material 2', 'Material 3', 'Material 4', 'Material 5'],
    Kvartals: ['Kvartal 1', 'Kvartal 2', 'Kvartal 3', 'Kvartal 4', 'Kvartal 5'],
    Sluzba: ['Sluzba 1', 'Sluzba 2', 'Sluzba 3', 'Sluzba 4', 'Sluzba 5'],
  }),

}
</script>

<style scoped>

</style>