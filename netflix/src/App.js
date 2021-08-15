import React, { useEffect, useState } from 'react'
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'
//import env from 'react-dotenv'



export default () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] =  useState(null) 
  const [blackHeader, setBlackHeader] = useState(false)
  //console.log(env.API_KEY)

  useEffect(() => {
    const loadAll = async () => {
      
      // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      // Pegando o Featured
      let originals = list.filter(i=>i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)

      console.log(chosenInfo)
    }

    loadAll()
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className="page">
     {/* Header 
     Destaque
     Lista 
     Rodapé básico */}
     <Header black={blackHeader} />
     {featuredData &&
      <FeaturedMovie item={featuredData} />
     }

     <section className="lists">
       {movieList.map((item, key) => (
         <MovieRow key={key} title={item.title} items={item.items} />
       ))}
     </section>

     <footer>
       Feito com <span role="img" aria-label="coração">💖</span> pela W7Web<br/>
       Direitos de imagem para Netflix<br/>
       Dados pegos do site
       <div className="tmdb--logo">
          <a href="https://www.themoviedb.org">
            <img 
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" 
            alt="TMDB"
            />
          </a>
       </div>
     </footer>
    </div>
  );
}