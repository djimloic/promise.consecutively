import { consecutively } from './promise.consecutively';

interface TestInterface {
  i_attr: string;
}

class TestClass {
  constructor(public c_attr: string) {}
}

describe('Promise Iterator', () => {
  it('should resolve all promises for interface', () => {
    const p1: Promise<TestInterface> = new Promise<TestInterface>(
      (resolver, _reject) => {
        resolver({ i_attr: 'number 1' });
      }
    );
    const p11: Promise<TestInterface> = p1.then((_value) => ({
      i_attr: 'number 1, one level down',
      i_attr2: 11,
    }));
    const p2: Promise<TestInterface> = new Promise<TestInterface>(
      (resolver, _reject) => {
        resolver({ i_attr: 'number 2' });
      }
    );
    const p3: Promise<TestInterface> = new Promise<TestInterface>(
      (resolver, _reject) => {
        resolver({ i_attr: 'number 3' });
      }
    );

    return consecutively
      .iterate([p11, p2, p3], console.log)
      .then((response) => {
        // Expect All 3 promises to have been resolved
        expect(response.length).toEqual(3);
        // Here, promise p1, then p11 have been resolved
        expect(response[0].i_attr).toEqual('number 1, one level down');
        // Here, promise p2 has been resolved
        expect(response[1].i_attr).toEqual('number 2');
        // Here, promise p3 has been resolved
        expect(response[2].i_attr).toEqual('number 3');
      });
  });

  it('should failed at the first rejected promise', () => {
    const p1: Promise<TestClass> = new Promise<TestClass>(
      (resolver, _reject) => {
        resolver(new TestClass('number 1'));
      }
    );
    const p11: Promise<TestClass> = p1.then(
      (_value) => new TestClass('number 1, one level down')
    );
    const p2: Promise<TestClass> = new Promise<TestClass>(
      (_resolver, reject) => {
        reject(new TestClass('number 2'));
      }
    );
    const p3: Promise<TestClass> = new Promise<TestClass>(
      (resolver, _reject) => {
        resolver(new TestClass('number 3'));
      }
    );

    return consecutively
      .iterate([p11, p2, p3], console.log)
      .then((_response) => {
        /**
         * This assertion should fail the test,
         * but this promise will not be resolve as p2 is set to fail
         */
        expect(1).toEqual(3);
      })
      .catch((err) => {
        /**
         * Expect the error to be p2 rejected message
         * Note that here p1 and p11 have resolved
         * Not that p3 will never be fired up as it is after p2 in the list
         */
        expect(err.c_attr).toEqual('number 2');
      });
  });
});
