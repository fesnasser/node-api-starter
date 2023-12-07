export interface IRepository<T> {
  getAll(): Promise<T[]>;
  getOne(id: number): Promise<T | undefined>;
  add(entity: T): Promise<void>;
  remove(entity: T): Promise<void>;
}
