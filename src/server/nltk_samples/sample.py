# TOKENIZING

from nltk.tokenize import sent_tokenize, word_tokenize

# Tokenizing - word tokenizer...sentence tokenizer
# Lexicon and corporas
# Corpora - body of text (ex: medical journals, presidential speeches, English language)
# Lexicon - words and their meanings

#  investor-speak....regular english-speak

#  investor speak 'bull' - someone who is positive about the market
#  english speak 'bull' - scary animal you dont want running @ you

example_text = "Hello Mr.Smith, how are you doing today? The weather is great and python is awesome. The sky is blue and you should not eat cardboard."

# print(sent_tokenize(example_text))
# print(word_tokenize(example_text))

for i in word_tokenize(example_text):
    print(i)
    
