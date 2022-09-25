import {UserModel} from "./user.model";

export interface UserModelResponse {
  data: UserModel
  message: string,
  token: string,
}
