import {UserModel} from './userModel'

export interface MessageModelDto {
  _id: string
  content: string
  receiver: UserModel
  sender: UserModel
  date_updated: Date
  date_created: Date
}
