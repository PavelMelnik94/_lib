import { describe, expect, it } from 'vitest';

import { createElFromStr } from '../scripts/utils';

describe('createElFromStr', () => {
	it('should create element from HTML string', () => {
		const html = '<div class="test">Hello</div>';
		const element = createElFromStr(html);

		expect(element).toBeDefined();
		expect(element?.tagName).toBe('DIV');
		expect(element?.classList.contains('test')).toBe(true);
		expect(element?.textContent).toBe('Hello');
	});

	it('should return null for invalid HTML', () => {
		const html = 'invalid html';
		const element = createElFromStr(html);

		expect(element).toBeNull();
	});

	it('should create element with specified tag', () => {
		const html = '<span>Test</span>';
		const element = createElFromStr(html, 'span');

		expect(element?.tagName).toBe('SPAN');
	});
});
