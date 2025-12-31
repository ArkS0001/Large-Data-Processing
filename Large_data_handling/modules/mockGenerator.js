/**
 * Generator Function: Vehicle Sensors
 * Infinite stream of sensor data.
 */
export function* vehicleSensorGenerator() {
    let id = 1;
    while (true) {
        const temp = (Math.random() * 40 + 60).toFixed(1); // 60-100 deg
        const rpm = Math.floor(Math.random() * 3000 + 1000);
        
        yield {
            id: id++,
            type: 'Vehicle',
            data: `Engine Temp: ${temp}°C | RPM: ${rpm}`,
            timestamp: new Date().toLocaleTimeString(),
            alert: temp > 95 // Flag if overheating
        };
    }
}

/**
 * Generator Function: Production Records
 */
export function* productionRecordGenerator() {
    let id = 1000;
    const statuses = ['Processing', 'Packaging', 'Quality Check', 'Shipped'];
    
    while (true) {
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        yield {
            id: id++,
            type: 'Production',
            data: `Batch: #${Math.floor(Math.random() * 9999)} | Status: ${status}`,
            timestamp: new Date().toLocaleTimeString(),
            alert: status === 'Quality Check'
        };
    }
}

/**
 * Generator Function: Quality Inspection
 */
export function* qualityInspectionGenerator() {
    let id = 500;
    while (true) {
        const score = (Math.random() * 100).toFixed(2);
        const passed = score > 80;
        
        yield {
            id: id++,
            type: 'Quality',
            data: `Item Check | Score: ${score}% | ${passed ? 'PASSED' : 'FAILED'}`,
            timestamp: new Date().toLocaleTimeString(),
            alert: !passed
        };
    }
}