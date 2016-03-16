#!/usr/bin/env python
import time, threading
import os

buildFile = './scenes/latestBuild.txt'
lastBuild = 'nothing'

def out(file):
    print(file)
    f = open(file,'w')
    f.write(time.ctime())
    f.close()

out('lastPyRun.txt')

while True:
    if os.path.exists(buildFile):
        lastBuild = str(open(buildFile).read()).strip()
        print('buildFile contents: ' + lastBuild)
        print(len(lastBuild))
        if lastBuild == 'inprog':
            out('lastInProg.txt')
        if lastBuild == 'good':
            out('lastGood.txt')
        if lastBuild == 'bad':
            out('lastBad.txt')
        if lastBuild == 'nothing':
            out('lastNoNewBuilds.txt')
        time.sleep(1)