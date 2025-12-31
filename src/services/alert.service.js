function sendAlert(record) {
  console.log(
    `🚨 ALERT | ${record.vehicleId} | Temp ${record.temperature}`
  );
}

module.exports = { sendAlert };
