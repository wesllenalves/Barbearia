
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './src/store';
import { navigationRef, isReadyRef } from './src/RootNavigation';
import './src/ReactotronConfig';


import MainStack from './src/stacks/MainStack';

export default () => {
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false
    };
  }, []);

  return (    
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer ref={navigationRef}
          onReady={() => {
          isReadyRef.current = true;
        }}>
          <MainStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}