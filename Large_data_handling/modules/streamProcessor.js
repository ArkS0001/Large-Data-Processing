import { vehicleSensorGenerator, productionRecordGenerator, qualityInspectionGenerator } from './mockGenerator.js';

export class StreamProcessor {
    constructor() {
        this.generator = null;
        this.isProcessing = false;
    }

    /**
     * Initializes the specific generator based on selection.
     */
    init(type) {
        switch(type) {
            case 'vehicle':
                this.generator = vehicleSensorGenerator();
                break;
            case 'production':
                this.generator = productionRecordGenerator();
                break;
            case 'quality':
                this.generator = qualityInspectionGenerator();
                break;
            default:
                this.generator = vehicleSensorGenerator();
        }
        console.log(`Processor initialized with: ${type}`);
    }

    /**
     * Lazy Loading: Fetches only the NEXT item in the sequence.
     * Does not process the whole list.
     */
    next() {
        if (!this.generator) return null;
        // The .next() method is the core of Iterators
        return this.generator.next(); 
    }
}