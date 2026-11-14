import { decrement, increment, useAppStore } from './state';
import Todos from './todos';

// Only this component subscribes to `count`, so clicking the buttons
// re-renders it alone, not App or the todo list.
const Count = () => {
  const count = useAppStore((state) => state.count);
  return <span>Count: {count}</span>;
};

const App = () => (
  <div className='container'>
    <h2>External Store Example</h2>
    <div className='card stack'>
      <div className='h-stack'>
        <button onClick={() => decrement()}>Decrement</button>
        <button onClick={() => increment()}>Increment</button>
        <Count />
      </div>
      <hr />
      <Todos />
    </div>
  </div>
);

export default App;
