import { beforeEach, describe, expect, it, vi } from 'vitest';

import { $ } from '../scripts/_lib';

describe('$ function', () => {
	beforeEach(() => {
		document.body.innerHTML = `
            <div class="test">
                <span class="child">Test</span>
            </div>
        `;
		console.warn = vi.fn();
		// Добавляем мок для Element.prototype.animate
		Element.prototype.animate = vi.fn();
	});

	it('should select elements by CSS selector', () => {
		const elements = $('.test');
		expect(elements.get().length).toBe(1);
		expect(elements.get()[0].classList.contains('test')).toBe(true);
	});

	it('should handle HTMLElement input', () => {
		const div = document.createElement('div');
		const elements = $(div);
		expect(elements.get().length).toBe(1);
		expect(elements.get()[0]).toBe(div);
	});

	it('should warn when no elements found', () => {
		$('.non-existent');
		expect(console.warn).toHaveBeenCalledWith('Element(s) do not exist');
	});

	it('should handle event listeners', () => {
		const callback = vi.fn();
		const elements = $('.test').on('click', callback).get();

		elements[0].click();
		expect(callback).toHaveBeenCalled();

		$('.test').off('click', callback);
		elements[0].click();
		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('should handle class operations', () => {
		const elements = $('.test');

		elements.addClass('new-class');
		expect(elements.hasClass('new-class')).toBe(true);

		elements.removeClass('new-class');
		expect(elements.hasClass('new-class')).toBe(false);

		elements.toggleClass('toggle-class');
		expect(elements.hasClass('toggle-class')).toBe(true);

		elements.toggleClass('toggle-class');
		expect(elements.hasClass('toggle-class')).toBe(false);
	});

	it('should handle visibility', () => {
		const elements = $('.test');

		elements.hide();
		expect(elements.get()[0].style.display).toBe('none');

		elements.show();
		expect(elements.get()[0].style.display).toBe('');
	});

	it('should handle animations', () => {
		const elements = $('.test');
		const keyframes = [{ opacity: 0 }, { opacity: 1 }];
		const options = { duration: 1000 };
		const animateSpy = vi.spyOn(Element.prototype, 'animate');

		elements.animate(keyframes, options);
		expect(animateSpy).toHaveBeenCalledWith(keyframes, options);

		elements.fadeIn(500);
		expect(elements.get()[0].style.opacity).toBe('1');

		elements.fadeOut(500);
		expect(elements.get()[0].style.opacity).toBe('0');
	});

	it('should handle styles and attributes', () => {
		const elements = $('.test');

		elements.css({ color: 'red', backgroundColor: 'blue' });
		expect(elements.get()[0].style.color).toBe('red');

		elements.setAttributes({ 'data-test': 'value', 'aria-label': 'test' });
		expect(elements.getAttribute('data-test')).toBe('value');
		expect(elements.hasAttribute('data-test')).toBe(true);

		elements.removeAttributes(['data-test']);
		expect(elements.hasAttribute('data-test')).toBe(false);
	});

	it('should handle content manipulation', () => {
		const elements = $('.test');

		elements.setText('New Text');
		expect(elements.get()[0].textContent).toBe('New Text');

		elements.setHTML('<p>New HTML</p>');
		expect(elements.get()[0].innerHTML).toBe('<p>New HTML</p>');

		elements.append('<span>Appended</span>');
		expect(elements.get()[0].innerHTML).toBe('<p>New HTML</p><span>Appended</span>');

		elements.prepend('<div>Prepended</div>');
		expect(elements.get()[0].innerHTML).toBe(
			'<div>Prepended</div><p>New HTML</p><span>Appended</span>',
		);
	});

	it('should handle element removal and cloning', () => {
		const parent = document.querySelector('.test');
		$('.child').remove();
		expect(parent?.querySelector('.child')).toBeNull();

		const elements = $('.test');
		elements.cloneElement();
		expect(document.querySelectorAll('.test').length).toBe(2);
	});

	it('should handle attribute edge cases', () => {
		const elements = $('.test');

		expect(elements.getAttribute('non-existent')).toBe(false);
		expect(elements.hasAttribute('non-existent')).toBe(false);
	});

	it('should chain methods correctly', () => {
		const result = $('.test')
			.addClass('new-class')
			.css({ color: 'red' })
			.setAttributes({ 'data-test': 'value' })
			.setText('Test')
			.get();

		expect(result[0].classList.contains('new-class')).toBe(true);
		expect(result[0].style.color).toBe('red');
		expect(result[0].getAttribute('data-test')).toBe('value');
		expect(result[0].textContent).toBe('Test');
	});
});
