<template>
  <v-card class="elevation-0" style="margin-top: 15%; margin-left: 25%">
    <v-row>
      <v-col cols="1  2" md="8">
        <v-card-text class="mt-12">
          <h1
              class="text-center display-2"
              style="color: dodgerblue"
          >TeamSearch</h1>
          <v-form
              ref="form"
              lazy-validation>

            <v-text-field
                label="Email"
                name="Email"
                type="text"
                color=""
            />

            <v-text-field
                id="password"
                label="Password"
                name="password"
                type="password"
                color="blue"
                required
            />
          </v-form>
        </v-card-text>
        <v-row style="margin: auto">
          <v-btn color="blue" width="35%" dark>
            Войти в систему
          </v-btn>
        </v-row>
        <v-row style="margin-top: 20px">
          <v-btn color="blue" width="35%" style="margin-left: 10%" dark to="/registration">
            ЗАРЕГЕСТРИРОВАТЬСЯ
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "AuthForm"
}
</script>

<style scoped>

</style>