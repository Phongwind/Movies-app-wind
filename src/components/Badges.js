import React from "react";
import Badge from 'react-bootstrap/Badge'

function Badges (props) {
  const filteredGenres = props.genres.filter(genre =>
    props.movie.genre_ids.includes(genre.id)
  );
  const names = filteredGenres.map(({ name }) => name);
  return (
    <div>
      {names.map(name => (
        <Badge pill key={name} style={{ margin: 5, backgroundColor: '#E6B91E', color: 'black' }}>
          {name}
        </Badge>
      ))}
    </div>
  );
}

export default Badges;
