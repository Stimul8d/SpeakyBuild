#!/usr/bin/env python
import simple as start
import stop as stop 
import time, threading
import rainbow_blinky as fail

def loop():
    start.go()
    stop.go()
    fail.go()
    threading.Timer(5, loop).start()
    
loop()