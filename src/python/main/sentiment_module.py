from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from nltk.tokenize import sent_tokenize
from textblob import TextBlob

analyzer = SentimentIntensityAnalyzer()

def sentiment(text):
    pos = 0
    neg = 0
    neu = 0

    sentences = sent_tokenize(text)
    for sentence in sentences:
        compound_score = analyzer.polarity_scores(sentence)['compound']
        if compound_score >= 0.5:
            pos+=1
        elif compound_score <= -0.5:
            neg+=1
        else:
            neu+=1
    
    analysis = TextBlob(text)
    for sentence in analysis.sentences:
        if sentence.sentiment.subjectivity <= 0.5:
            if sentence.sentiment.polarity >= 0.5:
                pos+=1
            elif sentence.sentiment.polarity <= -0.5:
                neg+=1
            else:
                neu+=1

    sentiment = ''
    if pos > neg & pos >= neu:
        sentiment = 'pos'
    elif neg > pos & neg >= neu:
        sentiment = 'neg'
    else:
        sentiment = 'neu'

    return sentiment
