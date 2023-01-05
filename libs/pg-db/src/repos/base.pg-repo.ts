import { FindManyOptions, Repository } from 'typeorm';

// TODO replace 'object' with concrete type for app entities
export abstract class PgRepo<E extends object, PK extends keyof E> {
  protected constructor(
    protected repo: Repository<E>,
    protected pk: PK,
  ) { }

  get<
    W extends FindManyOptions<E>['where'],
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
