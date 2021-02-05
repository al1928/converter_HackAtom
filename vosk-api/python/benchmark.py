from jiwer import *
import Levenshtein
from datetime import datetime


def benchmark(ground_truth, hypothesis):
    measures = compute_measures(ground_truth, hypothesis)
    wer = measures['wer']
    mer = measures['mer']
    wil = measures['wil']
    print("_"*30, f"\nWER: {wer};\nMER: {mer};\nWIL: {wil}\n", "_"*30, sep='')


# start_time = datetime.now()
# print("Runtime: ", start_time)
# hyp = get_large_audio_transcription(test_ru, "ru_RU")
# print("Time: ", datetime.now() - start_time)

txt_folder = "txtcash/"

truth = open(r"C:\Users\Lenovo\Desktop\test_libs_converter\txtcash\audio.txt", 'r')
truth = truth.read()
hyp = open(txt_folder+"аудиозапись_vosk_big.txt", 'r')
hyp = hyp.read()

benchmark(truth, hyp)
