const boxen = require("boxen");

const message = "I am using my first external module!";
const title = "Hurray!!!";

console.log(boxen(message, { title: title, padding: 1, margin: 1 }));

console.log(
  boxen(message, {
    title: title,
    padding: 1,
    margin: 1,
    borderStyle: "classic",
    backgroundColor: 'yellow'
  })
);

console.log(
  boxen(message, {
    title: title,
    padding: 1,
    margin: 1,
    borderStyle: "singleDouble",
    backgroundColor: 'cyan'
  })
);

console.log(
  boxen(message, {
    title: title,
    padding: 1,
    margin: 1,
    borderStyle: "round",
    backgroundColor: 'magenta'
  })
);
