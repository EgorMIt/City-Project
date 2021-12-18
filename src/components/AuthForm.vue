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
                @input="$v.login.$touch()"
                @blur="$v.login.$touch()"
                :error-messages="loginErrors"
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
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                :error-messages="passwordErrors"
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

          <v-row style="margin: auto">
            <v-btn x-large style="box-shadow: none !important; border-radius: 10px" color=#F58E43 width="100%" dark
                   @click="submit()" to="/main">
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
import VueCookies from "vue-cookies";
import axios from "axios";
import router from "../router";
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
    errorText: ''
  }),
  computed: {
    loginErrors() {
      const errors = []
      if (!this.$v.login.$dirty) return errors
      !this.$v.login.required && errors.push('Поле не может быть пустым')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Поле не может быть пустым')
      return errors
    },
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (this.valid) {
        let data = {
          username: this.login,
          password: this.password
        }
        axios.create({
          baseURL: this.hostname
        }).post('/api/auth/signin', data)
            .then(resp => {
              console.log(resp.data.token)
              this.errorFlag = false;
              VueCookies.set('token', resp.data.token ? resp.data.token.toString() : '', "10h")
              router.push({path: '/main'})
            }).catch(err => {
          this.errorFlag = true;
          this.errorText = err.response.data.message
        })
      }
    },
  }

}
</script>

<style scoped>

</style>