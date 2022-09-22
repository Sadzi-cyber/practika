import { Component } from 'react';
import styles from './App.module.scss';
import { Provider } from 'react-redux';

import store from './redux/store';

import Header from './components/Header/Header';
import Notes from './pages/Notes/Notes';
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className={styles.wrapper}>
          <Header />
          <main className={styles.content}>
            <Notes />
          </main>
        </div>
      </Provider>
    )
  }
}

export default App;
