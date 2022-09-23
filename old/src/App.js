import { useEffect, useState } from 'react';

import WilderForm from './components/WilderForm';
import { getAllWilders } from './services/wilders';

import Wilder from './components/Wilder';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [wilders, setWilders] = useState([]);
  const [loadingWilders, setLoadingWilders] = useState(false);

  const loadWildersIntoState = async () => {

    setLoadingWilders(true);
    try {
      setWilders(await getAllWilders());
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWilders(false);
    }
  };

  useEffect(() => {
    loadWildersIntoState();
  }, []);

  return (
    <>
      <Header />
      <main className='container'>
        <WilderForm
          loadWildersIntoState={loadWildersIntoState}
          wilders={wilders}
          setWilders={setWilders}
        />
        <h2>Wilders</h2>
        <section className='card-row'>
          {loadingWilders
            ? 'Loading...'
            : wilders.map((wilder) => (
                <Wilder
                  key={wilder.id}
                  id={wilder.id}
                  name={wilder.name}
                  skills={wilder.skills}
                  loadWildersIntoState={loadWildersIntoState}
                  setWilders={setWilders}
                />
              ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
