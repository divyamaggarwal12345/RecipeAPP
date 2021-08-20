import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

function App() {

    const APP_ID = "582d5013";
    const APP_KEY = "dddfa669a861f8c16eeccd1f3a3fae03";

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('chicken');
    
     useEffect(() => {
      getRecipes();
     },[query])

    const getRecipes = async () => {
     const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
     const data = await response.json();
     setRecipes(data.hits);
    }

      const updateSearch = (e) => {
         setSearch(e.target.value);
      }

      const getSearch = (e) => {
        e.preventDefault();
        setQuery(search);
        setSearch('')
      }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}></input>
        <button className="search-button" type ="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe title ={recipe.recipe.label}
                key={recipe.recipe.label}
                calories={recipe.recipe.calories}
                ingredients={recipe.recipe.ingredients} 
                image={recipe.recipe.image}/>
      ))}
      </div>
    </div>
  );
}

export default App;
