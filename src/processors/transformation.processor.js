function normalizeSensorData(record) {
  return {
    ...record,
    temperature: Number(record.temperature.toFixed(2)),
    speed: Number(record.speed.toFixed(2))
  };
}

module.exports = { normalizeSensorData };
