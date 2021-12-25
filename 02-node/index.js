const { cpus, freemem, platform, totalmem } = require('os');
const { exit } = require('process');

const exitProcess = (code = 0) => {
  console.log(`Operating System: ${platform()}`);
  for (let cpu of cpus()) {
    console.log(`cpu: ${cpu.model} ${cpu.speed}`);
  }
  const totalmemMB = totalmem() / 1024 / 1024;
  const freememMB = freemem() / 1024 / 1024;
  console.log(`memory: total(${totalmemMB}) free(${freememMB})`);
  console.log(`Exiting with code ${code} at ${new Date().toISOString()}.`);
  exit(code);
};

console.log(`Starting at ${new Date().toISOString()}.`);
setTimeout(exitProcess, 2000);
