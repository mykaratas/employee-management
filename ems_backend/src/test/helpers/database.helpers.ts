import {Employee} from '../../models';
import {EmployeeRepository, OfficeRepository, TitleChangeRepository} from '../../repositories';
import {DepartmentRepository} from '../../repositories/department.repository';
import {testdb} from '../testdb.datasource';

export async function givenEmptyDatabase() {
  let employeeRepository: EmployeeRepository;
  let departmentRepository: DepartmentRepository;
  let officeRepository: OfficeRepository;
  let titleChangeRepository: TitleChangeRepository;

  employeeRepository = new EmployeeRepository(
    testdb,
    async () => departmentRepository,
  );

  officeRepository = new OfficeRepository(
    testdb
  );

  titleChangeRepository = new TitleChangeRepository(
    testdb,
    async () => employeeRepository
  );

  departmentRepository = new DepartmentRepository(
    testdb,
    async () => officeRepository,
  );

  await employeeRepository.deleteAll();
  await departmentRepository.deleteAll();
  await officeRepository.deleteAll();
  await titleChangeRepository.deleteAll();

}

export function givenEmployeeData(data?: Partial<Employee>) {
  return Object.assign(
    {
      lastName: 'a-last-slug',
      salary: 1000,
    },
    data,
  );
}

export async function givenemployee(data?: Partial<Employee>) {
  //return new EmployeeRepository(testdb).create(givenemployeeData(data));
}
