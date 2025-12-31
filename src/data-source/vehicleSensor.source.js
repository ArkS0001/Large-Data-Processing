function getVehicleSensorData(totalRecords = 1_000_000) {
  return Array.from({ length: totalRecords }, (_, i) => ({
    vehicleId: `VH-${i}`,
    temperature: Math.random() * 120,
    speed: Math.random() * 180,
    timestamp: Date.now()
  }));
}

module.exports = { getVehicleSensorData };
