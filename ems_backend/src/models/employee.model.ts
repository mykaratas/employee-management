import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Department, DepartmentRelations} from './department.model';

enum JobTitles {
  DEV1 = 'Kıdemli Yazılım Geliştirme Uzmanı',
  DEV2 = 'Yazılım Geliştirme Uzmanı',
  DEV3 = 'Yazılım Geliştirme Uzman Yardımcısı',
  CTO = 'CTO',
  CEO = 'CEO',
}


@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'employee'}},
})
export class Employee extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  startDateOfWork?: string;

  @property({
    type: 'number',
    default: () => 5000,
    postgresql: {
      dataType: 'double precision',
    },
  })
  salary: number;

  @property({
    type: 'number',
    default: () => 100,
    postgresql: {
      dataType: 'double precision',
      default: 100
    },
  })
  priority: number;

  @property({
    type: 'string',
    enum: Object.values(JobTitles),
  })
  jobTitles?: JobTitles;

  @belongsTo(() => Employee, {name: 'manager'})
  managerId: number;

  @belongsTo(() => Department, {name: 'department'})
  departmentId: number;

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}
export interface EmployeeRelations {
  manager?: EmployeeRelations,
  department?: DepartmentRelations;
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
