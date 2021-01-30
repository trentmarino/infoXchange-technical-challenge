
from django.urls import path
from .Views.books import Books, Book
from .Views.authors import Author, Authors

urlpatterns = [
    path('books/', Books.as_view()),
    path('authors/', Authors.as_view()),
    path('author/', Author.as_view()),
    path('book/', Book.as_view()),
    path('book/<id>', Book.as_view()),
    path('author/<id>', Author.as_view()),
]
