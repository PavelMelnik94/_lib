import { beforeEach, describe, expect, test, vi } from 'vitest';

import createEventBroker from '../scripts/eventBroker';

describe('createEventBroker', () => {
	const broker = createEventBroker();

	beforeEach(() => {
		// Очищаем все события перед каждым тестом
		broker.hub = Object.create(null);
	});

	test('should create event broker with empty hub', () => {
		expect(broker.hub).toEqual({});
	});

	test('should subscribe to event and emit data', () => {
		const handler = vi.fn();
		const testData = { message: 'test' };

		broker.on('test-event', handler);
		broker.emit('test-event', testData);

		expect(handler).toHaveBeenCalledWith(testData);
		expect(handler).toHaveBeenCalledTimes(1);
	});

	test('should handle multiple subscribers for same event', () => {
		const handler1 = vi.fn();
		const handler2 = vi.fn();
		const testData = { message: 'test' };

		broker.on('test-event', handler1);
		broker.on('test-event', handler2);
		broker.emit('test-event', testData);

		expect(handler1).toHaveBeenCalledWith(testData);
		expect(handler2).toHaveBeenCalledWith(testData);
		expect(handler1).toHaveBeenCalledTimes(1);
		expect(handler2).toHaveBeenCalledTimes(1);
	});

	test('should not call handlers for different events', () => {
		const handler1 = vi.fn();
		const handler2 = vi.fn();

		broker.on('event1', handler1);
		broker.on('event2', handler2);
		broker.emit('event1', 'data');

		expect(handler1).toHaveBeenCalledTimes(1);
		expect(handler2).not.toHaveBeenCalled();
	});

	test('should successfully unsubscribe handler', () => {
		const handler = vi.fn();

		broker.on('test-event', handler);
		broker.off('test-event', handler);
		broker.emit('test-event', 'data');

		expect(handler).not.toHaveBeenCalled();
	});

	test('should handle unsubscribe for non-existent event', () => {
		const handler = vi.fn();

		// Не должно вызывать ошибок
		expect(() => {
			broker.off('non-existent', handler);
		}).not.toThrow();
	});

	test('should handle emission of non-existent event', () => {
		expect(() => {
			broker.emit('non-existent', 'data');
		}).not.toThrow();
	});

	test('should remove event from hub when last handler is unsubscribed', () => {
		const handler = vi.fn();

		broker.on('test-event', handler);
		broker.off('test-event', handler);

		expect(broker.hub['test-event']).toBeUndefined();
	});

	test('should handle multiple unsubscribe calls for same handler', () => {
		const handler = vi.fn();

		broker.on('test-event', handler);
		broker.off('test-event', handler);
		broker.off('test-event', handler); // Повторный вызов

		expect(broker.hub['test-event']).toBeUndefined();
		expect(() => {
			broker.off('test-event', handler);
		}).not.toThrow();
	});
});
