import { createContext, useState } from 'react';

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {[id,...ids]},
  removeFavorite: (id) => {}
});

function FavoritesContextProvider({children}) {
    const [favoriteMealIds , setFavroitesMealIds] = useState([]) 
function addFavoriteHandler(id){
setFavroitesMealIds((currentFavIds)  =>     [...currentFavIds , id])
}

function removeFavoriteHandler(id){
    setFavroitesMealIds((currentFavIds)  =>   currentFavIds.filter((mealId => mealId.id !== id ))  )
}

const valueHandler = {
    ids :  favoriteMealIds , 
    addFavorite : addFavoriteHandler , 
    removeFavorite : removeFavoriteHandler
}

    return <FavoritesContext.Provider value={valueHandler}>{children}</FavoritesContext.Provider>
}

export default FavoritesContextProvider;    