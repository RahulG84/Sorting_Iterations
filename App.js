/* eslint-disable react/react-in-jsx-scope */
import SheduleItem from './src/componenets/SheduleItem';
import {useEffect, useState} from 'react';
import Splash from './src/componenets/Splash';

const App = () => {
  const [showSplash, setshowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setshowSplash(!showSplash);
    }, 3000);
  }, []);
  return <>{showSplash ? <Splash /> : <SheduleItem />}</>;
};

export default App;
