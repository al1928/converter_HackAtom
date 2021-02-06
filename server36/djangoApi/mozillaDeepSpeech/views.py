from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
import logging


from .converterTextToSpeech import ConverterSpeechToText
import os


class Counter:
    mp3_count = 0
    wav_count = 0


@csrf_exempt
def getTextFromMP3(request):
    """
    Принимает request с аудио файлом формата Mp3, меняет формат на .wav,
    конвертирует в текст и возвращает response с конвертируемым текстом.

    :param request: HttpRequest

    :return: response: HttpResponse
    """
    if request.method == 'POST':

        file = request.FILES['file']

        file_name = os.getcwd() + "\\mozillaDeepSpeech\\audiocash\\" + str(Counter.mp3_count) + ".mp3"
        with open(file_name, "wb") as aud:
            aud_stream = file.read()
            aud.write(aud_stream)

        Counter.mp3_count += 1

        b, path_mono_file = getText(file_name)

        url = os.getcwd() + "\\mozillaDeepSpeech\\audiocash\\" + str(Counter.mp3_count) + ".txt"

        return getResponse(url, b, file_name, path_mono_file)


@csrf_exempt
def getTextFromWAV(request):
    """
    Принимает request с аудио файлом формата Wav, меняет формат на .wav,
    конвертирует в текст и возвращает response с конвертируемым текстом.

    :param request: HttpRequest

    :return: response: HttpResponse
    """
    if request.method == 'POST':
        logger = logging.getLogger("django")

        file = request.FILES['file']

        file_name = os.getcwd() + "\\mozillaDeepSpeech\\audiocash\\" + str(Counter.wav_count) + ".wav"
        with open(file_name, "wb") as aud:
            aud_stream = file.read()
            aud.write(aud_stream)

        Counter.wav_count += 1

        b, path_mono_file = getText(file_name)

        url = os.getcwd() + "\\mozillaDeepSpeech\\audiocash\\" + str(Counter.wav_count) + ".txt"

        return getResponse(url, b, file_name, path_mono_file)


def getText(file_name):
    """
    Возвращает байтовый текст и путь до моно аудио файла.

    :param file_name: str

    :returns: bytes, path_mono_file: str
    """
    converter = ConverterSpeechToText()
    path_mono_file = converter.stereo_to_mono(file_name)
    text = converter.recognition(path_mono_file)

    for i in range(130, len(text), 130):
        text = text[:i] + ' \n ' + text[i:]

    return bytes(text, 'utf-8'), path_mono_file


def getResponse(url, b, file_name, path_mono_file):
    """
    Возвращает response с текстовым файлом и удаляет временные файлы.

    :param path_mono_file: str
    :param file_name: str
    :param b: bytes
    :param url: str

    :return: response: HttpResponse
    """
    with open(url, 'w+b') as txt:
        txt.write(b)

    with open(url, 'r+b') as txt:
        response = HttpResponse(txt, content_type='text/plain;charset=UTF-8')

    os.remove(file_name)
    os.remove(path_mono_file)
    os.remove(url)

    return response
