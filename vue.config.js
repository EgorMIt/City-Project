module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
      ? 'https://se.ifmo.ru/~s284731/CourseWork'
      : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
