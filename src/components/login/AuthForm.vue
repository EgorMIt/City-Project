<template>
  <v-card class="elevation-0" style="margin-top: 10%; margin-left: 25%">
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
                :rules="rules.clearFieldValid"
                label="Введите имя пользователя"
                name="Login"
                type="text"
                color="black"
                v-model="login"
                auto-grow
                outlined
                rows="1"
                style="border-radius: 10px"
            />

            <div class="font-center" style="font-size: 14pt; margin-bottom: 10px; text-align: left">
              Пароль
            </div>

            <v-text-field
                :rules="rules.clearFieldValid"
                :append-icon="eyeFlag ? 'mdi-eye' : 'mdi-eye-off'"
                :type="eyeFlag ? 'text' : 'password'"
                hint="Минимум 8 символов"
                @click:append="eyeFlag = !eyeFlag"
                id="password"
                label="Введите пароль"
                color="black"
                v-model="password"
                auto-grow
                outlined
                rows="1"
                style="border-radius: 10px"
            />
          </v-form>


          <v-btn x-large style="box-shadow: none !important; border-radius: 10px; margin-bottom: 20px" color=#F58E43
                 width="100%" dark
                 :loading="loadingLogin"
                 @click="submit()">
            Войти в систему
          </v-btn>

          <v-btn x-large style="box-shadow: none !important; border-radius: 10px" color=#F58E43 width="100%" dark
                 to="/register">
            Зарегистрироваться
          </v-btn>

          <v-alert v-if="error" style="margin-top: 30px"
              colored-border
              type="error" outlined
              elevation="0"
          >
            Неверные данные для входа
          </v-alert>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
//import VueCookies from "vue-cookies";
import axios from "axios";
import router from "../../router";
import {validationMixin} from "vuelidate";
import {required} from "vuelidate/lib/validators";

export default {
  name: "AuthForm",

  mixins: [validationMixin],
  validations: {
    password: {required},
    login: {required},
  },
  data: () => ({
    eyeFlag: false,
    password: '',
    login: '',
    valid: false,
    errorFlag: false,
    errorText: '',
    loadingLogin: false,
    error: false,

    rules: {
      clearFieldValid: [
        v => !!v || 'Поле не может быть пустым'
      ],
    },
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loadingLogin = true
        let data = {
          username: this.login,
          password: this.password
        }
        axios.create({
          baseURL: this.hostname
        }).post('/api/auth/login', data)
            .then(async resp => {
              console.log(resp.data.token)
              localStorage.token = resp.data.token
              localStorage.refreshToken = resp.data.refreshToken
              await new Promise(resolve => setTimeout(resolve, this.awaitTimer))
              await router.push({path: '/main'})
              this.loadingLogin = false
            }).catch(async err => {
          await new Promise(resolve => setTimeout(resolve, 500))
          this.error = true
          this.loadingLogin = false
          console.log(err.response)
          console.log(err.response.data.description)
        })

      }
    },
    oneMoreTime() {
      this.password = ''
      this.login = ''
    },
  }

}
</script>

<style scoped>

</style>