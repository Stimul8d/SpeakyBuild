#!/usr/bin/env python

import time
from sys import argv

script, filename = argv
lastBuild = open(filename).read()

def NewBuild():
    newBuild = open(filename).read()
    return newBuild != lastBuild
    
while not(NewBuild() ) :
    print('yep')   
    time.sleep(1)
