# importing libraries
import speech_recognition as sr
import os
import time
from pydub import AudioSegment
from pydub.silence import split_on_silence

# create a speech recognition object
r = sr.Recognizer()
# a function that splits the audio file into chunks
# and applies speech recognition
def get_large_audio_transcription(path, lang="ru-RU") -> str:
    """
    Splitting the large audio file into chunks
    and apply speech recognition on each of these chunks
    """
    format = get_file_format(path)
    list_of_formats = ["wav", "mp3"]
    # open the audio file using pydub
    if format not in list_of_formats:
        return f"Error: Format .{format} is not supported!"
    else:
        sound = AudioSegment.from_mp3(path)
        # sound = AudioSegment.from_mp3(file=path, format=format)
    # split audio sound where silence is 700 miliseconds or more and get chunks
        chunks = split_on_silence(sound,
                              # experiment with this value for your target audio file
                              min_silence_len=1000,
                              # adjust this per requirement
                              #
                              silence_thresh=sound.dBFS-4,
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
            chunk_filename = os.path.join(folder_name, f"chunk{i}.{format}")
            audio_chunk.export(chunk_filename, format=format)
            # recognize the chunk
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


def timer(func):
    start_time = time.time()
    print(func)
    print("Time: ", time.time() - start_time)


path_ru_off = "audio/Phone_ARU_OFF.wav"
path_ru_on = "audio/Phone_ARU_ON.wav"
path_long_ru_on = "audio/Microphone_ARU_ON.wav"
path_long_ru_off = "audio/Microphone_ARU_OFF.wav"
path_en = "audio/Welcome.wav"
path_long_en = "audio/LongWelcome.wav"
path_long_text = "audio/long_text.mp3"
path_mp3 = "audio/hello.mp3"

timer(get_large_audio_transcription(path=path_mp3, lang="en-US"))

# def startConvertion(path='sample.wav', lang='en-IN'):
#     with sr.AudioFile(path) as source:
#         print('Fetching File')
#         audio_text = r.listen(source)
#         # recoginize_() method will throw a request error if the API is unreachable, hence using exception handling
#         try:
#
#             # using google speech recognition
#             print('Converting audio transcripts into text ...')
#             text = r.recognize_google(audio_text)
#             print(text)
#
#         except:
#             print('Sorry.. run again...')

# startConvertion(path_long_en)

