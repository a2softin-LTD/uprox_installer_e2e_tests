import {expect, test} from "@playwright/test";
import { Pool } from 'postgres-pool';
import {prodEventWrightSqlConfig, prodSqlConfig, qaSqlConfig} from "../../db/db.config";
import { GET_EVENTS_AMOUNT, GET_EVENTS_BY_SAMPLE } from "../../db/Query";
import { faker } from "@faker-js/faker";
import { DateParser } from "../../utils/DateParser";
// @ts-ignore
import  fs  from  "fs";
// @ts-ignore
import  fse  from  "fs-extra";
// @ts-ignore
import moment from "moment";

test.describe('Get data from PROD DB, data anonymization  and save to QA DB via SQL requests', () => {

    let prodConnectionString: string;
    let prodPool: Pool;
    let prodConnection;

    let qaConnectionString: string;
    let qaPool: Pool;
    let qaConnection;

    let prodEventWrightConnectionString: string;
    let prodEventWrightPool: Pool;
    let prodEventWrightConnection;

    let allFileContents: any;

    test.beforeAll(async () => {
        prodConnectionString = `postgres://${prodSqlConfig['user']}:${prodSqlConfig['password']}@${prodSqlConfig['host']}:${prodSqlConfig['port']}/${qaSqlConfig['database']}`;
        prodPool = new Pool({connectionString: prodConnectionString});
        prodConnection = await prodPool.connect();

        qaConnectionString = `postgres://${qaSqlConfig['user']}:${qaSqlConfig['password']}@${qaSqlConfig['host']}:${qaSqlConfig['port']}/${qaSqlConfig['database']}`;
        qaPool = new Pool({connectionString: qaConnectionString});
        qaConnection = await qaPool.connect();

        prodEventWrightConnectionString = `postgres://${prodEventWrightSqlConfig['user']}:${prodEventWrightSqlConfig['password']}@${prodEventWrightSqlConfig['host']}:${prodEventWrightSqlConfig['port']}/${prodEventWrightSqlConfig['database']}`;
        prodEventWrightPool = new Pool({connectionString: prodEventWrightConnectionString});
        prodEventWrightConnection = await prodEventWrightPool.connect();
    });

    test.describe('Get data from PROD DB and save to QA DB via sql-requests', () => {
        test.skip('1. Get data from PROD DB and save to QA DB', async () => {

            let getEventsResults;
            let wrightEvents;

            try {
                let eventAmountQuery = Number((await qaConnection.query(GET_EVENTS_AMOUNT)).rows[0].count);
                let time_of_event: string;
                let code: number;
                let scope: number;
                let device: number;
                let device_account: number;
                let initiator: string;
                let initiator_index: number;
                let target: string;
                let target_index: number;
                let info: string;
                let info_value: number;
                let extra: string;
                let category_home: string;
                let category_installer: string;

                let offset: number = 1;
                console.log("Offset = " + offset);

                let fetch: number = 5000;

                while (eventAmountQuery < 140000000) {
                    getEventsResults = await prodConnection.query(GET_EVENTS_BY_SAMPLE(offset++, fetch));
                    for (let i = 0; i < fetch; i++) {
                        time_of_event = await DateParser.getDateInFormat(getEventsResults.rows[i].time_of_event, "YYYY-MM-DD hh:mm:ss");
                        code = faker.number.int({min: 30000, max: 40000});
                        scope = getEventsResults.rows[i].scope === null ? faker.number.int({
                            min: 999,
                            max: 99999
                        }) : getEventsResults.rows[i].scope;
                        device = faker.number.int({min: 40000000000, max: 50000000000});
                        device_account = faker.number.int({min: 0, max: 999999});
                        initiator = faker.internet.email();
                        initiator_index = faker.number.int({min: 999, max: 99999});
                        target = faker.string.alpha({length: {min: 9, max: 99}});
                        target_index = faker.number.int({min: 999, max: 99999});
                        info = faker.string.alpha({length: {min: 9, max: 99}});
                        info_value = faker.number.int({min: 9999, max: 99999});
                        extra = getEventsResults.rows[i].extra === null ? '{"groupIndex": 1}' : JSON.stringify(getEventsResults.rows[i].extra).replace(/\\/g, "");
                        category_home = getEventsResults.rows[i].category_home === null ? faker.string.alpha({
                            length: {
                                min: 9,
                                max: 99
                            }
                        }) : getEventsResults.rows[i].category_home;
                        category_installer = getEventsResults.rows[i].category_installer === null ? faker.string.alpha({
                            length: {
                                min: 9,
                                max: 99
                            }
                        }) : getEventsResults.rows[i].category_installer;

                        const query: string = `INSERT INTO events (time_of_event, code, scope, device, device_account,
                                                                   initiator, initiator_index, target, target_index,
                                                                   info, info_value, extra, category_home,
                                                                   category_installer)
                                               VALUES ('${time_of_event}', '${code}', '${scope}', '${device}',
                                                       '${device_account}', '${initiator}', '${initiator_index}',
                                                       '${target}', '${target_index}', '${info}', '${info_value}',
                                                       '${extra}', '${category_home}', '${category_installer}');`;
                        wrightEvents = await qaConnection.query(query);
                    }
                    eventAmountQuery = Number((await qaConnection.query(GET_EVENTS_AMOUNT)).rows[0].count);
                    console.log("Count of records in QA DB = " + eventAmountQuery);
                    console.log("Offset = " + offset);
                }
            } finally {
                await prodConnection.release();
                await qaConnection.release();
            }
        });

        test.skip('2. Get data from PROD DB and save to QA DB', async () => {
            console.log('STARTING THE TEST: ' +  moment().format('LTS'));
            console.log("**********************************************************************************************");
            console.log("**********************************************************************************************");
            console.log("**********************************************************************************************");
            console.log(' ');
            console.log(' ');
            console.log(' ');

            let getEventsResults;
            let wrightEvents;

            try {
                let eventAmountQuery = Number((await qaConnection.query(GET_EVENTS_AMOUNT)).rows[0].count);
                let time_of_event: string;
                let code: number;
                let scope: number;
                let device: number;
                let device_account: number;
                let initiator: string;
                let initiator_index: number;
                let target: string;
                let target_index: number;
                let info: string;
                let info_value: number;
                let extra: string;
                let category_home: string;
                let category_installer: string;

                let offset: number = 1;
                console.log("Offset = " + offset);

                let fetch: number = 1000;
                
                let arrRecords10: Array<string> = [];
                let arrRecords20: Array<string> = [];
                let arrRecords30: Array<string> = [];
                let arrRecords40: Array<string> = [];
                let arrRecords50: Array<string> = [];

                while (eventAmountQuery < 140000000) {
                    console.log(' ');
                    console.log(' ');
                    console.log('---------------------------------------------------------------------------------------------');
                    console.log('[PROD] Reading time: ' + moment().format('LTS'));
                    getEventsResults = await prodConnection.query(GET_EVENTS_BY_SAMPLE(offset++, fetch));

                    console.log('---------------------------------------------------------------------------------------------');
                    console.log('[QA] START to Record PROD data into QA DB: ' + moment().format('LTS'));

                    for (let i = 0; i < 1 * fetch / 5; i++) {
                        time_of_event = await DateParser.getDateInFormat(getEventsResults.rows[i].time_of_event, "YYYY-MM-DD hh:mm:ss");
                        code = faker.number.int({min: 30000, max: 40000});
                        scope = getEventsResults.rows[i].scope === null ? faker.number.int({
                            min: 999,
                            max: 99999
                        }) : getEventsResults.rows[i].scope;
                        device = faker.number.int({min: 40000000000, max: 50000000000});
                        device_account = faker.number.int({min: 0, max: 999999});
                        initiator = faker.internet.email();
                        initiator_index = faker.number.int({min: 999, max: 99999});
                        target = faker.string.alpha({length: {min: 9, max: 99}});
                        target_index = faker.number.int({min: 999, max: 99999});
                        info = faker.string.alpha({length: {min: 9, max: 99}});
                        info_value = faker.number.int({min: 9999, max: 99999});
                        extra = getEventsResults.rows[i].extra === null ? '{"groupIndex": 1}' : JSON.stringify(getEventsResults.rows[i].extra).replace(/\\/g, "");
                        category_home = getEventsResults.rows[i].category_home === null ? faker.string.alpha({
                            length: {
                                min: 9,
                                max: 99
                            }
                        }) : getEventsResults.rows[i].category_home;
                        category_installer = getEventsResults.rows[i].category_installer === null ? faker.string.alpha({
                            length: {
                                min: 9,
                                max: 99
                            }
                        }) : getEventsResults.rows[i].category_installer;

                        arrRecords10.push("('"+ time_of_event + "', '" + code + "', '" + scope + "', '" + device + "', '" + device_account + "', '" + initiator + "', '" + initiator_index + "', '" + target + "', '" + target_index + "', '" + info + "', '" + info_value + "', '" + extra + "', '" + category_home + "', '" + category_installer + "')");
                    }

                    for (let i = 1 * fetch / 5; i < 2 * fetch / 5; i++) {
                        time_of_event = await DateParser.getDateInFormat(getEventsResults.rows[i].time_of_event, "YYYY-MM-DD hh:mm:ss");
                        code = faker.number.int({min: 30000, max: 40000});
                        scope = getEventsResults.rows[i].scope === null ? faker.number.int({
                            min: 999,
                            max: 99999
                        }) : getEventsResults.rows[i].scope;
                        device = faker.number.int({min: 40000000000, max: 50000000000});
                        device_account = faker.number.int({min: 0, max: 999999});
                        initiator = faker.internet.email();
                        initiator_index = faker.number.int({min: 999, max: 99999});
                        target = faker.string.alpha({length: {min: 9, max: 99}});
                        target_index = faker.number.int({min: 999, max: 99999});
                        info = faker.string.alpha({length: {min: 9, max: 99}});
                        info_value = faker.number.int({min: 9999, max: 99999});
                        extra = getEventsResults.rows[i].extra === null ? '{"groupIndex": 1}' : JSON.stringify(getEventsResults.rows[i].extra).replace(/\\/g, "");
                        category_home = getEventsResults.rows[i].category_home === null ? faker.string.alpha({
                            length: {
                                min: 9,
                                max: 99
                            }
                        }) : getEventsResults.rows[i].category_home;
                        category_installer = getEventsResults.rows[i].category_installer === null ? faker.string.alpha({
                            length: {
                                min: 9,
                                max: 99
                            }
                        }) : getEventsResults.rows[i].category_installer;

                        arrRecords20.push("('"+ time_of_event + "', '" + code + "', '" + scope + "', '" + device + "', '" + device_account + "', '" + initiator + "', '" + initiator_index + "', '" + target + "', '" + target_index + "', '" + info + "', '" + info_value + "', '" + extra + "', '" + category_home + "', '" + category_installer + "')");
                    }

                    for (let i = 2 * fetch / 5; i < 3 * fetch / 5; i++) {
                        time_of_event = await DateParser.getDateInFormat(getEventsResults.rows[i].time_of_event, "YYYY-MM-DD hh:mm:ss");
                        code = faker.number.int({min: 30000, max: 40000});
                        scope = getEventsResults.rows[i].scope === null ? faker.number.int({
                            min: 999,
                            max: 99999
                        }) : getEventsResults.rows[i].scope;
                        device = faker.number.int({min: 40000000000, max: 50000000000});
                        device_account = faker.number.int({min: 0, max: 999999});
                        initiator = faker.internet.email();
                        initiator_index = faker.number.int({min: 999, max: 99999});
                        target = faker.string.alpha({length: {min: 9, max: 99}});
                        target_index = faker.number.int({min: 999, max: 99999});
                        info = faker.string.alpha({length: {min: 9, max: 99}});
                        info_value = faker.number.int({min: 9999, max: 99999});
                        extra = getEventsResults.rows[i].extra === null ? '{"groupIndex": 1}' : JSON.stringify(getEventsResults.rows[i].extra).replace(/\\/g, "");
                        category_home = getEventsResults.rows[i].category_home === null ? faker.string.alpha({
                            length: {
                                min: 9,
                                max: 99
                            }
                        }) : getEventsResults.rows[i].category_home;
                        category_installer = getEventsResults.rows[i].category_installer === null ? faker.string.alpha({
                            length: {
                                min: 9,
                                max: 99
                            }
                        }) : getEventsResults.rows[i].category_installer;

                        arrRecords30.push("('"+ time_of_event + "', '" + code + "', '" + scope + "', '" + device + "', '" + device_account + "', '" + initiator + "', '" + initiator_index + "', '" + target + "', '" + target_index + "', '" + info + "', '" + info_value + "', '" + extra + "', '" + category_home + "', '" + category_installer + "')");
                    }

                    for (let i = 3 * fetch / 5; i < 4 * fetch / 5; i++) {
                        time_of_event = await DateParser.getDateInFormat(getEventsResults.rows[i].time_of_event, "YYYY-MM-DD hh:mm:ss");
                        code = faker.number.int({min: 30000, max: 40000});
                        scope = getEventsResults.rows[i].scope === null ? faker.number.int({
                            min: 999,
                            max: 99999
                        }) : getEventsResults.rows[i].scope;
                        device = faker.number.int({min: 40000000000, max: 50000000000});
                        device_account = faker.number.int({min: 0, max: 999999});
                        initiator = faker.internet.email();
                        initiator_index = faker.number.int({min: 999, max: 99999});
                        target = faker.string.alpha({length: {min: 9, max: 99}});
                        target_index = faker.number.int({min: 999, max: 99999});
                        info = faker.string.alpha({length: {min: 9, max: 99}});
                        info_value = faker.number.int({min: 9999, max: 99999});
                        extra = getEventsResults.rows[i].extra === null ? '{"groupIndex": 1}' : JSON.stringify(getEventsResults.rows[i].extra).replace(/\\/g, "");
                        category_home = getEventsResults.rows[i].category_home === null ? faker.string.alpha({
                            length: {
                                min: 9,
                                max: 99
                            }
                        }) : getEventsResults.rows[i].category_home;
                        category_installer = getEventsResults.rows[i].category_installer === null ? faker.string.alpha({
                            length: {
                                min: 9,
                                max: 99
                            }
                        }) : getEventsResults.rows[i].category_installer;

                        arrRecords40.push("('"+ time_of_event + "', '" + code + "', '" + scope + "', '" + device + "', '" + device_account + "', '" + initiator + "', '" + initiator_index + "', '" + target + "', '" + target_index + "', '" + info + "', '" + info_value + "', '" + extra + "', '" + category_home + "', '" + category_installer + "')");
                    }

                    for (let i = 4 * fetch / 5; i < 5 * fetch / 5; i++) {
                        time_of_event = await DateParser.getDateInFormat(getEventsResults.rows[i].time_of_event, "YYYY-MM-DD hh:mm:ss");
                        code = faker.number.int({min: 30000, max: 40000});
                        scope = getEventsResults.rows[i].scope === null ? faker.number.int({
                            min: 999,
                            max: 99999
                        }) : getEventsResults.rows[i].scope;
                        device = faker.number.int({min: 40000000000, max: 50000000000});
                        device_account = faker.number.int({min: 0, max: 999999});
                        initiator = faker.internet.email();
                        initiator_index = faker.number.int({min: 999, max: 99999});
                        target = faker.string.alpha({length: {min: 9, max: 99}});
                        target_index = faker.number.int({min: 999, max: 99999});
                        info = faker.string.alpha({length: {min: 9, max: 99}});
                        info_value = faker.number.int({min: 9999, max: 99999});
                        extra = getEventsResults.rows[i].extra === null ? '{"groupIndex": 1}' : JSON.stringify(getEventsResults.rows[i].extra).replace(/\\/g, "");
                        category_home = getEventsResults.rows[i].category_home === null ? faker.string.alpha({
                            length: {
                                min: 9,
                                max: 99
                            }
                        }) : getEventsResults.rows[i].category_home;
                        category_installer = getEventsResults.rows[i].category_installer === null ? faker.string.alpha({
                            length: {
                                min: 9,
                                max: 99
                            }
                        }) : getEventsResults.rows[i].category_installer;

                        arrRecords50.push("('"+ time_of_event + "', '" + code + "', '" + scope + "', '" + device + "', '" + device_account + "', '" + initiator + "', '" + initiator_index + "', '" + target + "', '" + target_index + "', '" + info + "', '" + info_value + "', '" + extra + "', '" + category_home + "', '" + category_installer + "')");
                    }

                    const query: string = ("BEGIN; " +
                    "INSERT INTO events (time_of_event, code, scope, device, device_account, initiator, initiator_index, target, target_index, info, info_value, extra, category_home, category_installer) VALUES " + arrRecords10.join(',') + "; " +
                    "INSERT INTO events (time_of_event, code, scope, device, device_account, initiator, initiator_index, target, target_index, info, info_value, extra, category_home, category_installer) VALUES " + arrRecords20.join(',') + "; " +
                    "INSERT INTO events (time_of_event, code, scope, device, device_account, initiator, initiator_index, target, target_index, info, info_value, extra, category_home, category_installer) VALUES " + arrRecords30.join(',') + "; " +
                    "INSERT INTO events (time_of_event, code, scope, device, device_account, initiator, initiator_index, target, target_index, info, info_value, extra, category_home, category_installer) VALUES " + arrRecords40.join(',') + "; " +
                    "INSERT INTO events (time_of_event, code, scope, device, device_account, initiator, initiator_index, target, target_index, info, info_value, extra, category_home, category_installer) VALUES " + arrRecords50.join(',') + "; " +
                    "COMMIT;");
                    wrightEvents = await qaConnection.query(query.replace(/\\/g, ""));

                    console.log('[QA] FINISH to Record PROD data into QA DB: ' + moment().format('LTS'));
                    console.log('---------------------------------------------------------------------------------------------');
                    console.log(' ');
                    console.log(' ');
                    console.log('---------------------------------------------------------------------------------------------');
                    eventAmountQuery = Number((await qaConnection.query(GET_EVENTS_AMOUNT)).rows[0].count);
                    console.log('Count of records in QA DB = ' + eventAmountQuery);
                    console.log('Offset = ' + offset);
                    console.log(' ');
                    console.log(' ');

                    arrRecords10 = [];
                    arrRecords20 = [];
                    arrRecords30 = [];
                    arrRecords40 = [];
                    arrRecords50 = [];

                }
            } finally {
                await prodConnection.release();
                await qaConnection.release();
            }
        });

        test('3. Executing SQL Selects to PROD DB and measurementing response times', async () => {
            let stage: number = 0;
            let count: number = 0;
            let startTime: Date;
            let endTime: Date;
            let duration: string;
            let wrightEvents: any;

            try {
                    // {
                    //     // 1. script2022.txt
                    //     console.log("**********************************************************************************************");
                    //     console.log("************************* Executing requests from 'script2022.txt' ***************************");
                    //     console.log("**********************************************************************************************");
                    //     stage++;
                    //     allFileContents = fs.readFileSync('./test-data/script2022.txt', 'utf-8');
                    //     for (const line of allFileContents.split(/\r?\n/)) {
                    //         let timeStampStart: number = Date.now();
                    //         startTime = new Date();
                    //         count++;
                    //         console.log(`${stage}.${count}. Executing the request:  ${line}`);

                    //         wrightEvents = await prodEventWrightConnection.query(line);

                    //         console.log('DONE!');

                    //         let timeStampEnd: number = Date.now();
                    //         endTime = new Date();
                    //         duration = await DateParser.calculateTimeDifference(startTime, endTime);
                    //         console.log("Duration time = " + duration);
                    //         console.log();

                    //         expect(timeStampEnd - timeStampStart).toBeLessThan(300001);
                    //     }

                    //     count = 0;
                    //     duration = '';
                    //     console.log("**********************************************************************************************");
                    //     console.log();
                    //     console.log();
                    //     console.log();
                    // }

                    // {
                    //     // 2. script2023.txt
                    //     console.log("**********************************************************************************************");
                    //     console.log("************************* Executing requests from 'script2023.txt' ***************************");
                    //     console.log("**********************************************************************************************");
                    //     stage++;
                    //     allFileContents = fs.readFileSync('./test-data/script2023.txt', 'utf-8');
                    //     for (const line of allFileContents.split(/\r?\n/)) {
                    //         let timeStampStart: number = Date.now();
                    //         startTime = new Date();
                    //         count++;
                    //         console.log(`${stage}.${count}. Executing the request:  ${line}`);

                    //         wrightEvents = await prodEventWrightConnection.query(line);

                    //         console.log('DONE!');

                    //         let timeStampEnd: number = Date.now();
                    //         endTime = new Date();
                    //         duration = await DateParser.calculateTimeDifference(startTime, endTime);
                    //         console.log("Duration time = " + duration);
                    //         console.log();

                    //         expect(timeStampEnd - timeStampStart).toBeLessThan(300001);
                    //     }

                    // count = 0;
                    // duration = '';
                    // console.log("**********************************************************************************************");
                    // console.log();
                    // console.log();
                    // console.log();
                    // }

                    {
                        // 3. script2024.txt
                        console.log("**********************************************************************************************");
                        console.log("************************* Executing requests from 'script2024.txt' ***************************");
                        console.log("**********************************************************************************************");
                        stage++;
                        allFileContents = fs.readFileSync('./test-data/script2024.txt', 'utf-8');
                        for (const line of allFileContents.split(/\r?\n/)) {
                            let timeStampStart: number = Date.now();
                            startTime = new Date();
                            count++;
                            console.log(`${stage}.${count}. Executing the request:  ${line}`);

                            wrightEvents = await prodEventWrightConnection.query(line);

                            console.log('DONE!');

                            let timeStampEnd: number = Date.now();
                            endTime = new Date();
                            duration = await DateParser.calculateTimeDifference(startTime, endTime);
                            console.log("Duration time = " + duration);
                            console.log();

                            expect(timeStampEnd - timeStampStart).toBeLessThan(300001);
                        }

                        count = 0;
                        duration = '';
                        console.log("**********************************************************************************************");
                        console.log();
                        console.log();
                        console.log();
                    }
            } finally {
                await prodEventWrightConnection.release();
            }
        })
    });
});