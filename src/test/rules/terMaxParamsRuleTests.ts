import { RuleTester, Failure, Position, dedent } from './ruleTester';

const ruleTester = new RuleTester('ter-max-params');

// Change this function to better test the rule. In some cases the message never changes so we
// can avoid passing it in. See other rule tests for examples.
function expecting(errors: [number, number][]): Failure[] {
  return errors.map((err) => {
    let message = 'function has too many parameters';
    return {
      failure: message,
      startPosition: new Position(err[0]),
      endPosition: new Position(err[1])
    };
  });
}

ruleTester.addTestGroup('no-options', 'should warn when the number of parameters exceeds the limit', [
  {
    code: ''
  },
  {
    code: 'var x = 5;\nvar x = 2;'
  },
  {
    code: 'var x = 5;\nvar x = 2;',
    options: [2]
  },
  {
    code: dedent`
      function test(one: number, two: number, three: number) {
        // code
      }
     `,
    errors: expecting([[1, 4]])
  }
]);

ruleTester.runTests();
