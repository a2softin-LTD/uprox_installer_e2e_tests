// @ts-ignore
import moment from 'moment';

export class DateParser {
    static async getDateInFormat(date: string, format: string) {
        return moment(Date.parse(date)).format(format);
    }

    static async calculateTimeDifference(startDate: Date, endDate: Date) {
        let msec = endDate.getTime() - startDate.getTime();
        const hh = `0${Math.floor(msec / 1000 / 60 / 60)}`;
        // @ts-ignore
        msec -= hh * 1000 * 60 * 60;

        const mm = `0${Math.floor(msec / 1000 / 60)}`;
        // @ts-ignore
        msec -= mm * 1000 * 60;

        const ss = `0${Math.floor(msec / 1000)}`;
        // @ts-ignore
        msec -= ss * 1000;
        return hh.slice(-2) + ":" + mm.slice(-2) + ":" + ss.slice(-2);
    }
}