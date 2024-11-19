import { test } from "@playwright/test";
import { sequelize } from "../../db/db.config";
import { GET_USER_BY_EMAIL, GET_USERS } from "../../db/Query";
import { QueryTypes } from "sequelize";

test.describe('Get data from DEV DB', () => {

    let devConnection;

    test.describe('Get data from users table', () => {

        test('1. Get all users', async () => {
            console.log('-------------------------------------------------------------------');
            try {
                await sequelize.authenticate();
                console.log('Connection has been established successfully.');

                const user: object[] = await sequelize.query(GET_USER_BY_EMAIL('snaut1@ukr.net'), { type: QueryTypes.SELECT });

                console.log(user[0]['user_state']);

            } catch (error) {
                console.error('Unable to connect to the database:', error);
            } finally {
                await devConnection.release();
            }
        });

    });
});