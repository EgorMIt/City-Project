<template>
  <v-card class="elevation-0" style="margin-top: 15%; margin-left: 25%">
    <v-row>
      <v-col cols="1  2" md="8">
        <v-card-text class="mt-12">
          <h1
              class="text-center display-2"
              style="color: black; font-weight: bold; margin-bottom: 40px"
          >Создайте аккаунт</h1>


          <v-form
              style="margin-bottom: 20px"
              ref="form"
              lazy-validation>

            <div class="font-center" style="font-size: 14pt; margin-bottom: 5px; text-align: left">
              Имя пользователя
            </div>

            <v-textarea
                label="Введите имя пользователя"
                name="Login"
                type="text"
                color="black"
                auto-grow
                outlined
                rows="1"
                row-height="15"
                style="border-radius: 10px"
            />

            <div class="font-center" style="font-size: 14pt; margin-bottom: 5px; text-align: left">
              E-mail
            </div>

            <v-textarea
                label="Введите e-mail"
                name="Login"
                type="text"
                color="black"
                auto-grow
                outlined
                rows="1"
                row-height="15"
                style="border-radius: 10px"
            />

            <div class="font-center" style="font-size: 14pt; margin-bottom: 5px; text-align: left">
              Пароль
            </div>

            <v-textarea
                id="password"
                label="Введите пароль"
                name="password"
                type="password"
                color="black"
                required
                auto-grow
                outlined
                rows="1"
                row-height="15"
                style="border-radius: 10px"
            />
          </v-form>

          <v-row style="margin: auto">
            <v-btn x-large style="box-shadow: none !important; border-radius: 10px" color=#F58E43 width="100%" dark
                   to="/">
              Зарегистрироваться и вернуться ко входу
            </v-btn>
          </v-row>

        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "RegisterForm"
}
</script>

<style scoped>

</style>