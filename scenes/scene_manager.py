#!/usr/bin/env python
import init, start, stop, inprog, bad, good
import time, threading
import os

buildFile = 'latestBuild.txt'
lastBuild = 'nothing'
init.go()
stop.go()

while True:
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

    time.sleep(1)