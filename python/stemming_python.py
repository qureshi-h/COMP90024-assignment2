from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize

ps = PorterStemmer()

words = ["anxiety","depression","overwhelmed","therapy","counselling","aumentalhealth"]

filter_words = []

for w in words:
    filter_words.append(w)
    filter_words.append(ps.stem(w))

filter_words = list(dict.fromkeys(filter_words))
print(filter_words)