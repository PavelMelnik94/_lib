
/**
 * @name Subscriber
 * @description Тип функции для подписки на изменения
 * @type Subscriber<T = any>
 * @param value - Значение
 * @returns void
 */
type Subscriber<T = any> = (value: T) => void;


/**
 * @name Updater
 * @description Тип функции для обновления значения
 * @type Updater<T = any>
 * @param prev - Предыдущее значение
 * @returns T
 */
type Updater<T> = (prev: T) => T;

/**
 * @name PersistOptions
 * @description Опции для сохранения состояния в хранилище
 * @type PersistOptions
 * @property storageType - Тип хранилища
 * @property key - Ключ для хранения
 */
type PersistOptions = {
  storageType: 'localStorage' | 'sessionStorage';
  key: string;
};


/**
 * @name Reactive
 * @description Класс для создания реактивного значения
 * @class Reactive<T>
 * @property value - Значение
 * @property subscribers - Подписчики
 * @method get - Получение значения
 * @method set - Установка значения
 * @method subscribe - Подписка на изменения
 * @method notify - Уведомление подписчиков
 */
class Reactive<T> {
  private value: T;
  private subscribers: Set<Subscriber<T>> = new Set();

  constructor(initialValue: T) {
    this.value = initialValue;
  }


/**
 * @name get
 * @description Получение значения
 * @method get
 * @returns T
 * @example
 * const value = reactive.get();
 *
 */
  get(): T {
    return this.value;
  }


/**
 * @name set
 * @description Установка значения
 * @method set
 * @param newValue - Новое значение или функция для обновления
 * @returns void
 * @example
 * reactive.set(10);
 * reactive.set((prev) => prev + 1);
 * */
  set(newValue: T | Updater<T>): void {
    const updatedValue =
      typeof newValue === 'function' ? (newValue as Updater<T>)(this.value) : newValue;

    if (this.value !== updatedValue) {
      this.value = updatedValue;
      this.notify();
    }
  }

/**
 * @name subscribe
 * @description Подписка на изменения
 * @method subscribe
 * @param subscriber - Функция для подписки
 * @returns () => void
 * @example
 * const unsubscribe = reactive.subscribe((value) => {
 *  console.log('Value updated:', value);
 * });
 * */
  subscribe(subscriber: Subscriber<T>): () => void {
    this.subscribers.add(subscriber);
    subscriber(this.value); // Немедленный вызов для актуального значения
    return () => this.subscribers.delete(subscriber);
  }

/**
 * @name notify
 * @description Уведомление подписчиков
 * @method notify
 * @returns void
 * */
  private notify(): void {
    this.subscribers.forEach((subscriber) => subscriber(this.value));
  }
}

/**
 * @name createStore
 * @description Функция для создания хранилища
 * @function createStore
 * @param initialState - Начальное состояние
 * @param persistOptions - Необязательный параметр. Опции для сохранения состояния в втореджах
 * @returns Store
 * @example
 * const counterStore = createStore(
 * { count: 0, text: "Hello" },
 * { storageType: 'localStorage', key: 'counterStore' }
 * );
 * */
function createStore<State extends Record<string, any>>(
  initialState: State,
  persistOptions?: PersistOptions
) {
  const state = Object.entries(initialState).reduce((acc, [key, value]) => {
    acc[key as keyof State] = new Reactive(value);
    return acc;
  }, {} as Record<keyof State, Reactive<any>>);

  if (persistOptions) {
    const { storageType, key } = persistOptions;
    const storage = storageType === 'localStorage' ? localStorage : sessionStorage;

    const savedState = storage.getItem(key);
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        Object.keys(parsedState).forEach((stateKey) => {
          if (stateKey in state) {
            state[stateKey as keyof State].set(parsedState[stateKey]);
          }
        });
      } catch (e) {
        console.error('Failed to parse saved state:', e);
      }
    }

    Object.entries(state).forEach(([_stateKey, reactive]) => {
      reactive.subscribe(() => {
        const currentState = Object.entries(state).reduce((acc, [key, reactiveValue]) => {
          acc[key as keyof State] = reactiveValue.get();
          return acc;
        }, {} as State);
        storage.setItem(key, JSON.stringify(currentState));
      });
    });
  }

  return {
    state,
    get<K extends keyof State>(key: K): State[K] {
      return state[key].get();
    },
    set<K extends keyof State>(key: K, value: State[K] | Updater<State[K]>): void {
      state[key].set(value);
    },
    subscribe<K extends keyof State>(key: K, subscriber: Subscriber<State[K]>): () => void {
      return state[key].subscribe(subscriber);
    },
  };
}

export { createStore };
