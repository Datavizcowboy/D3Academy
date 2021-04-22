#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Mar 23 23:22:30 2021
@author: jorge
"""

import pandas as pd
import numpy as np

folder='/Users/jorge/Documents/Projects/Academy/'

""" ______________________________________ READ THE CSV FILE and STORE IDs """

date=[]
salinity=[]
temperature=[]

thecontainer = pd.DataFrame()

fp=open('/Users/jorge/Documents/Projects/Academy/Salinity_Temperature_Excel_Two.csv','r')

for t in fp.readlines()[2:]:
    
        content=t.split(',')  
        
        date.append(content[0])
        salinity.append(np.float(content[1]))
        temperature.append(np.float(content[2]))
        
fp.close()
    
mypanda=pd.DataFrame({"temptemp":temperature,"salt":salinity,"date":date})  

mypanda['date'] = pd.to_datetime(mypanda['date'])

mypanda.reset_index().to_json(date_format='iso',orient='records',path_or_buf=folder+'output_saltemp_csv_two.json')
