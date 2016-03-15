#!/usr/bin/env python
#import rainbow_blinky as pass
import simple as start
import unicornhat as hat
import time

start.go()
print('starting up the hat')
hat.clear()

t_end = time.time() + 5
while time.time() < t_end:
    print(time.time())
