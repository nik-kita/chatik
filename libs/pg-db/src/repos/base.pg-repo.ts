import { FindOptionsWhere, Repository } from 'typeorm';

// TODO replace 'object' with concrete type for app entities
export abstract class PgRepo<
  E extends object, 
  PK extends keyof E,
  InsertE extends Partial<Omit<E, PK>> = Partial<Omit<E, PK>>,
> {
  protected constructor(
    protected repo: Repository<E>,
    protected pk: PK,
  ) { }

  insert(data: InsertE | InsertE[]) {
    console.log(data);
    // TODO rm any!
    return this.repo.insert(data as any); // TODO return { [PK]: string } res
  }

  getByPK<S extends (keyof E)[]>(pk: Pick<E, PK>, select?: S) {
    return this.repo.findOne({
      where: pk as FindOptionsWhere<E>,
      select,
    });
  }

  get<
    W extends FindOptionsWhere<E>,
    S extends (keyof E)[] = [typeof this.pk],
  >(
    where: W,
    options: {
      select?: S,
      limit?: number,
      skip?: number,
      order?: Record<S[number], {
        direction: 'asc' | 'desc',
        nulls?: 'fist' | 'last',
      }>,
    } = {},
  ) {
    const {
      select = [this.pk],
      limit = 10,
      skip = 0,
      order = {},
    } = options;

    return this.repo.find({
      where,
      select,
      take: limit,
      skip,
      order,
    });
  }
}
