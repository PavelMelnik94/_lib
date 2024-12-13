import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EventBroker } from '../scripts/eventBroker';

describe('EventBroker', () => {
	it('should create event broker instance', () => {
		const broker = new EventBroker();
		expect(broker).toHaveProperty('hub');
		expect(broker).toHaveProperty('emit');
		expect(broker).toHaveProperty('on');
		expect(broker).toHaveProperty('off');
	});

	it('should handle event subscription and emission', () => {
		const broker = new EventBroker();
		const handler = vi.fn();

		broker.on('test', handler);
		broker.emit('test', { data: 'test' });

		expect(handler).toHaveBeenCalledWith({ data: 'test' });
	});

	it('should handle event unsubscription', () => {
		const broker = new EventBroker();
		const handler = vi.fn();

		broker.on('test', handler);
		broker.off('test', handler);
		broker.emit('test', { data: 'test' });

		expect(handler).not.toHaveBeenCalled();
	});

	it('should handle multiple subscribers', () => {
		const broker = new EventBroker();
		const handler1 = vi.fn();
		const handler2 = vi.fn();

		broker.on('test', handler1);
		broker.on('test', handler2);
		broker.emit('test', { data: 'test' });

		expect(handler1).toHaveBeenCalledWith({ data: 'test' });
		expect(handler2).toHaveBeenCalledWith({ data: 'test' });
	});

	it('should handle unsubscribe for non-existent event', () => {
		const broker = new EventBroker();
		const callback = vi.fn();

		// Попытка отписаться от несуществующего события
		broker.unsubscribe('non-existent-event', callback);

		// Проверяем, что это не вызывает ошибок
		expect(() => broker.unsubscribe('non-existent-event', callback)).not.toThrow();
	});

	it('should handle unsubscribe for non-existent callback', () => {
		const broker = new EventBroker();
		const callback1 = vi.fn();
		const callback2 = vi.fn();

		// Подписываемся на событие
		broker.subscribe('test-event', callback1);

		// Пытаемся отписать другой callback
		broker.unsubscribe('test-event', callback2);

		// Проверяем, что оригинальный callback всё ещё работает
		broker.publish('test-event', 'test-data');
		expect(callback1).toHaveBeenCalledWith('test-data');
	});

	it('should handle multiple subscriptions and unsubscriptions', () => {
		const broker = new EventBroker();
		const callback1 = vi.fn();
		const callback2 = vi.fn();

		// Подписываем оба callback'а
		broker.subscribe('test-event', callback1);
		broker.subscribe('test-event', callback2);

		// Публикуем событие
		broker.publish('test-event', 'test-data');

		// Проверяем, что оба callback'а были вызваны
		expect(callback1).toHaveBeenCalledWith('test-data');
		expect(callback2).toHaveBeenCalledWith('test-data');

		// Отписываем первый callback
		broker.unsubscribe('test-event', callback1);

		// Публикуем событие снова
		broker.publish('test-event', 'new-data');

		// Проверяем, что только второй callback был вызван
		expect(callback1).toHaveBeenCalledTimes(1);
		expect(callback2).toHaveBeenCalledTimes(2);
	});
});
