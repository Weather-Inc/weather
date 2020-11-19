// Third party modules
import { Router } from 'express'

// Controllers
import { getToken, getDefaultWeatherData, getWeatherDataForDate, getWeatherDataForRange } from '../controllers/index.controller'

// Private variables
const router: Router = Router()

// Request access token
router.get('/auth', getToken)

// Retrieve weather data by geolocation
router.post('/', getDefaultWeatherData)

// Retrieve weather data by geolocation for specific date
router.post('/single-date', getWeatherDataForDate)

// Retrieve weather data by geolocation for date range
router.post('/date-range', getWeatherDataForRange)

export default router
