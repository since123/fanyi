#!/usr/bin/env node
const ora = require("ora");
const chalk = require("chalk");
const program = require("commander");
const youdao = require("./youdao");

program
  .command("*")
  .description("type text to translate")
  .action(async () => {
    console.log("");
    const query = process.argv.slice(2).join(" ");
    const spinner = ora(``);
    spinner.start();

    const res = await youdao(query);
    const usPhonetic = (res.basic && res.basic["us-phonetic"]) || null; // 美式发音
    const ukPhonetic = (res.basic && res.basic["uk-phonetic"]) || null; // 英式发音
    const explains = (res.basic && res.basic.explains) || [];
    const wfs = (res.basic && res.basic.wfs) || [];
    const web = res.web || [];

    let meta = chalk.default(query);
    if (usPhonetic) {
      meta += ` 美式[ ${chalk.red(usPhonetic)} ]`;
    }
    if (ukPhonetic) {
      meta += ` 英式[ ${chalk.red(ukPhonetic)} ]`;
    }
    console.log(meta);

    if (explains.length) {
      console.log("");
      explains.forEach(explain => {
        console.log(`  - ${chalk.green(explain)}`);
      });
    }

    if (wfs.length) {
      console.log("");
      wfs.forEach(w => {
        console.log(`  · ${chalk.gray(w.wf.name)} ${chalk.cyan(w.wf.value)}`);
      });
    }

    if (web.length) {
      console.log("");
      web.forEach((w, i) => {
        console.log(`  ${chalk.gray(i + 1)}. ${chalk.yellow(w.key)}`);
        console.log("    ", chalk.white(w.value));
      });
    }

    spinner.stop();
  });

program.parse(process.argv);
