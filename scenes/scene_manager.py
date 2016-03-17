#!/usr/bin/env python
import init, start, stop, inprog, bad, good, error
import time, threading
import os

buildFile = './scenes/latestBuild.txt'
lastBuild = 'nothing'

start.go()
stop.go()

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
        if lastBuild == 'error':
            out('lastError.txt');
            error.go()
        time.sleep(1)