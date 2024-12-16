/**
 * Утилита для работы с DOM элементами.
 * @param {string | HTMLElement} selectorOrElement - CSS селектор или HTML элемент.
 * @param {ParentNode} [parent=document] - Родительский элемент для поиска.
 * @returns {Object} - Объект с методами для работы с элементами.
 * @example
 * $('.my-class')
 *   .addClass('new-class')
 *   .hide()
 *   .animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 });
 */

import type { Chainable } from "./types";

export const $ = (
	selectorOrElement: string | HTMLElement,
	parent: ParentNode = document,
): Chainable => {
	let elements: NodeListOf<HTMLElement>;

	if (typeof selectorOrElement === 'string') {
		elements = parent.querySelectorAll(selectorOrElement);
	} else {
		elements = [selectorOrElement] as unknown as NodeListOf<HTMLElement>;
	}

	if (!elements?.length) {
		console.warn('Element(s) do not exist');
	}

	const methods: Chainable = {
		on(event: string, callback: (e: Event) => void): Chainable {
			elements.forEach((el) => el.addEventListener(event, callback));
			return methods;
		},
		off(event: string, callback: (e: Event) => void): Chainable {
			elements.forEach((el) => el.removeEventListener(event, callback));
			return methods;
		},
		addClass(className: string): Chainable {
			elements.forEach((el) => el.classList.add(className));
			return methods;
		},
		removeClass(className: string): Chainable {
			elements.forEach((el) => el.classList.remove(className));
			return methods;
		},
		hasClass(className: string): boolean {
			return Array.from(elements).some((el) => el.classList.contains(className));
		},
		hide(): Chainable {
			elements.forEach((el) => {
				el.style.display = 'none';
			});
			return methods;
		},
		show(): Chainable {
			elements.forEach((el) => {
				el.style.display = '';
			});
			return methods;
		},
		get(): NodeListOf<HTMLElement> {
			return elements;
		},
		animate(
			keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
			options: number | KeyframeAnimationOptions,
		): Chainable {
			elements.forEach((el) => el.animate(keyframes, options));
			return methods;
		},
		css(styles: Partial<CSSStyleDeclaration>): Chainable {
			elements.forEach((el) => Object.assign(el.style, styles));
			return methods;
		},
		setAttributes(attributes: Record<string, string>): Chainable {
			elements.forEach((el) => {
				Object.entries(attributes).forEach(([key, value]) => {
					el.setAttribute(key, value);
				});
			});
			return methods;
		},
		getAttribute(attributeKey: string): string | boolean {
			return elements[0].getAttribute(attributeKey) || false;
		},
		hasAttribute(attribute: string): boolean {
			return Array.from(elements).some((el) => el.hasAttribute(attribute));
		},
		removeAttributes(attributes: string[]): Chainable {
			elements.forEach((el) => {
				attributes.forEach((attr) => el.removeAttribute(attr));
			});
			return methods;
		},
		setText(text: string): Chainable {
			elements.forEach((el) => {
				el.textContent = text;
			});
			return methods;
		},
		setHTML(html: string): Chainable {
			elements.forEach((el) => {
				el.innerHTML = html;
			});
			return methods;
		},
		toggleClass(className: string): Chainable {
			elements.forEach((el) => el.classList.toggle(className));
			return methods;
		},
		fadeIn(duration: number): Chainable {
			elements.forEach((el) => {
				el.style.transition = `opacity ${duration}ms`;
				el.style.opacity = '1';
			});
			return methods;
		},
		fadeOut(duration: number): Chainable {
			elements.forEach((el) => {
				el.style.transition = `opacity ${duration}ms`;
				el.style.opacity = '0';
			});
			return methods;
		},
		append(html: string): Chainable {
			elements.forEach((el) => {
				el.insertAdjacentHTML('beforeend', html);
			});
			return methods;
		},
		prepend(html: string): Chainable {
			elements.forEach((el) => {
				el.insertAdjacentHTML('afterbegin', html);
			});
			return methods;
		},
		remove(): Chainable {
			elements.forEach((el) => {
				el.parentNode?.removeChild(el);
			});
			return methods;
		},
		cloneElement(): Chainable {
			elements.forEach((el) => {
				const clone = el.cloneNode(true) as HTMLElement;
				el.parentNode?.insertBefore(clone, el.nextSibling);
			});
			return methods;
		},
	};

	return methods;
};
