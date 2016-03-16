#!/usr/bin/env python
import time, threading
import os

buildFile = 'latestBuild.txt'
lastBuild = 'nothing'

while True:
    print('loop')
    if os.path.isfile(buildFile):
        lastBuild = str(open(buildFile).read())
        print(len(lastBuild))
        if lastBuild == 'inprog':
            print('ip')
        if lastBuild == 'good':
            print('g')
        if lastBuild == 'bad':
            print('b')
        if lastBuild == 'nothing':
            print('nothing')
    time.sleep(1)