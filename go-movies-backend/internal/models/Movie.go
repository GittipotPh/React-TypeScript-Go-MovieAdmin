package models

import "time"

type Movie struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	ReleaseDate time.Time `json:"release_date"`
	RunTime int `json:"runtime"`
	MPAARating string  `json:"mpaa_rating"`
	Description string `json:"description"`
	Image string `json:"image"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
	Genres []*Genre `json:"genres,omitempty"`
	GenresArray []int `json:"genre_array,omitempty"`
}

type Genre struct {
	ID int `json:"id"`
	Genre string `json:"genre"`
	Checked bool `json:"checked"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type MovieAPICatch struct {
		ID int `json:"id"`
		Title string `json:"original_title"`
		ReleaseDate string `json:"release_date"`
		Runtime int `json:"runtime"`
		MPAARating string `json:"mpaa_rating"`
		Description string `json:"overview"`
		Image string `json:"poster_path"`
}