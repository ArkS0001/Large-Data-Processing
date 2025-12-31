let processed = 0;

function recordMetric() {
  processed++;
}

function reportMetrics() {
  console.log(`📊 Total records processed: ${processed}`);
}

module.exports = { recordMetric, reportMetrics };
