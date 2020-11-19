// Third party modules
import mongoose, { Schema } from 'mongoose'

// Temperature interface
import { TemperatureInterface } from '../interfaces/temperature.interface'

// Temperature schema
const TemperatureSchema: Schema = new Schema(
  {
    date: {
      type: String
    },
    max: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    units: {
      type: String,
      default: 'C'
    },
    value: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

export default mongoose.model<TemperatureInterface>(
  'Temperature',
  TemperatureSchema
)
