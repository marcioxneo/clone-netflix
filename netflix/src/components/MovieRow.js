import React from 'react'
import './MovieRow.css'
import env from 'react-dotenv'

const poster = env.POSTER

export default ({title, items}) => {
  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow--listarea">
        <div className="movieRow--list">
          {items.results.length > 0 && items.results.map((item, key) => (
            <div key={key} className="movieRow--item">
              <img src={`${poster}${item.poster_path}`} alt={item.original_title} />
            </div>
          ))}
        </div>
        
      </div>
    </div>
  )
}