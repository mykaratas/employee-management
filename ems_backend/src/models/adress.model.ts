import {Entity, model, property} from '@loopback/repository';

@model()
export class Address extends Entity {
  // original code remains unchanged, add the following two properties:

  @property({
    type: 'string',
  })
  remindAtAddress?: string; // address,city,zipcode

  @property({
    type: 'string',
  })
  remindAtGeo?: string; // latitude,longitude
}
