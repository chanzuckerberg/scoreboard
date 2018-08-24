const pgp = require("pg-promise")();
const connection = {
    host: process.env.SCOREBOARD_PG_HOST || "localhost",
    port: process.env.SCOREBOARD_PG_PORT || 5432,
    database: process.env.SCOREBOARD_PG_DATABASE || "scoreboard",
    user: process.env.SCOREBOARD_PG_USERNAME,
    password: process.env.SCOREBOARD_PG_PASSWORD,
};
const db = pgp(connection);


function getAdminEmailSettings() {
    return db.one("select e.email_provider, e.email_address, e.email_pass from email_settings e")
        .then(data => {
            return data
        })
}


module.exports = {
    getAdminEmailSettings
};