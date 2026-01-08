import os from "os";

console.log("Free Memory : ", os.freemem()/1024);
console.log("Total CPU Cores : ", os.cpus().length);
