#!/usr/bin/env python3
import json
import os
import datetime
import wave
import pydub

from vosk import Model, KaldiRecognizer
from pydub import AudioSegment


def get_model(lang="ru") -> str:
    # по указанному языку возвращает название требуемой папки модели
    model_package = "model_" + lang
    if not os.path.exists(model_package):
        print("Модель для выбранного языка необнаруженна! "
              "Обратитесь в техническую поддержку платформы.")
        exit(1)
    model = Model(model_package)
    return model


def get_file_format(path: str) -> str:
    return path.split(".")[-1]


def convert_wav_to_text(model, filename) -> str:
    # извлекает текст из файла формата .wav
    if get_file_format(filename) != "wav":
        filename = convert_mp3_to_wav(filename)
    wf = wave.open(filename, "rb")
    print(f"\nWavFilename {filename}\n", "#"*30)
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
    start_time = datetime.now()
    print(func)
    print("Time: ", datetime.now() - start_time)


def convert_mp3_to_wav(mp3_filename: str) -> str:
    # конвертирует mp3 в wav, сохраняет полученный файл в папку
    # ПОДУМАТЬ НАД ОЧИЩЕНИЕМ ПАПКИ (или полное ее удаление)
    sound = AudioSegment.from_mp3(mp3_filename)
    folder_name = "audiocash"
    if not os.path.isdir(folder_name):
        os.mkdir(folder_name)
    wav_filename = mp3_filename.split(".")[0]
    # path_wav_file = f"{folder_name}/{wav_filename}.wav"
    path_wav_file = os.path.join(folder_name, f"{wav_filename}.wav")
    sound.export(path_wav_file, format="wav")
    return path_wav_file

model = get_model("en")
path_ru_file = "Phone_ARU_ON.wav"
path_en_file = "LongWelcome.wav"

mp3_filename1 = "1.mp3"
mp3_filename2 = "text_1_full.mp3"


test_en = "audio.mp3"
test_ru = "аудиозапись.mp3"
timer(convert_wav_to_text(model, mp3_filename1))





