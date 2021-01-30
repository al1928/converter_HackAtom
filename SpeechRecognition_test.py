# importing libraries
import speech_recognition as sr
import os
from pydub import AudioSegment
from pydub.silence import split_on_silence

# create a speech recognition object
r = sr.Recognizer()
# a function that splits the audio file into chunks
# and applies speech recognition
def get_large_audio_transcription(path, lang="ru-RU", format="wav"):
    """
    Splitting the large audio file into chunks
    and apply speech recognition on each of these chunks
    """
    # open the audio file using pydub
    sound = AudioSegment.from_wav(path)
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
        chunk_filename = os.path.join(folder_name, f"chunk{i}.wav")
        audio_chunk.export(chunk_filename, format="wav")
        # recognize the chunk
        with sr.AudioFile(chunk_filename) as source:
            audio_listened = r.record(source)
            # try converting it to text
            try:
                text = r.recognize_google(audio_listened, language="ru-RU")
            except sr.UnknownValueError as e:
                print("Error:", str(e))
            else:
                text = f"{text.capitalize()}. "
                # print(chunk_filename, ":", text)
                whole_text += text
    # return the text for all chunks detected
    return whole_text

path_ru_off = "audio/Phone_ARU_OFF.wav"
path_ru_on = "audio/Phone_ARU_ON.wav"
path_long_ru_on = "audio/Microphone_ARU_ON.wav"
path_long_ru_off = "audio/Microphone_ARU_OFF.wav"
path_en = "audio/Welcome.wav"
path_long_en = "audio/LongWelcome.wav"
print("\nFull text:", get_large_audio_transcription(path_ru_off))
print("\nFull text:", get_large_audio_transcription(path_ru_on))
print("\nFull text:", get_large_audio_transcription(path_long_ru_off))
print("\nFull text:", get_large_audio_transcription(path_long_ru_on))

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

