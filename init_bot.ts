import { config } from "./common/config";
import { ScrapperService } from "./services/scrapper";
import { client } from "./common/client";
import { Debtor } from "./interfaces/debtor";
import { logger } from "./logger";
import Table = require("easy-table");

function checkOnlineDebtors() {
  logger.info("Verifying online debtors now...");

  ScrapperService.getDebtorsData().subscribe((onlineDebtors: Debtor[]) => {
    logger.info("Debtors count is", onlineDebtors.length);
    if (onlineDebtors.length > 0) {

      let table = new Table;

      onlineDebtors.forEach((d:Debtor, index) => {
        table.cell('Index', `#${index}`);
        table.cell('Nome', d.name);
        table.cell('Dinheiro', d.money);
        table.cell('Banco', d.bank);
        table.cell('Celular', d.phone)
        table.newRow();
      });

      const text = table.toString();

      config.bot.users_to_notify.forEach(u => {
        let theres = "Existem";
        let debtors = "devedores";

        if(onlineDebtors.length === 1) {
          theres = "Existe";
          debtors = "devedor";
        }

        client.users.get(u).send(`${theres} **${onlineDebtors.length}** ${debtors} online no momento!`);
        client.users.get(u).send(`\`\`\`${text}\`\`\``);
      });
    }
  });
}

setInterval(checkOnlineDebtors, 5*60*1000); //Each 5 minutes 5*60*1000

process.on('unhandledRejection', (reason, p) => {
  var msg = `Unhandled Rejection at: ${p}, reason: ${reason}`;

  logger.error(msg);
});

process.on('uncaughtException', err => {
  var msg = `Unhandled Rejection at: ${err.name}, message: ${err.message} => ${err.stack}`;

  logger.error(msg);
});
