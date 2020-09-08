import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Office, OfficeWithRelations} from './office.model';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'department'}},
})
export class Department extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'number',
  })
  managerId?: 'number';

  @belongsTo(() => Office)
  locationId: number;

  constructor(data?: Partial<Department>) {
    super(data);
  }
}

export interface DepartmentRelations {
  location?: OfficeWithRelations;

}

export type DepartmentWithRelations = Department & DepartmentRelations;
