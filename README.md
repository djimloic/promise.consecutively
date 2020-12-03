# promise.consecutively

When you need to chain many promises and that the order of completion matters.

## Scenario

Let's say you have an unknown list of promises that need to resolve in order. You want `promise3` to be fired only after `promise2` has successfully resolved, and `promise2` to be fired only after `promise1` has successfully resolved.

When these promises are well known in advance you can chain them like this :

```js
promise1.then(() => promise2).then(() => promise3);
```

In the scenario where these promises are a dynamic list and their total number cannot be known in advance you can use the `iterate` function to iterate over a list.

```js
iterate([promise_1, promise_2, promise_3, ...., promise_n], callBackFn).then(()=>{})

```

## How to use in Javascript

In this example, we have three promises that takes some seconds to resolve.
I passed also the `console.info` function as callback to display the resolved response of each promises.

```js
var promiseConsecutively = require('promise.consecutively');

promiseConsecutively
  .iterate(
    [
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('number one - ' + new Date());
        }, 1000);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('number two - ' + new Date());
        }, 5000);
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('number three - ' + new Date());
        }, 10000);
      })
    ],
    console.info
  )
  .then((result) => console.log('results', result));
```

The output is the following :

```js
'number one - Thu Dec 03 2020 15:02:54 GMT+0100 (Central European Standard Time)';

'number two - Thu Dec 03 2020 15:02:58 GMT+0100 (Central European Standard Time)';

'number three - Thu Dec 03 2020 15:03:03 GMT+0100 (Central European Standard Time)';

'results'[
  ('number one - Thu Dec 03 2020 15:02:54 GMT+0100 (Central European Standard Time)',
  'number two - Thu Dec 03 2020 15:02:58 GMT+0100 (Central European Standard Time)',
  'number three - Thu Dec 03 2020 15:03:03 GMT+0100 (Central European Standard Time)')
];
```
