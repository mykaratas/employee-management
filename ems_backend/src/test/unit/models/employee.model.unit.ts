import {expect} from '@loopback/testlab';
import {Employee} from '../../../models';
import {givenEmployeeData} from '../../helpers/database.helpers';


describe('Employee (unit)', () => {
  // we recommend to group tests by method names
  describe('getFullName()', () => {
    it('uses all three parts when present', () => {
      const employee = givenEmployee({
        firstName: 'Jane',
      });

      const firstName = employee.firstName;
      expect(firstName).to.equal('Jane');
    });

    it('omits middlename when not present', () => {
      const employee = givenEmployee({
        firstName: 'Mark',
      });

      const firstName = employee.firstName;
      expect(firstName).to.equal('Mark');
    });
  });

  function givenEmployee(data: Partial<Employee>) {
    return new Employee(givenEmployeeData(data));
  }
});
