function* dataGenerator(dataSource) {
  for (const record of dataSource) {
    yield record; // lazy loading
  }
}

module.exports = { dataGenerator };
