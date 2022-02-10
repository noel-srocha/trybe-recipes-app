import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import RecipeProvider from './context/RecipeProvider';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import DrinksExplorer from './pages/DrinksExplorer';
import FoodsExplorer from './pages/FoodsExplorer';
import FoodsByOrigin from './pages/FoodByOrigin';
import Explorer from './pages/Explorer';
import ExploreByIngredients from './pages/ExploreByIngredients';
import CompletedRecipes from './pages/CompletedRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';
import MealsDetails from './pages/MealsDetails';
import DrinksDetails from './pages/DrinksDetails';
import Login from './pages/Login';
import CurrentMeal from './pages/CurrentMeal';
import CurrentDrink from './pages/CurrentDrink';

import './App.css';
import NotFound from './pages/NotFound';

function App() {
  return (
    <RecipeProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Foods } />
          <Route exact path="/bebidas" component={ Drinks } />
          <Route exact path="/explorar/comidas" component={ FoodsExplorer } />
          <Route exact path="/receitas-feitas" component={ CompletedRecipes } />
          <Route exact path="/explorar/bebidas" component={ DrinksExplorer } />
          <Route exact path="/explorar" component={ Explorer } />
          <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
          <Route exact path="/explorar/comidas/area" component={ FoodsByOrigin } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreByIngredients }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExploreByIngredients }
          />
          <Route exact path="/comidas/:id" component={ MealsDetails } />
          <Route exact path="/bebidas/:id" component={ DrinksDetails } />
          <Route exact path="/comidas/:id/in-progress" component={ CurrentMeal } />
          <Route exact path="/bebidas/:id/in-progress" component={ CurrentDrink } />
          <Route exact path="/perfil" component={ Profile } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    </RecipeProvider>
  );
}

export default App;
