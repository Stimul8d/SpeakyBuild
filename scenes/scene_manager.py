#!/usr/bin/env python
import init, start, stop, inprog, bad, good
import time, threading
import os

buildFile = 'latestBuild.txt'
lastBuild = 'nothing'
#start.go()
stop.go()

def loop():
    print('loop')
    if os.path.isfile(buildFile):
        lastBuild = str(open(buildFile).read()).strip()

        if lastBuild == 'inprog':
            inprog.go()
        if lastBuild == 'good':
            good.go()
        if lastBuild == 'bad':
            bad.go()
        if lastBuild == 'nothing':
            start.go()
            stop.go()
            
    threading.Timer(1, loop).start()

loop()