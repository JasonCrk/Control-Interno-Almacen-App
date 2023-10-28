import type {
  UserAvatar,
  UserFirstName,
  UserId,
  UserLastName,
  UserRole,
} from "./user.model"

export interface UserAuth {
  id: UserId
  avatar: UserAvatar
  firstName: UserFirstName
  lastName: UserLastName
  role: UserRole
}
