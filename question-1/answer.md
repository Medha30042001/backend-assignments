--Node.js Architecture : Node.js is a runtime environment. It is neither a framework, nor a language. It is a runtime environment that lets JavaScript run outside the browser. 
----JavaScript Engine (V8) : V8 is an engine that understands JavaScript. It is written in C++, and it is created by Google. It is used in the Chrome browser and Node.js. It reads JS, converts it into machine code, and then executes it in the CPU.
----Node.js Core APIs : These are the built-in features of Node.js, which make it easier to access and communicate with the operating system. That way, we can read the files and edit them. Some examples of the core APIs are fs, http, path, os, etc.
----Native bindings : It is a translator between JavaScript and the operating system. JavaScript is high-level, and operating system understand C/C++. So Native binding works behind the scenes by translating JS to the low level OS file system code.
----Event Loop : It ensures asynchronous behaviour while using a single main thread. It makes sure that Node.js is responsive even when it has a heavy load of tasks. It keeps checking whether a task is done? Is the callback stack empty? It makes sure Node.js is fast.

--Libuv 
----What is libuv? : libuv is a C library. It is used internally by Node.js. It provides asynchronous input/output to Node.js.
----Why Node.js needs libuv : Since JavaScript is single threaded, it can’t create threads. It can’t perform async I/O. So libuv provides a thread pool, and gives event loop implementation. This way, libuv handles operations efficiently without blocking the main thread.
----Responsibilities of libuv : libuv manages the event loop, it handles the asynchronous I/O, it manages the thread pool, and it also supports cross-platform behaviour.

--Thread Pool
----What is a thread pool? : It is a group of backend threads that are used for handling tasks that are intense to the CPU. 
----Why Node.js uses a thread pool : There are some operations that can’t be handled by the OS asynchronously. So when thread pool is used, it handles all these operations, thereby preventing these operations from blocking the main event loop.
----Which operations are handled by the thread pool : Thread pool handles operations like compression, DNS lookup, crypto tasks, and file system operations. If the main thread stays free, the app stays responsive.

--Worker Threads
----What are worker threads? : Worker threads allow the JavaScript itself to run in parallel, in multiple threads. 
----Why are worker threads needed? : They are needed to handle heavy calculations, to improve performance for heavy computations, and thereby prevent blocking the main thread.
----Difference between thread pool and worker threads : The thread pool runs internal native tasks, whereas the worker threads run the JavaScript code. While thread pool is managed by libuv, worker threads are managed by Node.js.

--Event Loop Queues
----Macro Task Queue : It contains tasks such as setTimeout, setInterval, setImmidiate, I/O callbacks, etc.
----Micro Task Queue : It contains promises such as .then, and .catch. queueMicrotask, process.nextTick
----Execution priority between them : Micro tasks are always executed before the macro tasks. The micro tasks are always completed fully before the next event loop phase.
----Examples of tasks in each queue : 
setTimeout(() => console.log(“timeout”), 0);
Promise.resolve().then(() => console.log(“promise”));

Output : 
promise
timeout

