from django.http import JsonResponse
from rest_framework.views import APIView

from ..models import Book as BookModel


class Books(APIView):

    def get(self, request):
        books = list(BookModel.objects.all().values())
        return JsonResponse({
            'books': books
        })


class Book(APIView):

    def get(self, request, id):
        try:
            book = BookModel.objects.get(id=id)
        except BookModel.DoesNotExist:
            return JsonResponse({"error": "Book does not exist"})
        return JsonResponse({
            'book': {
                'name': book.name,
                'isbn': book.isbn,
                'author': {
                    "id": book.author.id,
                    "first_name": book.author.first_name,
                    "last_name": book.author.last_name
                }
            }
        })

    def post(self, request):
        data = request.data
        book = BookModel(
            name=data['name'],
            isbn=data['isbn'],
            author_id=data.get('author_id')
        )
        book.save()
        return JsonResponse({
            'book': {
                'name': book.name,
                'isbn': book.isbn,
                'author': {
                    "id": book.author.id,
                    "first_name": book.author.first_name,
                    "last_name": book.author.last_name
                }
            }
        })

    def put(self, request, id):
        data = request.data
        try:
            book = BookModel.objects.get(id=id)
            book.name = data.get('name')
            book.isbn = data.get('isbn')
            book.author_id = data.get('author_id')
        except BookModel.DoesNotExist:
            return JsonResponse({"error": "Book does not exist"})
        book.save()
        return JsonResponse({
            'book': {
                'name': book.name,
                'isbn': book.isbn,
                'author': {
                    "id": book.author.id,
                    "first_name": book.author.first_name,
                    "last_name": book.author.last_name
                }
            }
        })
