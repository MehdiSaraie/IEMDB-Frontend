#!/bin/bash

docker build -t iemdb_front:0.1 .
docker run -it -p 80:80 iemdb_front:0.1