#!/bin/bash

docker build -t iemdb_front:0.1 .
docker run -p 9500:9500 iemdb_front:0.1
