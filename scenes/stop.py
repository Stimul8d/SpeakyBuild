#!/usr/bin/env python

import unicornhat as UH
import time

def go():
    unicorn.brightness(1)
    for y in range(8):
        for x in range(8):
            UH.set_pixel(x,y,0,0,0)
            UH.show()
            time.sleep(0.05)
    time.sleep(1)
