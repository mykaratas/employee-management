import {bind, BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {EmployeeRepository} from '../repositories';

@bind({scope: BindingScope.TRANSIENT})
export class DepartmentService {
  constructor(@repository(EmployeeRepository)
  private employeeRepository: EmployeeRepository,
  ) {}

  async getAverageSalary(departmentId: number) {
    return (
      (await this.employeeRepository.find())
        .filter(emp => emp.departmentId === departmentId)
        .map(emp => emp.salary)
        .reduce((a, b) => a + b, 0) / (await this.employeeRepository.find())
          .filter(emp => emp.departmentId === departmentId).length
    );
  }

}
