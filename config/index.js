require("dotenv").config({ path: "./.env" });

module.exports = {
    port: process.env.PORT || 5000,
    base_url: process.env.BASE_URL,
    fingerprint: process.env.FINGERPRINT
}