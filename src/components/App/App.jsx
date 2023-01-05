import {useState, useEffect} from 'react';  // object destructuring: I only want to use these things from the Library, keeps down the bulk
import axios from 'axios';

// const creatureData = [
//   {name :'Unicorn', origin: 'Britain'},
//     {name : 'Sphinx', origin: 'Egypt'},
//     {name: 'Jackalope', origin: 'America'},
//     {name: 'Vampire', origin: 'Transylvania'}
// ];

function App () {
  const [creatureList, setCreatureList] = useState([]); // this array is default creature array
  const [newCreatureName, setNewCreatureName] = useState('');   // empty string because this is the default value
  const [newCreatureOrigin, setNewCreatureOrigin] = useState(''); // setters update using inputs

  useEffect(() => {
    fetchCreatures();
  }, []); // this array is setting up where fetchCreatures should fire off
  
  const fetchCreatures = () => {
    // Axios({
    //   method: 'GET',
    //   url: '/creature'
    // }) // this is the same as Axios.get below

    axios.get('/creature')
    .then((response) => {
      console.log('response from GET creatures', response.data);
      setCreatureList(response.data);
    })
    .catch((error) => {
      console.log("error getting creatures", error);
    })
  }

  const addCreature = (event) => {
    event.preventDefault(); // to prevent instant refresh- w/out this the page will refresh so fast
    console.log('add creature clicked!', newCreatureName, newCreatureOrigin);
    // post request goes here
    axios({
      method: 'POST',
      url: '/creature',
      data: {
        name: newCreatureName,
        origin: newCreatureOrigin
      }
    })
    .then((response) => {
      console.log(response);
      fetchCreatures(); // gotta call this to have it show up on the DOM
      setNewCreatureOrigin('');
      setNewCreatureName('');
    })
    .catch((error) => {
      console.log(error)
    });
  }

  return (
    <div>
      <h2>Add Creature</h2>
      <h4>{newCreatureName}</h4>
      <h4>{newCreatureOrigin}</h4>
      <form onSubmit={addCreature}>
        <label htmlFor="name">Name:</label>
        <input 
        value={newCreatureName} 
        type="text" id="name" 
        onChange={(event) => setNewCreatureName(event.target.value)} />  
        <label htmlFor="origin">Origin:</label>
        <input 
        value={newCreatureOrigin} 
        type="text" id="origin" 
        onChange={(event) => setNewCreatureOrigin(event.target.value)} />
        <button type="submit">Add New Creature</button>
      </form>
      {/* <p>{JSON.stringify(creatureList)}</p> */}
      <ul>
        {creatureList.map(creature => (
          <li key={creature.id}>
            {creature.name} is from {creature.origin}
          </li>
        ))}
      </ul>
    </div>
  );

};

export default App
