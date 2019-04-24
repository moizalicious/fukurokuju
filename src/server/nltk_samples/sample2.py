# STOP WORDS

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

example_text = "Hello Mr.Smith, how are you doing today? The weather is great and python is awesome. The sky is blue and you should not eat cardboard."

stop_words = set(stopwords.words('english'))

# print(stop_words)

words = word_tokenize(example_text)

filtered_sentence = []

for w in words:
    if w not in stop_words:
        filtered_sentence.append(w)

print(filtered_sentence)
