from django.http import JsonResponse
from rest_framework.views import APIView

from ..models import Author as AuthorModel


class Authors(APIView):

    def get(self, request):
        authors = list(AuthorModel.objects.all().values())
        return JsonResponse({
            'authors': authors
        })


class Author(APIView):

    def get(self, request, id):
        try:
            author = AuthorModel.objects.get(id=id)
        except AuthorModel.DoesNotExist:
            return JsonResponse({"error": "Author does not exist"})
        return JsonResponse({
            'author': {
                'first_name': author.first_name,
                'last_name': author.last_name,
                'books': list(author.book_set.all().values('id', 'name', 'isbn'))
            }
        })

    def post(self, request):
        data = request.data
        author = AuthorModel(first_name=data['first_name'], last_name=data['last_name'])
        author.save()
        return JsonResponse({
            'author': {
                'first_name': author.first_name,
                'last_name': author.last_name
            }
        })

    def put(self, request, id):
        data = request.data
        try:
            author = AuthorModel.objects.get(id=id)
            author.first_name = data.get('first_name')
            author.last_name = data.get('last_name')
        except AuthorModel.DoesNotExist:
            return JsonResponse({"error": "Author does not exist"})
        author.save()
        return JsonResponse({
            'author': {
                'first_name': author.first_name,
                'last_name': author.last_name
            }
        })