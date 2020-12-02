# promise.consecutively

When you need to chain many promises and that the order of completion matters.

## Scenario

Let's say you have an unknown list of promises that need to resolve in order. You want `promise3` to be fired only after `promise2` has successfully resolved, and `promise2` to be fired only after `promise1` has successfully resolved.

When these promises are well known in advance you can chain them like this :

```js
promise1.then(() => promise2).then(() => promise3);
```

In the scenario where these promises are a dynamic list and their total number cannot be known in advance you can use `promiseIterator` to iterate over a list.

```js
promiseIterator.iterate([promise_1, promise_2, promise_3, ...., promise_n], callBackFn).then(()=>{})

```
