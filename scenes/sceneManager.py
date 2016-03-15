#!/usr/bin/env python
import start, stop, inprog, bad, good 
import time, threading

def loop():
    start.go()
    stop.go()
    inprog.go()
    good.go()
    bad.go()
    threading.Timer(1, loop).start()
    
loop()