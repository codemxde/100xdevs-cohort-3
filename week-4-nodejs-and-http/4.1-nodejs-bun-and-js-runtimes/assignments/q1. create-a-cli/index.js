const fs = require("fs");
const path = require("path");
const { Command } = require("commander");
const program = new Command();

program
  .name("string-util")
  .description("CLI to some JavaScript string utilities")
  .version("0.8.0");

program
  .command("countWords")
  .description("count the number of words in a file")
  .argument("<file>", "file to count words from")
  .action((file) => {
    file = path.join(__dirname, file);
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log("Error occured:", err);
      }
      const wordsArr = data.split(" ");
      console.log(`There are ${wordsArr.length} words present`);
    });
  });

program.parse();
