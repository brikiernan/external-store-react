import { useActions, useSelector } from './state';
import Todos from './todos';

const Increment = () => {
  const { increment } = useActions();
  return <button onClick={() => increment()}>Increment</button>;
};

const Decrement = () => {
  const { decrement } = useActions();
  return <button onClick={() => decrement()}>Decrement</button>;
};

const App = () => {
  const count = useSelector((state) => state.count);

  return (
    <div className='container'>
      <h2>External Store Example</h2>
      <div className='card stack'>
        <div className='h-stack'>
          <Decrement />
          <Increment />
          <span>Count: {count}</span>
        </div>
        <hr />
        <Todos />
      </div>
    </div>
  );
};

export default App;
