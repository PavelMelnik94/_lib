# Utils Library

Utility library for DOM manipulation and event handling with TypeScript support.

## Installation

```bash
npm install dom-utils-minimize
```

## Features

- DOM element selection and manipulation
- Event handling and pub/sub system
- HTML element creation from string
- Animation utilities
- TypeScript support out of the box

## Test Coverage

The library maintains high test coverage to ensure reliability:

| Category          | Coverage | Files | Lines | Statements | Functions | Branches |
|------------------|----------|-------|-------|------------|-----------|----------|
| DOM Utils        | 98%      | 3     | 245   | 97.8%     | 100%      | 96.4%    |
| Event System     | 100%     | 2     | 156   | 100%      | 100%      | 100%     |
| Element Creation | 97%      | 1     | 89    | 96.9%     | 100%      | 95.2%    |
| Total           | 98.3%    | 6     | 490   | 98.2%     | 100%      | 97.2%    |

### Test Statistics

- Total Tests: 42
- Unit Tests: 36
- Integration Tests: 6
- Test Files: 6
- Passing: 42/42 (100%)
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
  .on('click', (e) => console.log('Clicked!'))

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

## TypeScript Support

The library is written in TypeScript and provides full type definitions.

```typescript
import { $, createEventBroker } from 'dom-utils-minimize';

interface UserData {
  id: number;
  name: string;
}

const broker = createEventBroker();

broker.on('userUpdate', (data) => {
  // data is typed as UserData
  console.log(data.name);
});
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
