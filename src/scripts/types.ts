export type Chainable = {
	/**
	 * Добавляет обработчик события для выбранных элементов
	 * @param {keyof HTMLElementEventMap} event - Тип события
	 * @param {(e: Event) => void} callback - Функция-обработчик
	 * @returns {Chainable}  Chainable - Цепочка методов
	 * @example $('.button').on('click', (e) => console.log('Клик!'))
	 */
	on: (event: keyof HTMLElementEventMap, callback: (e: Event) => void) => Chainable;

	/**
	 * Удаляет обработчик события для выбранных элементов
	 * @param {keyof HTMLElementEventMap} event - Тип события
	 * @param {(e: Event) => void} callback - Функция-обработчик
	 * @returns {Chainable}  Chainable - Цепочка методов
	 * @example $('.button').off('click', (e) => console.log('Клик!'))
	 */
	off: (event: keyof HTMLElementEventMap, callback: (e: Event) => void) => Chainable;

	/**
	 * Добавляет CSS класс к выбранным элементам
	 * @param {string} className - Имя класса
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').addClass('active')
	 */
	addClass: (className: string) => Chainable;

	/**
	 * Удаляет CSS класс у выбранных элементов
	 * @param {string} className - Имя класса
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').removeClass('active')
	 */
	removeClass: (className: string) => Chainable;

	/**
	 * Проверяет наличие класса у выбранных элементов
	 * @param {string} className - Имя класса
	 * @returns {boolean} Результат проверки
	 * @example const isClassActiveExist = $('.element').hasClass('active')
	 */
	hasClass: (className: string) => boolean;

	/**
	 * Скрывает выбранные элементы
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').hide()
	 */
	hide: () => Chainable;

	/**
	 * Показывает выбранные элементы
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').show()
	 */
	show: () => Chainable;

	/**
	 * Возвращает NodeList выбранных элементов
	 * @returns {NodeListOf<HTMLElement>} Список элементов/список с одним элементом(в зависимости от кол-ва эл.)
	 * @example const elements = $('.element').get()
	 */
	get: () => NodeListOf<HTMLElement>;

	/**
	 * Анимирует выбранные элементы
	 * @param {Keyframe[] | PropertyIndexedKeyframes | null} keyframes - Ключевые кадры анимации
	 * @param {number | KeyframeAnimationOptions} options - Настройки анимации
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000 })
	 */
	animate: (
		keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
		options: number | KeyframeAnimationOptions,
	) => Chainable;

	/**
	 * Устанавливает CSS стили для выбранных элементов
	 * @param {Partial<CSSStyleDeclaration>} styles - Объект стилей
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').css({ backgroundColor: 'red', fontSize: '16px' })
	 */
	css: (styles: Partial<CSSStyleDeclaration>) => Chainable;

	/**
	 * Устанавливает атрибуты для выбранных элементов
	 * @param {Record<string, string>} attributes - Объект атрибутов
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').setAttributes({ 'data-id': '1', 'aria-label': 'Текст' })
	 */
	setAttributes: (attributes: Record<string, string>) => Chainable;

	/**
	 * Возвращает значение дата-аттрибута.
	 * @param {string} attrKey - ключ искомого дата-аттрибута.
	 * @returns {Chainable} string
	 * @example $('.element').getAttribute('id')
	 */
	getAttribute: (attrKey: string) => string | boolean;

	/**
	 * Проверяет наличие атрибута у выбранных элементов
	 * @param {string} attribute - Имя атрибута
	 * @returns {boolean} Результат проверки
	 * @example const isAttrExist = $('.element').hasAttribute('data-id')
	 */
	hasAttribute: (attribute: string) => boolean;

	/**
	 * Удаляет атрибуты у выбранных элементов
	 * @param {string[]} attributes - Массив имен атрибутов
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').removeAttributes(['data-id', 'aria-label'])
	 */
	removeAttributes: (attributes: string[]) => Chainable;

	/**
	 * Устанавливает текстовое содержимое выбранных элементов
	 * @param {string} text - Текст
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').setText('Новый текст')
	 */
	setText: (text: string) => Chainable;

	/**
	 * Устанавливает HTML содержимое выбранных элементов
	 * @param {string} html - HTML строка
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').setHTML('<span>Новый HTML</span>')
	 */
	setHTML: (html: string) => Chainable;

	/**
	 * Переключает CSS класс у выбранных элементов
	 * @param {string} className - Имя класса
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').toggleClass('active')
	 */
	toggleClass: (className: string) => Chainable;

	/**
	 * Плавно показывает выбранные элементы
	 * @param {number} duration - Длительность анимации
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').fadeIn(500)
	 */
	fadeIn: (duration: number) => Chainable;

	/**
	 * Плавно скрывает выбранные элементы
	 * @param {number} duration - Длительность анимации
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').fadeOut(500)
	 */
	fadeOut: (duration: number) => Chainable;

	/**
	 * Добавляет HTML в конец выбранных элементов
	 * @param {string} html - HTML строка
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').append('<span>Новый HTML</span>')
	 */
	append: (html: string) => Chainable;

	/**
	 * Добавляет HTML в начало выбранных элементов
	 * @param {string} html - HTML строка
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').prepend('<span>Новый HTML</span>')
	 * */
	prepend: (html: string) => Chainable;

	/**
	 * Удаляет выбранные элементы
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').remove()
	 */
	remove: () => Chainable;

	/**
	 * Клонирует выбранные элементы
	 * @returns {Chainable} Chainable - Цепочка методов
	 * @example $('.element').cloneElement()
	 */
	cloneElement: () => Chainable;
};

export type EventHandler = (data: unknown) => void;

export type EventBroker = {
  hub: Record<string, EventHandler[]>;
  emit: (event: string, data: unknown) => void;
  on: (event: string, handler: EventHandler) => void;
  off: (event: string, handler: EventHandler) => void;
};

export type CreateElFromStr = <K extends keyof HTMLElementTagNameMap>(
  str: string,
  tag?: K,
) => Element | null;