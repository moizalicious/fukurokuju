from main.sentiment_module import sentiment

while True:
    review = input("Enter Review :> ")
    s = sentiment(review)
    print(s)
