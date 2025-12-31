function validateSensorData(record) {
  return (
    record &&
    typeof record.temperature === "number" &&
    record.vehicleId
  );
}

module.exports = { validateSensorData };
