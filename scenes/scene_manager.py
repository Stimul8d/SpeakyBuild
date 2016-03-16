#!/usr/bin/env python
import start, stop, inprog, bad, good
import time, threading
import os

buildFile = 'latestBuild.txt'
lastBuild = 'nothing'

while True:
    if os.path.isfile(buildFile):
        lastBuild = str(open(buildFile).read())
        print len(lastBuild)
        if lastBuild == 'inprog':
            inprog.go()
        if lastBuild == 'good':
            good.go()
        if lastBuild == 'bad':
            bad.go()
        if lastBuild == 'nothing':
            print('start')
            start.go()
            stop.go()

    time.sleep(1)