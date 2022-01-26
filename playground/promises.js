const print = (message = 'default message', delay = 0) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(message);
    }, delay);
  });
};

console.log('Starting');

print('Two second message', 2000).then((message) => {
  console.log(message);
});

print('One second message', 1000).then((message) => {
  console.log(message);
});

console.log('Stopping');
