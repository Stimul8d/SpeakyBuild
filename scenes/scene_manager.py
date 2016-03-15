#!/usr/bin/env python
import start, stop, inprog, bad, good 
import time, threading
import sys, os.path

buildFile = 'latestBuild.txt'
lastBuild = 'nothing'

def loop():
    start.go()
    stop.go()
    
    if(os.path.isFile(buildFile))    
        lastBuild = open(buildFile).read()
        
        if(lastBuild == 'inprog')
            inprog.go()
        if(lastBuild == 'good')
            good.go()
        if(lastBuild == 'bad')
            bad.go()
        if(lastBuild == 'nothing')
            start.go()
            stop.go()
        
    threading.Timer(1, loop).start()
    
loop()