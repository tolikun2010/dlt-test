import { useState, useEffect } from 'react';
import axios from 'axios';

function LinksList({isChanged, setIsChanged, userId}) {
  const [links, setLinks] = useState([]);

   useEffect(() => {
      // get list of links by userId
      if (userId) {
      axios.get(process.env.REACT_APP_BASE_URL, { params: { userId, isChanged } })
      .then(res => {
        const allLinks = (res.data && res.data.length > 0) ?  res.data : []
        setLinks(allLinks)
        setIsChanged(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChanged, userId]);

    const handleSubmit = (event, subpart) => {
      event.preventDefault()
      // delete the link by subpart
      axios.delete(`${process.env.REACT_APP_BASE_URL}${subpart}`, { params: { userId } })
        .then(res => {
          // trigger isChanged flag to refresh links list
          setIsChanged(true)
        }).catch(err => {
          if (err.response) {
            alert(err.response.data.message)
          }
        })
    }

  return (
    <div>
      <form >
      <h2>Your shortened links:</h2>
      <ul>
        {
          links.map(link =>
              <li key={link.subpart}>
                <h3>{link.fullUrl}:</h3> 
                <a href={process.env.REACT_APP_BASE_URL + link.subpart} target="_blank" rel="noopener noreferrer">
                  {process.env.REACT_APP_BASE_URL + link.subpart} 
                </a> 
                <button type="submit" onClick={ (event) => handleSubmit(event, link.subpart) }> DELETE </button>
              </li>
          )
        }
      </ul>
      </form>
    </div>
  );
}

export default LinksList;
