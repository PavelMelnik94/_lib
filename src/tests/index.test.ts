import { describe, expect, it } from 'vitest';

import { $, createElFromStr, createEventBroker } from '../index';

describe('Library exports', () => {
	it('should export $ function', () => {
		expect($).toBeDefined();
		expect(typeof $).toBe('function');
	});

	it('should export createElFromStr function', () => {
		expect(createElFromStr).toBeDefined();
		expect(typeof createElFromStr).toBe('function');
	});

	it('should export createEventBroker function', () => {
		expect(createEventBroker).toBeDefined();
		expect(typeof createEventBroker).toBe('function');
	});
});
