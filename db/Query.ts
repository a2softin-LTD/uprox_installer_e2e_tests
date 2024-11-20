export const GET_EVENTS_BY_SAMPLE = (offset: number, fetch: number) =>
    `SELECT * FROM events ORDER BY time_of_event DESC OFFSET ${offset} ROWS FETCH NEXT ${fetch} ROWS ONLY;`;

export const GET_EVENTS_AMOUNT = `SELECT count(*) FROM events;`;

export const GET_USERS = `SELECT * FROM users;`;

export const GET_USER_BY_EMAIL = (email: string) => 
    `   SELECT u.id, r.name AS "role_name", u.user_state, u.email, u.created, u.last_login, u.enabled 
        FROM users u
        INNER JOIN ROLE r ON u.role_id = r.id
        WHERE email = '${email}'`;

export const GET_DELETED_USERS = (amount: number) =>
    `   SELECT u.id, r.name AS "role_name", u.user_state, u.email, u.created, u.last_login, u.enabled 
        FROM users u
        INNER JOIN ROLE r ON u.role_id = r.id
        WHERE r.name = 'user' and u.user_state = 'DELETED' limit ${amount};`;

export const WRITE_EVENT = (
    time_of_event: string,
    code: number,
    scope: number,
    device: number,
    device_account: number,
    initiator: string,
    initiator_index: number,
    target: string,
    target_index: number,
    info: string,
    info_value: number,
    extra: object,
    category_home: string,
    category_installer: string,
) =>
    `INSERT INTO events (
                    time_of_event,
                    code,
                    scope,
                    device,
                    device_account,
                    initiator,
                    initiator_index,
                    target,
                    target_index,
                    info,
                    info_value,
                    extra,
                    category_home,
                    category_installer
    )
     VALUES (
             ${time_of_event},
             ${code},
             ${scope},
             ${device},
             ${device_account},
             ${initiator},
             ${initiator_index},
             ${target},
             ${target_index},
             ${info},
             ${info_value},
             ${extra},
             ${category_home},
             ${category_installer}
            );`