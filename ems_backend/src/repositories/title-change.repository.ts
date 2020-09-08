import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DataSource} from 'loopback-datasource-juggler';
import {EmployeeRepository} from '.';
import {Employee, TitleChange, TitleChangeRelations} from '../models';

export class TitleChangeRepository extends DefaultCrudRepository<
  TitleChange,
  typeof TitleChange.prototype.id,
  TitleChangeRelations
  > {
  public readonly employeeId: BelongsToAccessor<
    Employee,
    typeof Employee.prototype.id
  >;

  constructor(
    @inject('datasources.pg_db') dataSource: DataSource,
    @repository.getter('EmployeeRepository')
    employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(TitleChange, dataSource);

    this.employeeId = this.createBelongsToAccessorFor(
      'employee',
      employeeRepositoryGetter,
    );
    this.registerInclusionResolver(
      'employee',
      this.employeeId.inclusionResolver,
    );
  }
}
