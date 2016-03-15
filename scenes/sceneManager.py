#!/usr/bin/env python
#import rainbow_blinky as pass
import simple as start
import stop as stop 
import time

start.go()
stop.go()

def loop():
    print(time.ctime())
    start.go()
    stop.go()
    threading.Timer(10, foo).start()