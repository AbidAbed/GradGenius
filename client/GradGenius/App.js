import Root from './src/Root';
import {store} from './src/store/Store';
import {Provider} from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
export default App;
