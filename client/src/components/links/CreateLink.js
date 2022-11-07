import axios from 'axios';
import { useState, useRef } from 'react';

function CreateLink({setIsChanged, userId}) {
    const [fullUrl, setFullUrl] = useState();
    const [subpart, setSubpart] = useState();

    const urlInput = useRef();
    const subpartInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    // create a new link 
    axios.post(process.env.REACT_APP_BASE_URL,  { fullUrl, subpart }, { params: { userId } })
      .then(res => {
        // trigger isChanged flag to refresh links list
        setIsChanged(true)
        clearInput()
      }).catch(err => {
        if (err.response) {
          alert(err.response.data.message)
        }
      })
  }

  const clearInput = () => {
    // clear inputs
    urlInput.current.value = ""
    subpartInput.current.value = ""
    setFullUrl()
    setSubpart()
  }

    return (
      <div>
          <h2>
            Original full URL:
            <input type="text" name="fullUrl" ref={urlInput} onChange={(e) => setFullUrl(e.target.value.trim())} />
          </h2> 
          <p>
          (for example - https://www.google.com)
          </p>
          <h2>
            Shortened URL subpart:
            <input type="text" name="subpart" ref={subpartInput} onChange={(e) => setSubpart(e.target.value.trim())} />
          </h2>
          <p>
          (for example - S4A2S0S) 
          </p>
          <p>
          (it's optional, so we can generate it for you)
          </p>
          <button type="submit" onClick={ handleSubmit }>Shorten URL</button>
      </div>
    )
}

export default CreateLink;