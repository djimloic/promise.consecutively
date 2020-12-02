export namespace promiseIterator {
  const uniqueId = '74ec0384-34b9-11eb-adc1-0242ac120002';

  /**
   * Returns a Promise that waits for all promises in the iterable to be resolved following the iterable order
   * and is then resolved with an array of those resulting values (in the same order as the input).
   * @param promises List of promises to be resolved
   * @param callback A callback function that is called every time one of the promise in the list is resolved
   */
  export const iterate = <T>(
    promises: Iterable<Promise<T>>,
    callback: (...args: any[]) => any = () => {}
  ): Promise<T[]> => {
    let start_promise: Promise<any> = Promise.resolve(uniqueId);
    const promiseOutput: T[] = [];
    const iterator = promises[Symbol.iterator]();
    let next = iterator.next();
    while (!next.done) {
      ((running_promise) => {
        start_promise = start_promise.then((output) => {
          if (output !== uniqueId) {
            callback(output);
            promiseOutput.push(output);
          }
          return running_promise;
        });
        next = iterator.next();
      })(next.value);
    }
    return start_promise.then((output) => {
      callback(output);
      promiseOutput.push(output);
      return Promise.resolve(promiseOutput);
    });
  };
}
