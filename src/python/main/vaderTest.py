from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

while True:
    review = input("Enter Review :> ")
    polarity_scores = analyzer.polarity_scores(review)
    print(polarity_scores)
