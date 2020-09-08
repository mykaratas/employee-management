import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {PgDbDataSource} from '../datasources';
import {Department, DepartmentRelations, Office} from '../models';
import {OfficeRepository} from './office.repository';

export class DepartmentRepository extends DefaultCrudRepository<
  Department,
  typeof Department.prototype.id,
  DepartmentRelations
  > {
  public readonly locationId: BelongsToAccessor<Office, typeof Office.prototype.id>;

  constructor(
    @inject('datasources.pg_db') dataSource: PgDbDataSource,
    @repository.getter('OfficeRepository')
    officeRepositoryGetter: Getter<OfficeRepository>,
  ) {
    super(Department, dataSource);

    this.locationId = this.createBelongsToAccessorFor(
      'location',
      officeRepositoryGetter,
    );

    this.registerInclusionResolver(
      'location',
      this.locationId.inclusionResolver,
    );

  }
}
