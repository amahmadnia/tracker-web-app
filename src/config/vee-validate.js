import { defineRule } from 'vee-validate'
import {
  activityDate,
  activityDescription,
  activityEndTime,
  activityStartTime,
  activityTitle,
  eventDate,
  eventDescription,
  eventTitle,
  eventTime,
  title,
  validateDateRange
} from '@/plugins/veeValidate'

export const defineRules = () => {
  defineRule('dateRange', validateDateRange)
  defineRule('title', title)
  defineRule('activityTitle', activityTitle)
  defineRule('activityDescription', activityDescription)
  defineRule('activityStartTime', activityStartTime)
  defineRule('activityEndTime', activityEndTime)
  defineRule('activityDate', activityDate)
  defineRule('eventTitle', eventTitle)
  defineRule('eventDescription', eventDescription)
  defineRule('eventDate', eventDate)
  defineRule('eventTime', eventTime)
}
