package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"kadoc-backend/db"
)

type ArticleHandler struct {
	Client *db.PrismaClient
}

type CreateArticleRequest struct {
	Title    string `json:"title"`
	Content  string `json:"content"`
	Category string `json:"category"`
}

func (h *ArticleHandler) GetArticles(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()
	articles, err := h.Client.Article.FindMany().OrderBy(
		db.Article.CreatedAt.Order(db.SortOrderDesc),
	).Exec(ctx)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(articles)
}

func (h *ArticleHandler) CreateArticle(w http.ResponseWriter, r *http.Request) {
	var req CreateArticleRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	created, err := h.Client.Article.CreateOne(
		db.Article.Title.Set(req.Title),
		db.Article.Content.Set(req.Content),
		db.Article.Category.Set(req.Category),
	).Exec(ctx)

	if err != nil {
		fmt.Printf("Error creating article: %v\n", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(created)
}

func (h *ArticleHandler) GetArticle(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if id == "" {
		http.Error(w, "Missing ID", http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	article, err := h.Client.Article.FindUnique(
		db.Article.ID.Equals(id),
	).Exec(ctx)

	if err != nil {
		http.Error(w, "Article not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(article)
}

func (h *ArticleHandler) UpdateArticle(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if id == "" {
		http.Error(w, "Missing ID", http.StatusBadRequest)
		return
	}

	var req CreateArticleRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	updated, err := h.Client.Article.FindUnique(
		db.Article.ID.Equals(id),
	).Update(
		db.Article.Title.Set(req.Title),
		db.Article.Content.Set(req.Content),
		db.Article.Category.Set(req.Category),
	).Exec(ctx)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updated)
}
