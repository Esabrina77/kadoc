package routes

import (
	"net/http"

	"kadoc-backend/db"
	"kadoc-backend/handlers"
)

func RegisterRoutes(mux *http.ServeMux, client *db.PrismaClient) {
	snippetHandler := &handlers.SnippetHandler{Client: client}
	articleHandler := &handlers.ArticleHandler{Client: client}

	// Snippets
	mux.HandleFunc("GET /api/snippets", snippetHandler.GetSnippets)
	mux.HandleFunc("POST /api/snippets", snippetHandler.CreateSnippet)
	mux.HandleFunc("GET /api/snippets/{id}", snippetHandler.GetSnippet)
	mux.HandleFunc("PUT /api/snippets/{id}", snippetHandler.UpdateSnippet)

	// Articles
	mux.HandleFunc("GET /api/articles", articleHandler.GetArticles)
	mux.HandleFunc("POST /api/articles", articleHandler.CreateArticle)
	mux.HandleFunc("GET /api/articles/{id}", articleHandler.GetArticle)
	mux.HandleFunc("PUT /api/articles/{id}", articleHandler.UpdateArticle)
}
