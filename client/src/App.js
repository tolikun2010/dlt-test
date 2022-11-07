import './App.css';
import CreateLink from './components/links/CreateLink';
import LinksList from './components/links/LinksList';
import { useState, useEffect } from 'react';
import uuid from 'react-uuid';

function App() {
  const [isChanged, setIsChanged] = useState(false);
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));

  useEffect(() => {
    // get userId from session storage or generate a new one
    if (!userId) {
      const newUserId = uuid()
      sessionStorage.setItem('userId', newUserId);
      setUserId(newUserId);
      setIsChanged(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          DTL-TEST
          <p>
          "I have no idea how to work with React, 
          so please don't judge it by how ugly it looks" © Some Backend Developer
        </p>
        </h1>
        <CreateLink userId={userId} setIsChanged={setIsChanged}/>
        <LinksList userId={userId} isChanged={isChanged} setIsChanged={setIsChanged}/>
      </header>
    </div>
  );
}

export default App;
