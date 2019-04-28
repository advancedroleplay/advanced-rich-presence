import { Debtor } from '../interfaces/debtor';
import { Observable, of } from 'rxjs';
const request = require('sync-request');

export class ScrapperService {
  /**
   * Method responsible for returning the data of online debtors
   */
  static getDebtorsData() : Observable<Debtor[]> {
    const body: String = request('GET', 'https://advanced-roleplay.com.br/debtorsfbi').getBody().toString();

    const table: String = body.substring(body.indexOf('<tbody>')+7, body.indexOf('</tbody>'))
      .replace('</tr>', '')
      .replace('</td>', '')
      .replace(/[\n\r\t]/g, "");

    const rows: String[] = table.split('<tr>');

    rows.shift(); //Unwanted data before the first <tr>
    rows.shift(); //Unwanted header

    const debtors: Debtor[] = rows.map(d => {
      const columns = d.split('<td>');

      return {
        name: columns[2].replace('</td>', ''),
        money: parseFloat(columns[3]),
        bank: parseFloat(columns[4]),
        phone: parseInt(columns[6])
      }
    });

    return of(debtors);
  }
}
