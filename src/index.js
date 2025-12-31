const { getVehicleSensorData } = require("./data-source/vehicleSensor.source");
const { dataGenerator } = require("./generators/data.generator");
const { executePipeline } = require("./pipelines/processing.pipeline");
const { reportMetrics } = require("./services/metrics.service");

const data = getVehicleSensorData(1_000_000);
const generator = dataGenerator(data);

executePipeline(generator);
reportMetrics();
