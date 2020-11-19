// Third party modules
import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import qs from 'qs'

// Private modules
import config from '../../config/config'

// Models
import Temperature from '../models/Temperature'

// Interfaces
import { TemperatureInterface } from '../interfaces/temperature.interface'

// Private variables
const c = process.env.production ? config.prod : config.dev
const aWhereBasicToken = c.awhere_basic_token
const aWhereUrl = c.awhere_url

// Request an access token
export const getToken = async (req: Request, res: Response) => {
  try {
    const axiosConfig = {
      headers: {
        Authorization: `Basic ${aWhereBasicToken}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const reqBody = {
      grant_type: 'client_credentials'
    }

    const response: AxiosResponse = await axios.post(
      `${aWhereUrl}/oauth/token`,
      qs.stringify(reqBody),
      axiosConfig
    )

    return res.send(response.data)
  } catch (error: any) {
    const errorCode = error?.response?.status || 500

    return res.status(errorCode).send(error)
  }
}

// Retrieve weather data by geolocation
export const getDefaultWeatherData = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, offset, limit, bearer_token } = req.body
    let url = `${aWhereUrl}/v2/weather/locations/${latitude},${longitude}/forecasts`

    if (offset !== null && offset !== "" && limit !== null && limit !== "") {
      url += `?offset=${offset}&limit=${limit}`
    }

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
        'Content-Type': 'application/json'
      }
    }

    const response: AxiosResponse = await axios.get(url, axiosConfig)

    response.data.forecasts.forEach((forecast: any) => {
      const date = forecast.date

      forecast.forecast.forEach((f: any) => {
        const { max, min, units, value } = f.temperatures

        const temperature: TemperatureInterface = new Temperature({
          date,
          max,
          min,
          units,
          value
        })

        temperature.save()
      })
    })

    return res.send(response.data)
  } catch (error: any) {
    const errorCode = error?.response?.status || 500

    return res.status(errorCode).send(error)
  }
}

// Retrieve weather data by geolocation for specific date
export const getWeatherDataForDate = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, date, offset, limit, bearer_token } = req.body
    let url = `${aWhereUrl}/v2/weather/locations/${latitude},${longitude}/forecasts/${date}`

    if (offset !== null && offset !== "" && limit !== null && limit !== "") {
      url += `?offset=${offset}&limit=${limit}`
    }

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
        'Content-Type': 'application/json'
      }
    }

    const response: AxiosResponse = await axios.get(url, axiosConfig)

    const forecast = response.data

    const singleDate = forecast.date

    forecast.forecast.forEach((f: any) => {
      const { max, min, units, value } = f.temperatures

      const temperature: TemperatureInterface = new Temperature({
        date: singleDate,
        max,
        min,
        units,
        value
      })

      temperature.save()
    })

    return res.send(response.data)
  } catch (error: any) {
    const errorCode = error?.response?.status || 500

    return res.status(errorCode).send(error)
  }
}

// Retrieve weather data by geolocation for date range
export const getWeatherDataForRange = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, start_date, end_date, offset, limit, bearer_token } = req.body
    let url = `${aWhereUrl}/v2/weather/locations/${latitude},${longitude}/forecasts/${start_date},${end_date}`

    if (offset !== null && offset !== "" && limit !== null && limit !== "") {
      url += `?offset=${offset}&limit=${limit}`
    }

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${bearer_token}`,
        'Content-Type': 'application/json'
      }
    }

    const response: AxiosResponse = await axios.get(url, axiosConfig)

    response.data.forecasts.forEach((forecast: any) => {
      const date = forecast.date

      forecast.forecast.forEach((f: any) => {
        const { max, min, units, value } = f.temperatures

        const temperature: TemperatureInterface = new Temperature({
          date,
          max,
          min,
          units,
          value
        })

        temperature.save()
      })
    })

    return res.send(response.data)
  } catch (error: any) {
    const errorCode = error?.response?.status || 500

    return res.status(errorCode).send(error)
  }
}
