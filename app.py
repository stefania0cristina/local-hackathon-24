from flask import Flask
from flask import request
from flask_cors import CORS
import utils
from sentence_generator import generate_sentence

app = Flask(__name__)
CORS(app)

normalised_tweets = []

with open("normalised_tweets.txt", "r") as file:
    for line in file.read().split("\n"):
        normalised_tweets.append(line.split())

@app.route("/", methods=['POST','GET'])
def home_page():
    if request.method == 'POST':
        print("post received")
        print(request.json)
        data_in = request.json["data"]
        sentiment = utils.GetSentiment(data_in)
        keywords = utils.get_keywords(data_in, normalised_tweets)
        caption = generate_sentence(keywords)
        named_entities = list(keywords[1])
        keywords = list(keywords[0].keys())
        

        print(keywords)
        return {
            "data": data_in,
            "sentiment": sentiment,
            "keywords": keywords,
            "named_entities": named_entities,
            "caption": caption
        }
    return ":3"