package dbrepo

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/GittipotPh/internal/models"
)

type PostgresDBRepo struct {
	DB *sql.DB
}

const dbTimeout = time.Second * 3

func (m *PostgresDBRepo) Connection() *sql.DB {
	return m.DB
}

func (m *PostgresDBRepo) AllMovies(genre ...int) ([]*models.Movie, error) {

	ctx , cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	where := ""
	if (len(genre) > 0) {
		where = fmt.Sprintf("where id in (select movie_id from movies_genres where genre_id = %d)", genre[0])
	}

	query := fmt.Sprintf(`select id, title, release_date, runtime, mpaa_rating, description, coalesce(image, ''),
	created_at, updated_at from movies %s order by created_at desc`, where)

	var movies []*models.Movie

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var movie models.Movie
		err := rows.Scan(
			&movie.ID,
			&movie.Title,
			&movie.ReleaseDate,
			&movie.RunTime,
			&movie.MPAARating,
			&movie.Description,
			&movie.Image,
			&movie.CreatedAt,
			&movie.UpdatedAt,
		)

		if err != nil {

			return nil, err
		}

		movies = append(movies, &movie)
		
	}

	if err = rows.Err(); err != nil {
		return movies, err
	}

	

	return movies, nil
}

func (m *PostgresDBRepo) GetOneMovieByID (id int) (*models.Movie, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	var movie models.Movie

	query := `select id, title, release_date, runtime, mpaa_rating, description, coalesce(image, ''),
	created_at, updated_at from movies where id = $1 `

	row := m.DB.QueryRowContext(ctx, query , id) 

	err := row.Scan(
		&movie.ID,
			&movie.Title,
			&movie.ReleaseDate,
			&movie.RunTime,
			&movie.MPAARating,
			&movie.Description,
			&movie.Image,
			&movie.CreatedAt,
			&movie.UpdatedAt,

	)
	if err != nil {
		return nil, err
	}

	query = `select g.id, g.genre from movies_genres mg left join genres g on mg.genre_id = g.id
	where mg.movie_id = $1 order by g.genre `

	rows, err := m.DB.QueryContext(ctx, query, id)
	if err != nil && err != sql.ErrNoRows {
		return nil, err
	}

	defer rows.Close()

	var genre []*models.Genre
	for rows.Next() {
		var g models.Genre
		err := rows.Scan(
			&g.ID,
			&g.Genre,
		)

		if err != nil {
			return nil , err
		}

		genre = append(genre, &g)

		
	}

	if err = row.Err() ; err != nil {
		return nil, err
	}  

	movie.Genres = genre

	return &movie, nil

	} 

func (m *PostgresDBRepo) GetUserByEmail(email string) (*models.User , error) {
	ctx , cancle := context.WithTimeout(context.Background(), dbTimeout)
	defer cancle()

	var user models.User

	query := `select id, first_name, last_name, email, password, created_at, updated_at from users
	where email = $1`

	row := m.DB.QueryRowContext(ctx , query, email)

	err := row.Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,

	)

	if err != nil {
		return nil , err
	}

	return &user , nil
}

func (m *PostgresDBRepo) GetUserById (id int) (*models.User , error) {
	ctx, cancel := context.WithTimeout(context.Background(),dbTimeout)
	defer cancel()

	var user models.User

	query := `select id, first_name, last_name, email, password, created_at, updated_at from users
	where id = $1`

	row := m.DB.QueryRowContext(ctx, query, id)

	err := row.Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil , err
	}

	return &user , nil

}

func (m *PostgresDBRepo) OneMovieForEdit (id int) (*models.Movie, []*models.Genre, error) {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
	defer cancel()

	var movie models.Movie

	query := `select id, title, release_date, runtime, mpaa_rating, description, coalesce(image, ''),
	created_at, updated_at from movies where id = $1 `

	row := m.DB.QueryRowContext(ctx, query , id) 

	err := row.Scan(
		&movie.ID,
			&movie.Title,
			&movie.ReleaseDate,
			&movie.RunTime,
			&movie.MPAARating,
			&movie.Description,
			&movie.Image,
			&movie.CreatedAt,
			&movie.UpdatedAt,

	)
	if err != nil {
		return nil, nil, err
	}

	query = `select g.id, g.genre from movies_genres mg left join genres g on mg.genre_id = g.id
	where mg.movie_id = $1 order by g.genre `

	rows, err := m.DB.QueryContext(ctx, query, id)
	if err != nil && err != sql.ErrNoRows {
		return nil, nil,err
	}

	defer rows.Close()

	var genre []*models.Genre
	var genresArray []int

	for rows.Next() {
		var g models.Genre
		err := rows.Scan(
			&g.ID,
			&g.Genre,
		)

		if err != nil {
			return nil , nil, err
		}

		genre = append(genre, &g)
		genresArray = append(genresArray, g.ID)


		
	}

	if err = row.Err() ; err != nil {
		return nil, nil, err
	}  

	movie.Genres = genre
	movie.GenresArray = genresArray

	var allGenres []*models.Genre

	query = `select id, genre from genres order by genre`
	gRows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, nil, err
	}

	defer gRows.Close()

	for gRows.Next() {
		var g models.Genre
		err := gRows.Scan(
			&g.ID,
			&g.Genre,
		)

		if err != nil {
			return nil, nil, err
		}

		allGenres = append(allGenres, &g)
		fmt.Println(allGenres)
	}

	if err = row.Err(); err != nil {
		return nil, nil, err
	}

	

	return &movie, allGenres ,nil

	} 


	func (m *PostgresDBRepo) AllGenres() ([]*models.Genre, error) {
		ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
		defer cancel()

		var allGenres []*models.Genre

		query := `select id, genre, created_at, updated_at from genres order by genre`

		rows, err := m.DB.QueryContext(ctx, query)

		if err != nil {
			return nil , err
		}

		defer rows.Close()

		for rows.Next(){
			var g models.Genre

			err := rows.Scan(
				&g.ID,
				&g.Genre,
				&g.CreatedAt,
				&g.UpdatedAt,
			)

			if err != nil {
				return nil , err
			}

			allGenres = append(allGenres, &g)

		}

		
		if err = rows.Err() ; err != nil {
			return nil, err
		}

		return allGenres, nil
	
	}


	func (m *PostgresDBRepo) InsertMovie(movie models.Movie) (int, error) {
		ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
		defer cancel()

		query := `insert into movies
		(title, description, release_date, runtime, mpaa_rating, created_at, updated_at, image) 
		values ($1 , $2, $3, $4, $5, $6, $7, $8) returning id`

		var newID int

		 err := m.DB.QueryRowContext(ctx, query, 
			movie.Title,
			movie.Description,
			movie.ReleaseDate,
			movie.RunTime,
			movie.MPAARating,
			movie.CreatedAt,
			movie.UpdatedAt,
			movie.Image,
		).Scan(&newID)

		if err != nil { 
			return 0, err
		}

		return newID, nil


	}


func (m *PostgresDBRepo) UpdateMovie(movie models.Movie) error {
	ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
		defer cancel()

		query := `update movies set title = $1, description = $2, release_date = $3, runtime = $4, 
		mpaa_rating = $5, updated_at = $6, image = $7 where id = $8`

		_, err := m.DB.ExecContext(ctx, query, 
			movie.Title,
			movie.Description,
			movie.ReleaseDate,
			movie.RunTime,
			movie.MPAARating,
			movie.UpdatedAt,
			movie.Image,
			movie.ID,
		)

		if err != nil {
			return err
		}

		return nil

}


	func (m *PostgresDBRepo) UpdateMovieGenres(id int, genreIDs []int) error {

		ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
		defer cancel()

		query := `delete from movies_genres where movie_id = $1`

		_, err := m.DB.ExecContext(ctx, query, id)
		if err !=nil {
			return err
		}

		for _, n := range genreIDs {
			query := `insert into movies_genres (movie_id, genre_id) values ($1, $2)`

			_, err := m.DB.ExecContext(ctx, query, id, n )
			if err !=nil {
				return err
			}
		}

		return nil

	}

	func (m *PostgresDBRepo) DeleteMovieByID(id int) error {

		ctx, cancel := context.WithTimeout(context.Background(), dbTimeout)
		defer cancel()

		query := `delete from movies where id = $1`

		_, err := m.DB.ExecContext(ctx, query, id)

		if err !=nil {
			return err
		}


		return nil
	}