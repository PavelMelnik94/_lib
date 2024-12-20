import { describe, expect, it } from 'vitest';

import { $, createElFromStr, createEventBroker, createStore } from '../index';

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

	it('should export createStore function', () => {
		expect(createStore).toBeDefined();
		expect(typeof createStore).toBe('function');
	});
});
