# -*- coding: utf-8 -*-
"""
Twitter Retrieval
"""

import pandas as pd
import tweepy

folder = '/Users/jorge/Documents/Projects/Academy/Twitter/'

consumer_key = ''
consumer_secret = ''
access_token = ''
access_token_secret = ''

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True)

# Dump all the tweets

search_words = "#climatechange"
new_search = search_words + " -filter:retweets"

# tweets = tweepy.Cursor(api.search,q="from:Empathyco_ ",lang="en",result_type="recent", tweet_mode='extended', count=100).items(600)
tweets = tweepy.Cursor(api.user_timeline,screen_name='@TechCrunch',\
#tweets = tweepy.Cursor(api.search,q=new_search,\
    
                            lang="en",\
                            result_type="recent",
                            tweet_mode='extended', count=100).items(5000)
# users_locs = [[tweet.created_at, tweet.full_text, tweet.user.screen_name, tweet.retweet_count, tweet.favorite_count] for tweet in tweets]

users_locs = [[tweet.created_at, tweet.full_text, tweet.user.screen_name, tweet.retweet_count, tweet.favorite_count] for tweet in tweets]

tweet_text = pd.DataFrame(data=users_locs, 
                    columns=['date','content','user', 'retweets','likes'])

tweet_text['datec'] = pd.to_datetime(tweet_text['date'])

tweet_text.reset_index().to_json(date_format='iso', orient='records',path_or_buf=folder+'tweepy_techcrunch_output.json')
