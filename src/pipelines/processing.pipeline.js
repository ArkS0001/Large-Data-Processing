const { validateSensorData } = require("../processors/validation.processor");
const { normalizeSensorData } = require("../processors/transformation.processor");
const { processBusinessRules } = require("../processors/business.processor");
const { persistRecord } = require("../services/storage.service");
const { recordMetric } = require("../services/metrics.service");

function executePipeline(generator) {
  for (const record of generator) {
    if (!validateSensorData(record)) continue;

    const normalized = normalizeSensorData(record);
    processBusinessRules(normalized);
    persistRecord(normalized);
    recordMetric();
  }
}

module.exports = { executePipeline };
