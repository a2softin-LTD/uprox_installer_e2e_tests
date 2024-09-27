const PROD_ENV: string = 'https://web-security.u-prox.systems';
const QA_ENV: string = 'https://qa-webinstaller.maks.systems';
const DEV_ENV: string = 'https://devweb-security.u-prox.systems/';
const DEV_DACH_ENV: string = 'https://dev-dach-web-security.u-prox.systems';

export const INSTALLER_LOGIN_URL = (env: string): string => {
    if (env.toLowerCase().includes('prod')) {
        return PROD_ENV;
    } else if (env.toLowerCase().includes('qa')) {
        return QA_ENV;
    } else if (env.toLowerCase().includes('dach')) {
        return DEV_DACH_ENV;
    }
    return DEV_ENV;
}