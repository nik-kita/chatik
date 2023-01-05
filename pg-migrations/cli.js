/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-var-requires */
// TODO this is awful!!!
const { exec } = require('child_process');
const { join } = require('path');

async function main() {
  const cli = require('inquirer');
  const { type } = await cli.prompt([
    {
      name: 'type',

      type: 'list',
      choices: [
        'create', 'show', 'run', 'revert',
      ],
      message: 'What would you do with migrations?',
    },
  ]);

  const dsPath = join(__dirname, 'data-source.ts');

  if (type === 'show') {
    const res = await new Promise((resolve, reject) => {
      exec(`npx typeorm-ts-node-esm migration:show -d ${join(__dirname, 'data-source.ts')}`,
        (err, stdOut, stdErr) => {
          if (err || stdErr) {
            console.error(err || stdErr);

            return reject(err);

          } else {
            resolve(stdOut);
          }
        });
    });

    console.log(res);
  } else if (type === 'create') {
    const { migrationName } = await cli.prompt([
      {
        name: 'migrationName',
        type: 'input',
        message: 'Migration name:',
      },
    ]);
    const res = await new Promise((resolve, reject) => {
      exec(`npx typeorm-ts-node-esm migration:create ${join(__dirname, 'migrations', migrationName)}`,
        (err, stdOut, stdErr) => {
          if (err || stdErr) {
            console.error(err || stdErr);

            return reject(err);

          } else {
            resolve(stdOut);
          }
        });
    });

    console.log(res);
  } else if (type === 'run') {
    const res = await new Promise((resolve, reject) => {
      exec(`FORCE_COLOR=true npx typeorm-ts-node-esm migration:run -d ${dsPath}`,
        (err, stdOut, stdErr) => {
          if (err || stdErr) {
            console.error(err || stdErr);

            return reject(err);

          } else {
            resolve(stdOut);
          }
        });
    });

    console.log(res);
  } else if (type === 'revert') {
    const res = await new Promise((resolve, reject) => {
      exec(`FORCE_COLOR=true npx typeorm-ts-node-esm migration:revert -d ${dsPath}`,
        (err, stdOut, stdErr) => {
          if (err || stdErr) {
            console.error(err || stdErr);

            return reject(err);

          } else {
            resolve(stdOut);
          }
        });
    });

    console.log(res);

  }
}

main();
