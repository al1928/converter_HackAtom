#!/usr/bin/env python3
import wave

import pydub
from vosk import Model, KaldiRecognizer
import json
import os
import time


def get_model(lang="ru") -> str:
    # по указанному языку возвращает название требуемой папки модели
    model_package = "model_" + lang
    if not os.path.exists(model_package):
        print("Модель для выбранного языка необнаруженна! "
              "Обратитесь в техническую поддержку платформы.")
        exit(1)
    model = Model(model_package)
    return model


def convert_wav_to_text(filename) -> str:
    wf = wave.open(filename, "rb")
    # wf.read(44) # skip header
    # You can also specify the possible word list
    # rec = KaldiRecognizer(model, 16000, "zero oh one two three four five six seven eight nine")
    rec = KaldiRecognizer(model, wf.getframerate())
    while True:
        data = wf.readframes(4000)
        if len(data) == 0:
            break
        if rec.AcceptWaveform(data):
            res = json.loads(rec.Result())
            print(res['text'])

    res = json.loads(rec.FinalResult())
    return res['text']


def timer(func):
    start_time = time.time()
    print(func)
    print("Time: ", time.time() - start_time)


# Large vocabulary free form recognition
model = get_model("ru")
path_ru_file = "Phone_ARU_ON.wav"
path_en_file = "LongWelcome.wav"
timer(convert_wav_to_text(path_ru_file))

# from os import path
# from pydub import AudioSegment
# pydub.AudioSegment.ffmpeg = r"C:\Users\Lenovo\Desktop\ffmpeg-4.3.1-win64-static\bin\ffmpeg.exe"
# # files
# src = "1.mp3"
# dst = "qw.wav"
#
# # convert wav to mp3
# sound = AudioSegment.from_mp3(src)
# sound.export(dst, format="wav")




