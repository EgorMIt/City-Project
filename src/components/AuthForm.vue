<template>
  <v-card class="elevation-0" style="margin-top: 15%; margin-left: 25%">
    <v-row>
      <v-col cols="1  2" md="8">
        <v-card-text class="mt-12">
          <h1
              class="text-center display-2"
              style="color: black; font-weight: bold"
          >Добро пожаловать!</h1>

          <div class="font-center" style="font-size: 20pt;  margin: 20px 20px 50px;text-align: center">
            Введите данные для входа
          </div>

          <v-form
              style="margin-bottom: 20px"
              ref="form"
              lazy-validation>

            <div class="font-center" style="font-size: 14pt; margin-bottom: 10px; text-align: left">
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
                style="border-radius: 10px"
            />

            <div class="font-center" style="font-size: 14pt; margin-bottom: 10px; text-align: left">
              Пароль
            </div>

            <v-textarea
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show3 ? 'text' : 'password'"
                hint="At least 8 characters"
                @click:append="show3 = !show3"
                id="password"
                label="Введите пароль"
                name="password"
                color="black"
                required
                auto-grow
                outlined
                rows="1"
                style="border-radius: 10px"
            />
          </v-form>

          <v-row style="margin: auto">
            <v-btn x-large style="box-shadow: none !important; border-radius: 10px" color=#F58E43 width="100%" dark to="/main">
              Войти в систему
            </v-btn>
          </v-row>
          <v-row style="margin-top: 20px">
            <v-btn x-large color=#F58E43 width="96.5%"
                   style="margin-left: 11px; box-shadow: none !important; border-radius: 10px" dark to="/register">
              Зарегистрироваться
            </v-btn>
          </v-row>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: "AuthForm",
  el: '#password',
  data() {
    return {
      show3: false,
      password: 'Password',
      rules: {
        required: value => !!value || 'Введите пароль',
        min: v => v.length >= 8 || 'Минимум 8 символов',
      },
    }
  },
}
</script>

<style scoped>

</style>