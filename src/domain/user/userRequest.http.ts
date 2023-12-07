import { Type } from "class-transformer";

export class UserRequest {
  @Type(() => Number)
  id!: number;
}
