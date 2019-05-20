# from main.res.vote_classifier import sentiment as vc_sentiment
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from nltk.tokenize import sent_tokenize
from textblob import TextBlob

analyzer = SentimentIntensityAnalyzer()

def sentiment(text, isAnime):
    pos = 0
    neg = 0
    neu = 0

    sentences = sent_tokenize(text)
    for sentence in sentences:
        compound_score = analyzer.polarity_scores(sentence)['compound']
        if compound_score > 0.5:
            pos+=1
        elif compound_score < -0.5:
            neg+=1
        else:
            neu+=1
    
    analysis = TextBlob(text)
    for sentence in analysis.sentences:
        if sentence.sentiment.subjectivity > 0.9:
            if sentence.sentiment.polarity > 0:
                pos+=1
            elif sentence.sentiment.polarity <= 0:
                neg+=1
            else:
                neu+=1

    # if isAnime:
    #     clasification, confidence = vc_sentiment(text)
    #     if confidence >= 0.7:
    #         if clasification == 'pos':
    #             pos+=1
    #         elif confidence == 'neg':
    #             neg+=1
    #         elif confidence == 'neu':
    #             neu+=1

    sentiment_value = ''
    if pos > neg & pos >= neu:
        sentiment_value = 'pos'
    elif neg > pos & neg >= neu:
        sentiment_value = 'neg'
    else:
        sentiment_value = 'neu'

    return sentiment_value
