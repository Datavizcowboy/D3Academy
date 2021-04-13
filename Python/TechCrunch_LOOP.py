#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Mar 23 23:22:30 2021
@author: jorge
"""

import pandas as pd
import nltk
nltk.download('punkt')

folder='/Users/jorge/Sites/D3Academy/JSON_datasets/'

""" ______________________________________ READ THE CSV FILE and STORE IDs """

therank = []
thefreq = []
theyear = []
thearticles = []

keyword = 'smartphone'

df = pd.read_csv('/Users/jorge/Documents/Projects/Academy/TechCrunch/techcrunch_posts.csv')
# cleaning the data
df["content"] = df["content"].str.replace("\\n", " ")
df.drop(['authors', 'category','id', 'img_src', 'url','section', 'tags', 'title','topics'], axis = 1, inplace =True)
# df.dropna(subset=['authors'], inplace=True)
df['bref']=df['date'].apply(lambda x: x[0:4])

for nn in range(2010,2017):
    dslice = df.loc[df['bref'] == str(nn)]
    a = dslice['content'].str.lower().str.cat(sep=' ')
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
mypanda.reset_index().to_json(orient='records',path_or_buf=folder+'TechCrunchDB_'+str(keyword)+'.json')