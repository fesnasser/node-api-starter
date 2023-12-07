import { Type } from "class-transformer";

export class UserResponse {
  @Type(() => Number)
  id!: number;
}
