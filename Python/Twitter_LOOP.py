#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Mar 23 23:22:30 2021
@author: jorge
"""

import pandas as pd
import nltk
nltk.download('punkt')
import json

folder='/Users/jorge/Sites/D3Academy/JSON_datasets/'

""" ______________________________________ READ THE CSV FILE and STORE IDs """

therank = []
thefreq = []
theyear = []
thearticles = []

keyword = 'e-commerce'

# articles_data_path = '/Users/jorge/Documents/Projects/Academy/Twitter/tweepy_empathy_decentralisation_output.json'
articles_data_path = '/Users/jorge/Documents/Projects/Academy/Twitter/tweepy_techcrunch_output.json'

articles_data = []
articles_file = open(articles_data_path, "r")

""" Scrap the Articles """

with open(articles_data_path) as f:
    data = json.load(f)

content = pd.DataFrame()

content['dates'] = list(map(lambda data: data['date'], data))
content['body'] = list(map(lambda data: data['content'], data))
content['retweets'] = list(map(lambda data: data['retweets'], data))
content['likes'] = list(map(lambda data: data['likes'], data))
content['bref']=content['dates'].apply(lambda x: x[0:4])

for nn in range(2012,2022):
    dslice = content.loc[content['bref'] == str(nn)]
    a = dslice['body'].str.lower().str.cat(sep=' ')
    words = nltk.tokenize.word_tokenize(a)
    word_dist = nltk.FreqDist(words)

    rslt = pd.DataFrame(word_dist.most_common(),columns=['Word', 'Frequency'])
    thenumber = rslt[rslt['Word'].str.contains(keyword)]
    
    if (len(thenumber)>0):
        position = thenumber.iloc[[0]]
        print("Frequency of the keyword_Rank"+str(position))

        therank.append(thenumber.iloc[[0]].index[0].tolist())
        thefreq.append(thenumber['Frequency'].values[0].tolist())
        theyear.append(nn)
        thearticles.append(dslice.size)
    else:
        therank.append(0)
        thefreq.append(0)
        theyear.append(nn)
        thearticles.append(dslice.size)
        
mypanda=pd.DataFrame({"year":theyear,"rank":therank,"freq":thefreq,"articles":thearticles})  
mypanda.reset_index().to_json(orient='records',path_or_buf=folder+'Twitter_TechCrunch_'+str(keyword)+'.json')
