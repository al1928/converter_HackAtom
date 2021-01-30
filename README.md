# converter_HackAtom

Кейс: 
Интеллектуальный сервис по распознаванию текста из аудио
источника для конспектирования учебных занятий и видеолекций.
Решением может быть приложение или веб-сервис на основе
существующих opensource инструментов, преобразующее аудиозапись в
текст.
Источник входных данных - файл аудиозаписи в формате mp3.
Выходной файл – текстовый документ в формате txt.

Потенциальные фреймворки для преобразования голоса в текст:

Vosk - https://github.com/alphacep/vosk-api, https://alphacephei.com/vosk/

CMUSphinxs - https://cmusphinx.github.io

SpeechRecognition - https://github.com/Uberi/speech_recognition

Pocketsphinx Python - https://pypi.org/project/pocketsphinx/

Julius - https://github.com/julius-speech/julius

Pyjulius3 - https://github.com/bachmmmar/pyjulius

VoxForge - http://www.voxforge.org (http://www.voxforge.org/)

Pywit - https://github.com/wit-ai/pywit

Apiai-python-client - https://github.com/nivcaner/apiai-python-client

Возможные библиотеки и плагины JS:

Голос-commands.js
JuliusJS
Pocketsphinx.js
Voix JS
Annyang
Artyom.js

вход: аудио файл на русском/английском языке (!формат файла)

выход: текстовый документ (!формат) с транскрипцией на русском языке - возможно придется встроить переводчик

Степень реализации (готовности) - 30 баллов.
✓ Наличие и качество описания кода – 20 баллов.
✓ Презентация проекта – 15 баллов.
✓ Описание используемых фреймворков и библиотек – 5 баллов.
✓ Уровень реализации (сложность используемых алгоритмов) – 10 баллов.
✓ Универсальность решения (кроссплатформенность) – 5 баллов.


Сделать лендинг с формой загрузки фалйа (+драгЭндДроп) и выбором формата выгрузки (.doc, .txt)
