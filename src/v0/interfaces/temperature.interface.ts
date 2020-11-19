// Third party modules
import { Document } from 'mongoose'

export interface TemperatureInterface extends Document {
  date: string,
  max: number,
  min: number,
  units: string,
  value: number
}
