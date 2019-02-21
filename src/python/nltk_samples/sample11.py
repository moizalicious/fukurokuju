# TEXT CLASSIFICATION

import nltk
import random
from nltk.corpus import movie_reviews
from nltk.classify.scikitlearn import SklearnClassifier
import pickle

from sklearn.naive_bayes import MultinomialNB, GaussianNB, BernoulliNB
from sklearn.linear_model import LogisticRegression, SGDClassifier
from sklearn.svm import SVC, LinearSVC, NuSVC

from nltk.classify import ClassifierI
from statistics import mode

class Vote_Classifier(ClassifierI):
    def __init__(self, *classifiers):
        self._classifiers = classifiers

    def classify(self, features):
        votes = []
        for c in self._classifiers:
            v = c.classify(features)
            votes.append(v)
        return mode(votes)

    def confidence(self, features):
        votes = []
        for c in self._classifiers:
            v = c.classify(features)
            votes.append(v)
        
        choice_votes = votes.count(mode(votes))
        conf = choice_votes / len(votes)
        return conf

documents = [(list(movie_reviews.words(fileid)), category)
                for category in movie_reviews.categories()
                for fileid in movie_reviews.fileids(category)]

# for category in movie_reviews.categories():
#     for fileid in movie_reviews.fileids(category):
#         documents.append(list(movie_reviews.words(fileid)))

random.shuffle(documents)

# print(documents[1])

all_words = []
for w in movie_reviews.words():
    all_words.append(w.lower())

all_words = nltk.FreqDist(all_words)
# print(all_words.most_common(15))
# print(all_words["stupid"])

words_features = list(all_words.keys())[:3000]

def find_features(document):
    words = set(document)
    features = {}
    for w in words_features:
        features[w] = (w in words)

    return features

# print((find_features(movie_reviews.words('neg/cv000_29416.txt'))))

featuresets = [(find_features(rev), category) for (rev, category) in documents]

training_set = featuresets[:1900]
testing_set = featuresets[1900:]

# Naive Bayes Algorithm
# posterior = prior occurences * likelihood / evidence

# classifier = nltk.NaiveBayesClassifier.train(training_set)

# save_classifier = open("naivebayes.pickle", "wb")
# pickle.dump(classifier, save_classifier)
# save_classifier.close()

classifier_f = open("naivebayes.pickle", "rb")
classifier = pickle.load(classifier_f)
classifier_f.close()
print("Original Naive Bayes Algo Accuracy", (nltk.classify.accuracy(classifier, testing_set))*100)
classifier.show_most_informative_features(15)

MNB_classifier = SklearnClassifier(MultinomialNB())
MNB_classifier.train(training_set)
print("MNB_classifier Algo Accuracy", (nltk.classify.accuracy(MNB_classifier, testing_set))*100)

# GNB_classifier = SklearnClassifier(GaussianNB())
# GNB_classifier.train(training_set)
# print("GNB_classifier Algo Accuracy", (nltk.classify.accuracy(GNB_classifier, testing_set))*100)

BNB_classifier = SklearnClassifier(BernoulliNB())
BNB_classifier.train(training_set)
print("BNB_classifier Algo Accuracy", (nltk.classify.accuracy(BNB_classifier, testing_set))*100)

# from sklearn.linear_model import LogisticRegression, SGDClassifier
# from sklearn.svm import SVC, LinearSVC, NuSVC

#  Testing other classifiers (Linear Model)
LR_classifier = SklearnClassifier(LogisticRegression())
LR_classifier.train(training_set)
print("LR_classifier Algo Accuracy", (nltk.classify.accuracy(LR_classifier, testing_set))*100)

SGD_classifier = SklearnClassifier(SGDClassifier())
SGD_classifier.train(training_set)
print("SGD_classifier Algo Accuracy", (nltk.classify.accuracy(SGD_classifier, testing_set))*100)

# SVM
SVC_classifier = SklearnClassifier(SVC())
SVC_classifier.train(training_set)
print("SVC_classifier Algo Accuracy", (nltk.classify.accuracy(SVC_classifier, testing_set))*100)

LSVC_classifier = SklearnClassifier(LinearSVC())
LSVC_classifier.train(training_set)
print("LSVC_classifier Algo Accuracy", (nltk.classify.accuracy(LSVC_classifier, testing_set))*100)

NuSVC_classifier = SklearnClassifier(NuSVC())
NuSVC_classifier.train(training_set)
print("NuSVC_classifier Algo Accuracy", (nltk.classify.accuracy(NuSVC_classifier, testing_set))*100)

voted_classifier = Vote_Classifier(classifier, MNB_classifier, BNB_classifier, LR_classifier, SGD_classifier, SVC_classifier, LSVC_classifier, NuSVC_classifier)
print("Voted Classifier Algo Accuracy", (nltk.classify.accuracy(voted_classifier, testing_set))*100)

print("Classification:", voted_classifier.classify(testing_set[0][0]), "Confidence:", voted_classifier.confidence(testing_set[0][0]))
print("Classification:", voted_classifier.classify(testing_set[1][0]), "Confidence:", voted_classifier.confidence(testing_set[1][0]))
print("Classification:", voted_classifier.classify(testing_set[2][0]), "Confidence:", voted_classifier.confidence(testing_set[2][0]))
print("Classification:", voted_classifier.classify(testing_set[3][0]), "Confidence:", voted_classifier.confidence(testing_set[3][0]))
print("Classification:", voted_classifier.classify(testing_set[4][0]), "Confidence:", voted_classifier.confidence(testing_set[4][0]))
print("Classification:", voted_classifier.classify(testing_set[5][0]), "Confidence:", voted_classifier.confidence(testing_set[5][0]))
