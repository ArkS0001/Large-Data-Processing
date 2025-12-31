function validateSensorData(record) {
  return (
    record &&
    record.vehicleId &&
    typeof record.temperature === "number"
  );
}

module.exports = { validateSensorData };
