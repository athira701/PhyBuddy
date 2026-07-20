export interface IBaseRepository<T> {
  create(data: T): Promise<string>;

  findById(id: string): Promise<T | null>;

  update(data: Partial<T>, id: string): Promise<T | null>;

  deleteById(id: string): Promise<T | null>;
}

