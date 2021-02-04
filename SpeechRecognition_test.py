# importing libraries
import speech_recognition as sr
import os
from datetime import datetime
from pydub import AudioSegment
from pydub.silence import split_on_silence


def convert_mp3_to_wav(mp3_filename: str) -> str:
    # конвертирует mp3 в wav, сохраняет полученный файл в папку
    # ПОДУМАТЬ НАД ОЧИЩЕНИЕМ ПАПКИ (или полное ее удаление)
    sound = AudioSegment.from_mp3(mp3_filename)
    folder_name = "audiocash"
    if not os.path.isdir(folder_name):
        os.mkdir(folder_name)
    wav_filename = mp3_filename.split("\\")[-1].split(".")[0]
    # path_wav_file = f"{folder_name}/{wav_filename}.wav"
    path_wav_file = os.path.join(folder_name, f"{wav_filename}.wav")
    sound.export(path_wav_file, format="wav")
    return path_wav_file


def get_large_audio_transcription(path, lang="ru-RU") -> str:
    """
    Splitting the large audio file into chunks
    and apply speech recognition on each of these chunks
    """
    # create a speech recognition object
    r = sr.Recognizer()
    format = get_file_format(path)
    list_of_formats = ["wav", "mp3"]
    # open the audio file using pydub
    if format not in list_of_formats:
        return f"Error: Format .{format} is not supported!"
    elif get_file_format(path) != "wav":
        path = convert_mp3_to_wav(path)
    sound = AudioSegment.from_wav(path)
    # split audio sound where silence is 700 miliseconds or more and get chunks
    # ПОДКРУТИВ ТУТ, МОЖНО УВЕЛИЧИТЬ КАЧЕСТВО РАЗБИЕНИЯ -> УВЕЛИЧИТЬ КАЧЕСТВО РАСПОЗНАВАНИЯ
    chunks = split_on_silence(sound,
                          # experiment with this value for your target audio file
                          min_silence_len=1000,
                          # adjust this per requirement
                          silence_thresh=sound.dBFS-16,
                          # keep the silence for 1 second, adjustable as well
                          keep_silence=True,
                          )
    folder_name = "audio-chunks"
    # create a directory to store the audio chunks
    if not os.path.isdir(folder_name):
        os.mkdir(folder_name)
    whole_text = ""
    # process each chunk
    for i, audio_chunk in enumerate(chunks, start=1):
        # export audio chunk and save it in
        # the `folder_name` directory.
        chunk_filename = os.path.join(folder_name, f"chunk{i}.wav")
        audio_chunk.export(chunk_filename, format="wav")
        # recognize the chunk
        # РАССПАРАЛЛЕЛИТЬ ТО, ЧТО НИЖЕ!
        with sr.AudioFile(chunk_filename) as source:
            audio_listened = r.record(source)
            # try converting it to text
            try:
                text = r.recognize_google(audio_listened, language=lang)
            except sr.UnknownValueError as e:
                print("Error:", str(e))
            else:
                text = f"{text.capitalize()}. "
                # print(chunk_filename, ":", text)
                whole_text += text
    # return the text for all chunks detected
    return whole_text


def get_file_format(path) -> str:
    return path.split(".")[-1]

# не рабочие пут
path_ru_off = "audio/Phone_ARU_OFF.wav"
path_ru_on = "audio/Phone_ARU_ON.wav"
path_long_ru_on = "audio/Microphone_ARU_ON.wav"
path_long_ru_off = "audio/Microphone_ARU_OFF.wav"
path_en = "audio/Welcome.wav"
path_long_en = "audio/LongWelcome.wav"

# рабочие пути
path_mp3 = r"audio\short_mp3.mp3"
test_en = r"audio\audio.mp3"
test_ru = r"audio\аудиозапись.mp3"
hi_en = r"audio\text_1_full.mp3"
welcome_en = r"audio\Welcome.wav"
one_en = r"audio\1.mp3"

start_time = datetime.now()
print("Runtime: ", start_time)
print(get_large_audio_transcription(path=path_mp3, lang="en-US"))
print("Time: ", datetime.now() - start_time)

