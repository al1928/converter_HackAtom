from django.http import HttpResponse, FileResponse
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
import logging

from django.http import HttpResponseRedirect

from .converterTextToSpeech import ConverterSpeechToText
import os
from . import benchmark


class Counter:
    mp3_count = 0
    wav_count = 1


@csrf_exempt
def getTextFromMP3(request):
    if request.method == 'POST':
        logger = logging.getLogger("django")

        file = request.FILES['file']

        file_name = os.getcwd() + "\\mozillaDeepSpeech\\audiocash\\" + str(Counter.mp3_count) + ".mp3"
        with open(file_name, "wb") as aud:
            aud_stream = file.read()
            aud.write(aud_stream)
            Counter.mp3_count += 1
            logger.info(Counter.mp3_count)

        converter = ConverterSpeechToText()
        path_mono_file = converter.stereo_to_mono(file_name)
        logger.info(path_mono_file)
        text = converter.recognition(path_mono_file)
        b = bytes(text, 'utf-8')

        url = os.getcwd() + "\\mozillaDeepSpeech\\audiocash\\" + str(Counter.wav_count) + ".txt"

        logger = logging.getLogger("django")

        truth = open(os.getcwd() + "\\converter\\file\\audio.txt", 'r')
        truth = truth.read()
        hyp = open(os.getcwd() + "\\converter\\audiocash\\1.txt", 'r')
        hyp = hyp.read()

        benchmark(truth, hyp)

        with open(url, 'r+b') as txt:
            txt.write(b)
            response = HttpResponse(txt, content_type='text/plain;charset=UTF-8')

        return response


@csrf_exempt
def getTextFromWAV(request):
    if request.method == 'POST':
        logger = logging.getLogger("django")

        file = request.FILES['file']

        file_name = os.getcwd() + "\\mozillaDeepSpeech\\audiocash\\" + str(Counter.wav_count) + ".wav"
        with open(file_name, "wb") as aud:
            aud_stream = file.read()
            aud.write(aud_stream)
            Counter.wav_count += 1
            logger.info(Counter.wav_count)

        converter = ConverterSpeechToText()
        path_mono_file = converter.stereo_to_mono(file_name)
        logger.info(path_mono_file)
        text = converter.recognition(path_mono_file)
        b = bytes(text, 'utf-8')

        url = os.getcwd() + "\\mozillaDeepSpeech\\audiocash\\" + str(Counter.wav_count) + ".txt"

        with open(url, 'r+b') as txt:
            txt.write(b)
            response = HttpResponse(txt, content_type='text/plain;charset=UTF-8')

        return response
