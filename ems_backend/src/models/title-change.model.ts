import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Employee, EmployeeWithRelations} from './employee.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'title_change'}},
})
export class TitleChange extends Entity {

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  startDate?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  endDate?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  title?: string;

  @property({
    type: 'number',
  })
  departmentId: number;

  @belongsTo(() => Employee, {name: 'employee'})
  employeeId: number;

  constructor(data?: Partial<TitleChange>) {
    super(data);
  }
}

export interface TitleChangeRelations {
  employee?: EmployeeWithRelations;
}

export type TitleChangeWithRelations = TitleChange & TitleChangeRelations;
