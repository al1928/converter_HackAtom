from django.http import HttpResponse
from django.shortcuts import render


# Create your views here.
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def getText(request):
    if request.method == 'POST':

        url = "/files/test.txt"
        response = HttpResponse()
        response['X-Accel-Redirect'] = url

        return response
