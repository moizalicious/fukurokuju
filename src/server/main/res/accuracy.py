from sentiment_module import sentiment

import io

pos_count = 0
pos_correct = 0

pos_lines = io.open("main/res/data/sample/positive.txt", encoding="latin-1").read().split('\n')

for line in pos_lines:
    if sentiment(line, isAnime=False) == 'pos':
        pos_correct += 1
    pos_count += 1

neg_count = 0
neg_correct = 0

neg_lines = io.open("main/res/data/sample/negative.txt", encoding="latin-1").read().split('\n')

for line in neg_lines:
    if sentiment(line, isAnime=False) == 'neg':
        neg_correct += 1
    neg_count += 1

print("Positive Accuracy: {}%, Sample Size: {}, Correct Identified: {}".format((pos_correct/pos_count)*100.0, pos_count, pos_correct))
print("Negative Accuracy: {}%, Sample Size: {}, Correct Identified: {}".format((neg_correct/neg_count)*100.0, neg_count, neg_correct))
