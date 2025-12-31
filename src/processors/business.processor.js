const { TEMPERATURE_THRESHOLD } = require("../config/app.config");
const { sendAlert } = require("../services/alert.service");

function processBusinessRules(record) {
  if (record.temperature > TEMPERATURE_THRESHOLD) {
    sendAlert(record);
  }
}

module.exports = { processBusinessRules };
