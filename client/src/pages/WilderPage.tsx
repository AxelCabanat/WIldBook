import { useEffect, useState } from 'react';

import WilderForm from '../components/WilderForm';
import { getAllWilders } from '../services/wilders';

import Wilder from '../components/Wilder';
import { IWilder } from '../types/IWilder';

const WilderPage = () => {
    const [wilders, setWilders] = useState<IWilder[]>([]);
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

        <main className='container'>
        <WilderForm
          loadWildersIntoState={loadWildersIntoState}
        />
        <h2>Wilders</h2>
        <section className='card-row'>
          {loadingWilders
            ? 'Loading...'
            : wilders.map((wilder) => (
                <Wilder
                  key={wilder.id}
                  wilder= {wilder}
                  loadWildersIntoState={loadWildersIntoState}
                />
              ))}
        </section>
      </main>

    );
};

export default WilderPage;