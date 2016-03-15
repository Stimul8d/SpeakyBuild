#!/usr/bin/env python
#import rainbow_blinky as pass
import simple as start
import stop as stop 
import time

start.go()
print('starting up the hat')
stop.go()

t_end = time.time() + 5
while time.time() < t_end:
    start.go()
    stop.go()
    print(time.time())
