#!/usr/bin/env python

import time
from sys import argv

script, filename = argv
print(filename)
txt = open(filename)
print(txt.read())
def RunScene(scene):
    while(True) :
        print('yep')   
        time.sleep(1)
