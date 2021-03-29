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

for j in range(1920,1922):

    fp=open('/Users/jorge/Documents/Projects/Academy/archive_NYT1/df_'+str(j)+'.csv','r')

    container = []
    container_pub=[]
    thecontainer = pd.DataFrame()
    
    for t in fp.readlines():
            model_name=t.split(str(j))        
            if (len(model_name) > 1 ):
                container.append(model_name[0])
                container_pub.append(model_name[1])
    fp.close()
    
    print("Year_"+str(j)+"_Number of articles_"+container[-1])
    
    thecontainer=pd.DataFrame()
    thecontainer['year']=container_pub
    
    a = thecontainer['year'].str.lower().str.cat(sep=' ')
    words = nltk.tokenize.word_tokenize(a)
    word_dist = nltk.FreqDist(words)
    
    rslt = pd.DataFrame(word_dist.most_common(),columns=['Word', 'Frequency'])
    thenumber = rslt[rslt['Word'].str.contains(keyword)]
    if (len(thenumber)>0):
        position = thenumber.iloc[[0]]
        print("Frequency of the keyword_Rank"+str(position))
    
        therank.append(thenumber.iloc[[0]].index[0].tolist())
        thefreq.append(thenumber['Frequency'].values[0].tolist())
        theyear.append(j)
        thearticles.append(container[-1])
    else:
        therank.append(0)
        thefreq.append(0)
        theyear.append(j)
        thearticles.append(container[-1])
        
mypanda=pd.DataFrame({"year":theyear,"rank":therank,"freq":thefreq,"articles":thearticles})  
mypanda.reset_index().to_json(orient='records',path_or_buf=folder+str(keyword)+'.json')