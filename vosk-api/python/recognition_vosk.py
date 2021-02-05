#!/usr/bin/env python3

import audioop
from datetime import datetime
import json
import os
import re
import wave
import subprocess
import sys

from vosk import Model, KaldiRecognizer, SetLogLevel
from pydub import AudioSegment


def stereo_to_mono(path_file: str, path_folder=None) -> str:
    if path_folder is None:
        folder_name = "audiocash"
    else:
        folder_name = path_folder
    if not os.path.isdir(folder_name):
        os.mkdir(folder_name)
    file = re.split(r'[/,\\, .]+', path_file)
    filename, fileformat = file[-2], file[-1]
    try:
        if fileformat == "wav":
            sound = AudioSegment.from_wav(path_file)
        elif fileformat == "mp3":
            sound = AudioSegment.from_mp3(path_file)
        else:
            return f"Формат .{fileformat} не поддерживается!"
        sound = sound.set_channels(1)
        path_mono_file = os.path.join(folder_name, f"{filename}_mono.wav")
        sound.export(path_mono_file, format="wav")
        print(f"Аудиофайл успешно преобразован в {path_mono_file}!")
        return path_mono_file
    except:
        return "Ошибка при конвертации аудиофайла в Mono!"


def downsampleWav(src, dst, inrate=44100, outrate=16000, inchannels=2, outchannels=1):
    if not os.path.exists(src):
        print('Source not found!')
        return False
    if not os.path.exists(os.path.dirname(dst)):
        os.makedirs(os.path.dirname(dst))
    try:
        s_read = wave.open(src, 'r')
        s_write = wave.open(dst, 'w')
    except:
        print('Failed to open files!')
        return False
    n_frames = s_read.getnframes()
    data = s_read.readframes(n_frames)
    try:
        converted = audioop.ratecv(data, 2, inchannels, inrate, outrate, None)
        if outchannels == 1:
            converted = audioop.tomono(converted[0], 2, 1, 0)
    except:
        print('Failed to downsample wav')
        return False
    try:
        s_write.setparams((outchannels, 2, outrate, 0, 'NONE', 'Uncompressed'))
        s_write.writeframes(converted)
    except:
        print('Failed to write wav')
        return False
    try:
        s_read.close()
        s_write.close()
    except:
        print("Failed to close wav files")
        return False
    return True


def recognition_vosk(filename: str, model) -> dict:
    wf = wave.open(filename, "rb")
    sample_rate = 16000
    rec = KaldiRecognizer(model, wf.getframerate())
    while True:
        data = wf.readframes(4000)
        if len(data) == 0:
            break
        if rec.AcceptWaveform(data):
            res = json.loads(rec.PartialResult())
            # print(res)
    res = json.loads(rec.PartialResult())
    return res["partial"]

# model_en_big = Model(r"C:\Users\Lenovo\Desktop\vosk_model\vosk-model-en-us-aspire-0.2")
# model_en_indian = Model(r"C:\Users\Lenovo\Desktop\vosk_model\vosk-model-en-in-0.4")
# model_en_daanzu_small = Model(r"C:\Users\Lenovo\Desktop\vosk_model\vosk-model-en-us-daanzu-20200905-lgraph")
# model_en_daanzu_big = Model(r"C:\Users\Lenovo\Desktop\vosk_model\vosk-model-en-us-daanzu-20200905")
# model_ru_small = Model(r"C:\Users\Lenovo\Desktop\vosk_model\vosk-model-small-ru-0.4")
model_ru_big = Model(r"C:\Users\Lenovo\Desktop\vosk_model\vosk-model-ru-0.10")


en_mp3 = r"C:\Users\Lenovo\Desktop\test_libs_converter\vosk-api\python\example\audio.mp3"
ru_mp3 = r"C:\Users\Lenovo\Desktop\ivent\hackAtom\converter_HackAtom\audio\аудиозапись.mp3"

start_time = datetime.now()
print("Start:", start_time)
wav = stereo_to_mono(ru_mp3)
print(recognition_vosk(wav, model_ru_big))
print("Finish", datetime.now() - start_time)

# if not os.path.exists("model"):
#     print ("Please download the model from https://alphacephei.com/vosk/models and unpack as 'model' in the current folder.")
#     exit (1)



