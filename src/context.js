import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import CocktailList from './components/CocktailList'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [cocktails, setCocktails] = useState([])

  const fetchDrinks = async ()=>{
    setLoading(true)
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json()
      const {drinks} = data
      if (drinks) {
        const newCocktails = drinks.map((drink)=>{
          const {idDrink, strDrink, strDrinkThumb, strAlcoholic, 
            strGlass} = drink;            
          return {id:idDrink, name:strDrink, image:strDrinkThumb, 
            info: strAlcoholic, glass:strGlass}
        })
        setCocktails(newCocktails) 
      }
      else {
        setCocktails([])
      }
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDrinks()
  }, [searchTerm])

  return <AppContext.Provider 
  value={{
    loading,
    cocktails,
    setSearchTerm
  }}>
    { children }
    </AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
