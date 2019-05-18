from vote_classifier import sentiment

while True:
    review = input("Enter Review :> ")
    s = sentiment(review)
    print(s)
