#!/usr/bin/env python
import init, start, stop, inprog, bad, good
import time, threading
import os

buildFile = 'latestBuild.txt'
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
            inprog.go()
        if lastBuild == 'good':
            out('lastGood.txt')
            good.go()
        if lastBuild == 'bad':
            out('lastBad.txt')
            bad.go()
        if lastBuild == 'nothing':
            out('lastNoNewBuilds.txt')
            start.go()
            stop.go()
        time.sleep(1)