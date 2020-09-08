import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {PgDbDataSource} from '../datasources';
import {Employee, EmployeeRelations, Office} from '../models';
import {DepartmentRepository} from './department.repository';

export class EmployeeRepository extends DefaultCrudRepository<Employee, typeof Employee.prototype.id, EmployeeRelations> {
  set(id: number, employee: Employee) {
    throw new Error('Method not implemented.');
  }

  public readonly managerId: BelongsToAccessor<
    Employee,
    typeof Employee.prototype.id
  >;
  public readonly departmentId: BelongsToAccessor<
    Office,
    typeof Office.prototype.id
  >;

  // public readonly employee: HasOneRepositoryFactory<Employee, typeof Employee.prototype.id>;

  constructor(@inject('datasources.pg_db') dataSource: PgDbDataSource,
    @repository.getter('DepartmentRepository')
    departmentRepositoryGetter: Getter<DepartmentRepository>
  ) {
    super(Employee, dataSource);

    this.managerId = this._createBelongsToAccessorFor(
      'manager',
      Getter.fromValue(this),
    );

    this.registerInclusionResolver('manager', this.managerId.inclusionResolver);

    this.departmentId = this.createBelongsToAccessorFor(
      'department',
      departmentRepositoryGetter,
    );
    this.registerInclusionResolver(
      'department',
      this.departmentId.inclusionResolver,
    );

    // this.employee = this.createHasOneRepositoryFactoryFor('employee', employeeRepositoryGetter);
    // this.registerInclusionResolver('employee', this.employee.inclusionResolver);
  }

  public async findByManager(managerId: number) {
    return (await this.find({
      order: ['priority ASC'],
    })).filter(emp => emp.managerId === managerId);
  }
}
