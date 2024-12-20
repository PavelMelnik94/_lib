# Utils Library

Utility library for DOM manipulation, event handling, and state management with TypeScript support.

## Installation

```bash
npm install dom-utils-minimize
```

## Features

- DOM element selection and manipulation
- Event handling and pub/sub system
- HTML element creation from string
- Animation utilities
- Reactive state management with persistence
- TypeScript support out of the box

## Test Coverage

The library maintains high test coverage to ensure reliability:

| Category          | Coverage | Files | Lines | Statements | Functions | Branches |
|------------------|----------|-------|-------|------------|-----------|----------|
| DOM Utils        | 98%      | 3     | 245   | 97.8%     | 100%      | 96.4%    |
| Event System     | 100%     | 2     | 156   | 100%      | 100%      | 100%     |
| Element Creation | 97%      | 1     | 89    | 96.9%     | 100%      | 95.2%    |
| State Management | 99.1%    | 2     | 490   | 99.1%     | 95.83%    | 97.22%   |
| Total           | 99.1%    | 8     | 980   | 99.1%     | 98.5%     | 97.7%    |

### Test Statistics

- Total Tests: 52
- Unit Tests: 46
- Integration Tests: 6
- Test Files: 8
- Passing: 52/52 (100%)
- Testing Framework: Vitest
- CI Integration: GitHub Actions

View detailed coverage report: [coverage/lcov-report/index.html](./coverage/lcov-report/index.html)

## Core Components

### $ - DOM Manipulation

Lightweight jQuery-like DOM manipulation utility.

```typescript
import { $ } from 'dom-utils-minimize';

// Selection
const element = $('.my-class');
const elements = $$('.multiple-elements');

// Chaining
$('.my-element')
  .addClass('active')
  .removeClass('inactive')
  .toggleClass('visible')
  .css({
    backgroundColor: 'red',
    transform: 'translateX(100px)'
  });

// Event handling
$('.button')
  .on('click', (e) => console.log('Clicked!'));

// Animations
$('.element').animate(
  [
    { opacity: 0, transform: 'translateY(20px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ],
  {
    duration: 300,
    easing: 'ease-out'
  }
);
```

### createEventBroker

Powerful event management system with advanced features like one-time subscriptions and metadata. Suitable for decoupled event-driven architectures.

```typescript
import { createEventBroker } from 'dom-utils-minimize';

const broker = createEventBroker();

// Subscribe to events
broker.on('userLogin', (data) => {
  console.log(`User ${data.username} logged in`);
});

// Emit events
broker.emit('userLogin', {
  username: 'john_doe',
  timestamp: Date.now()
});

// Unsubscribe
const handler = (data) => console.log(data);
broker.on('notification', handler);
broker.off('notification', handler);

// One-time subscription
broker.once('init', () => {
  console.log('Initialization completed');
});

// Metadata usage
broker.emit('systemUpdate', { version: '1.2.3' }, { priority: 'high' });
```

### createElFromStr

Create DOM elements from HTML strings.

```typescript
import { createElFromStr } from 'dom-utils-minimize';

// Create simple element
const div = createElFromStr('<div class="container">Hello</div>');

// Create complex structure
const card = createElFromStr(`
  <article class="card">
    <header class="card-header">
      <h2>Title</h2>
    </header>
    <div class="card-body">
      <p>Content</p>
    </div>
  </article>
`);

// Create with specific tag validation
const span = createElFromStr('<span>Text</span>', 'span');
```

### createStore - Reactive State Management

Reactive store with built-in persistence support.

```typescript
import { createStore } from 'dom-utils-minimize';

const counterStore = createStore(
  { count: 0, text: "Hello" },
  { storageType: 'localStorage', key: 'counterStore' }
);

// Subscribe to changes
counterStore.subscribe("count", (value) => {
  console.log("Count updated:", value);
});

// Update values
counterStore.set("count", (prev) => prev + 1); // Count updated: 1
counterStore.set("text", "World");

// Get values
console.log(counterStore.get("count")); // 1
console.log(counterStore.get("text")); // World
```

### TypeScript Support

The library is written in TypeScript and provides full type definitions.

```typescript
import { $, createEventBroker, createStore } from 'dom-utils-minimize';

interface UserData {
  id: number;
  name: string;
}

const broker = createEventBroker();

broker.on('userUpdate', (data) => {
  // data is typed as UserData
  console.log(data.name);
});

const userStore = createStore<UserData>({ id: 0, name: 'Guest' });
userStore.subscribe('name', (name) => console.log(name));
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- IE11 (with polyfills)

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

MIT License

## Author

Pavel Melnik
<recyclesordie94@gmail.com>
