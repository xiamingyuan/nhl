#!/bin/bash

echo "************start..."

mvn -P test clean package
scp ./target/mi-osp-nhl.war root@10.117.130.45:/usr/local/web/jetty-osp-nhl/webapps/root.war
#ssh root@10.117.130.45 "/usr/local/web/jetty-osp-nhl/bin/jetty.sh restart"
ssh root@10.117.130.45 "/usr/local/web/jetty-osp-nhl/jettystart.sh"
echo "************finish"