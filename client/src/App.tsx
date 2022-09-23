
import Header from './components/Header';
import Footer from './components/Footer';
import WilderPage from './pages/WilderPage';

import { Routes, Route } from 'react-router-dom';
import SkillPage from './pages/SkillPage';
import SoloWilderPage from './pages/SoloWilderPage';
import HomePage from './pages/HomePage';


function App() {


  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/wilders' element={<WilderPage/>}></Route>
        <Route path='wilders/:id' element={<SoloWilderPage/>}></Route>
        <Route path='/skills' element={<SkillPage/>}></Route>
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;

