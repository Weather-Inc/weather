import * as dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = 'mongodb://localhost:27017/abundeseg?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const AWHERE_URL = 'https://api.awhere.com'

const config = {
  dev: {
    awhere_basic_token: process.env.AWHERE_BASIC_TOKEN,
    awhere_url: AWHERE_URL,
    mongodb_uri: MONGODB_URI
  },

  prod: {
    awhere_basic_token: process.env.AWHERE_BASIC_TOKEN,
    awhere_url: AWHERE_URL,
    mongodb_uri: process.env.MONGODB_URI || MONGODB_URI
  }
}

export default config
