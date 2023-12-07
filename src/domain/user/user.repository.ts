import { Service, Token } from "typedi";
import { UserEntity } from "./user.entity";
import { IRepository } from "../../common/repository.interface";

export const USER_REPOSITORY_TOKEN = new Token('UserRepository');

@Service(USER_REPOSITORY_TOKEN)
export default class UserRepository implements IRepository<UserEntity> {
  private readonly database: { users: { [key: number]: UserEntity } } = { users: {} };

  async getAll(): Promise<UserEntity[]> {
    return Object.values(this.database.users);
  }

  async getOne(id: number): Promise<UserEntity | undefined> {
    return this.database.users[id];
  }

  async add(user: UserEntity): Promise<void> {
    const existingUser = await this.getOne(user.id);
    if (existingUser) {
      return;
    }

    this.database.users[user.id] = user;
  }

  async remove(user: UserEntity): Promise<void> {
    delete this.database.users[user.id];
  }
}
