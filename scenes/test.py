#!/usr/bin/env python
import time, threading
import os

buildFile = 'latestBuild.txt'
lastBuild = 'nothing'

def loop():
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
    threading.Timer(1, loop).start()
    
loop()