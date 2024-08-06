package repository

import (
	"database/sql"

	"github.com/GittipotPh/internal/models"
)

type DatabaseRepo interface {
	AllMovies(genre ...int) ([]*models.Movie, error)
	Connection() *sql.DB
	GetUserByEmail(email string) (*models.User , error)
	GetUserById (id int) (*models.User , error)
	OneMovieForEdit (id int) (*models.Movie, []*models.Genre, error)
	GetOneMovieByID (id int) (*models.Movie, error)
	AllGenres() ([]*models.Genre, error)
	InsertMovie(movie models.Movie) (int, error) 
	UpdateMovieGenres(id int, genreIDs []int) error 
	UpdateMovie(movie models.Movie) error
	DeleteMovieByID(id int) error

}