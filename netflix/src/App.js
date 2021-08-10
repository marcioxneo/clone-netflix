import React, { useEffect, useState } from 'react'
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'

export default () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] =  useState(null)

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a liusta TOTAL
      let list = await Tmdb.getHomeList()
      setMovieList(list)
    }

    loadAll()
  }, []);

  return (
    <div className="page">
     {/* Header 
     Destaque
     Lista 
     Rodapé básico */}

     <section className="lists">
       {movieList.map((item, key) => (
         <MovieRow key={key} title={item.title} items={item.items} />
       ))}
     </section>
    </div>
  );
}