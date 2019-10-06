import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../graphql/client';
import AppRouter from './router';
import './App.css';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div style={{ backgroundColor: '#282c34' }}>
        <AppRouter />
      </div>
    </ApolloProvider>
  );
};

export default App;
