import { Sequelize } from "sequelize-typescript";

export const prodSqlConfig: object = {
    user: "eventsserver234ifewyog4r2l",
    database: "events",
    port: 11326,
    host: "node136157-uprox-event-db-prod.de-fra1.cloudjiffy.net",
    password: "uho45qfdsxr225gdww",
    ssl: false
};

export const qaSqlConfig: object = {
    user: "webadmin",
    database: "events",
    port: 11172,
    host: "node198727-uprox-es-qa-db-primary.de-fra1.cloudjiffy.net",
    password: "iZprOdfWmnOTAe12",
    ssl: false
}


export const prodEventWrightSqlConfig: object = {
    user: "d_pinchuk_read_write",
    database: "events",
    port: 11002,
    host: "node105551-uprox-events-prod-cluster-db.jcloud.ik-server.com",
    password: "lwfv7ni3pfkd_pinchuk_read_write",
    ssl: false
}

export const devConfig = {
    user: "dev_account_dpinchuk_read_write_42",
    database: 'dev_account',
    port: 35483,
    host: "dev-sas-db.cnq4o4ga2lzh.eu-central-1.rds.amazonaws.com",
    password: "jdktqusPYJne75Wp3cT6Mb",
    ssl: true
};

export const sequelize = new Sequelize({
    database: "dev_account",
    username: "dev_account_dpinchuk_read_write_42",
    password: "jdktqusPYJne75Wp3cT6Mb",
    host: "dev-sas-db.cnq4o4ga2lzh.eu-central-1.rds.amazonaws.com",
    port: 35483,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false // This line will fix new error
        }
    },
});