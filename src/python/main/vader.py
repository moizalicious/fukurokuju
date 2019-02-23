from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

while True:
    review = input("Enter Review :> ")
    print(analyzer.polarity_scores(review))
