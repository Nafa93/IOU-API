var env = process.env.NODE_ENV || 'development'

if ((env.trim() === 'development' || env.trim() === 'test') && !process.env.TRAVIS) {
  var config = require('./config.json')
  var envConfig = config[env.trim()]

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key]
  })
}
