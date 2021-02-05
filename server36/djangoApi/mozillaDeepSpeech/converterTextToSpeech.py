import os
import re

import deepspeech
import soundfile
from pydub import AudioSegment

AudioSegment.converter = os.getcwd() + "\\ffmpeg.exe"
AudioSegment.ffprobe = os.getcwd() + "\\ffprobe.exe"

from rest_framework.views import APIView
import logging
import wave
import librosa
import numpy as np


class ConverterSpeechToText(APIView):
    path_model_pbmm = os.getcwd() + "\\mozillaDeepSpeech\\modelsConverter\\deepspeech-0.9.3-models.pbmm"
    path_model_scorer = os.getcwd() + "\\mozillaDeepSpeech\\modelsConverter\\deepspeech-0.9.3-models.scorer"

    def stereo_to_mono(self, path_file: str, path_folder=None) -> str:
        logger = logging.getLogger("django")
        logger.info(os.getcwd())
        if path_folder is None:
            folder_name = "audiocash"
        else:
            folder_name = path_folder
        if not os.path.isdir(folder_name):
            os.mkdir(folder_name)
        name = re.split(r'[/,\\, .]+', path_file)
        filename, fileformat = name[-2], name[-1]
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

    def recognition(self, file_name):
        logger = logging.getLogger("django")
        logger.info('баг?')

        model = deepspeech.Model(self.path_model_pbmm)
        model.enableExternalScorer(self.path_model_scorer)
        lm_alpha = 0.75
        lm_beta = 1.85
        model.setScorerAlphaBeta(lm_alpha, lm_beta)
        beam_width = 500
        model.setBeamWidth(beam_width)

        w = wave.open(file_name, 'r')
        rate = w.getframerate()
        frames = w.getnframes()
        buffer = w.readframes(frames)
        if rate != 16000:
            y, s = librosa.load(file_name, sr=16000)
            soundfile.write(file_name, y, s)
            w = wave.open(file_name, 'r')
            rate = w.getframerate()
            frames = w.getnframes()
            buffer = w.readframes(frames)
            logger.info(rate)
        data16 = np.frombuffer(buffer, dtype=np.int16)
        return model.stt(data16)