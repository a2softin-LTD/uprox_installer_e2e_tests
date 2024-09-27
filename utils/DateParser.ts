// @ts-ignore
import moment from 'moment';

export class DateParser {
    static async getDateInFormat(date: string, format: string) {
        return moment(Date.parse(date)).format(format);
    }
}