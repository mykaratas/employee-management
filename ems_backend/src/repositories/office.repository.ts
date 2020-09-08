import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PgDbDataSource} from '../datasources';
import {Office, OfficeRelations} from '../models';

export class OfficeRepository extends DefaultCrudRepository<
  Office,
  typeof Office.prototype.id,
  OfficeRelations
  > {
  constructor(
    @inject('datasources.pg_db') dataSource: PgDbDataSource,
  ) {
    super(Office, dataSource);
  }
}
