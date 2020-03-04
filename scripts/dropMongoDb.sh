#!/bin/bash

mongo CaffeineHLweb --eval "printjson(db.dropDatabase())"
