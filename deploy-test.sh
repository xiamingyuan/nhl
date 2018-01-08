#!/bin/bash

echo "************start..."

mvn -P test clean package
scp ./target/mi-osp-nhl.war root@10.117.130.50:/home/test/sprint0002/mi-osp-nhl.war

echo "************finish"