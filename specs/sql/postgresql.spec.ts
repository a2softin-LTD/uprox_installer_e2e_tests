import { expect, test } from "@playwright/test";
import { sequelize } from "../../db/db.config";
import { GET_USERS } from "../../db/Query";
import { QueryTypes } from "sequelize";

test.describe('Get data from DEV DB', () => {

    let devConnection;

    let allFileContents: any;

    test.describe('Get data from users table', () => {

        test('1. Get all users', async () => {
            console.log('-------------------------------------------------------------------');
            try {
                await sequelize.authenticate();
                console.log('Connection has been established successfully.');

                const users: object[] = await sequelize.query(GET_USERS, { type: QueryTypes.SELECT });

                console.log(users[0]['id']);

            } catch (error) {
                console.error('Unable to connect to the database:', error);
            } finally {
                await devConnection.release();
            }
        });

    });
});