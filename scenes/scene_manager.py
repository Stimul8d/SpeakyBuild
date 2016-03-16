#!/usr/bin/env python
import start, stop, inprog, bad, good
import time, threading
import os

buildFile = 'latestBuild.txt'
lastBuild = 'nothing'

def loop():
    start.go()
    if os.path.isfile(buildFile):
        lastBuild = open(buildFile).read()
        print lastBuild
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