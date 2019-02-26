from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

def sentiment(review):
    polarity_scores = analyzer.polarity_scores(review)
    print(polarity_scores)
    return polarity_scores
