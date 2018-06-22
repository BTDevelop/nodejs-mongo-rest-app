[![Build status](https://api.travis-ci.org/BTDevelop/nodejs-mongo-rest-app.svg)](https://travis-ci.org/BTDevelop/nodejs-mongo-rest-app)


# nodejs-mongo-rest-app
Node.js, MongoDB, Mocha & Chai 

# Movies

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/movies | `GET` | Empty | List all movies. |
| /api/movies | `POST` | {'title':'test', 'category':'test', 'country':'test', year:2000, director:"id", imdb_score: 0.0 } | Create a new movie. |
| /api/movies/:movie_id | `GET` | Empty | Get a movie. |
| /api/movies/:movie_id | `PUT` | {'name':'test', 'surname':'test'} | Update a movie with new info. |
| /api/movies/:movie_id | `DELETE` | Empty | Delete a movie. |
| /api/movies/top10 | `GET` | Empty | Get the top 10 movies. |
| /api/movies/between/:start_year/:end_year | `GET` | Empty | Movies between two dates. |

# Directors

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /api/directors | `GET` | Empty | List all directors. |
| /api/directors | `POST` | { name: 'test', surname:'test', bio:'test' } | Create a new director. |
| /api/directors/:director_id | `GET` | Empty | Get a director. |
| /api/directors/:director_id | `PUT` | {'name':'test', 'surname':'test', 'bio': 'test'} | Update a director with new info. |
| /api/directors/:director_id | `DELETE` | Empty | Delete a director. |
| /api/directors/:director_id/best10movie | `GET` | Empty | The director's top 10 films. |

# Index

| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /register | `POST` | { username: 'test', password:'password' } | Create a new user. |
| /authenticate | `POST` | { username: 'test', password:'password' } | Generate a token. |

