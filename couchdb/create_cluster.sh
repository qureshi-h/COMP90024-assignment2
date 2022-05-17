export declare -a nodes=(172.26.132.237 172.26.133.72)
export masternode=172.26.132.237
export declare -a othernodes=`echo ${nodes[@]} | sed s/${masternode}//`
export size=${#nodes[@]}
export user='admin'
export pass='admin'
export cookie='a192aeb9904e6590849337933b000c99'

for node in ${othernodes} 
do
    curl -XPOST "http://${user}:${pass}@${masternode}:5984/_cluster_setup" \
      --header "Content-Type: application/json"\
      --data "{\"action\": \"enable_cluster\", \"bind_address\":\"0.0.0.0\",\
             \"username\": \"${user}\", \"password\":\"${pass}\", \"port\": \"5984\",\
             \"remote_node\": \"${node}\", \"node_count\": \"$(echo ${nodes[@]} | wc -w)\",\
             \"remote_current_user\":\"${user}\", \"remote_current_password\":\"${pass}\"}"
done

for node in ${othernodes}
do
    curl -XPOST "http://${user}:${pass}@${masternode}:5984/_cluster_setup"\
      --header "Content-Type: application/json"\
      --data "{\"action\": \"add_node\", \"host\":\"${node}\",\
             \"port\": \"5984\", \"username\": \"${user}\", \"password\":\"${pass}\"}"
done

curl -XPOST "http://${user}:${pass}@${masternode}:5984/_cluster_setup"\
    --header "Content-Type: application/json" --data "{\"action\": \"finish_cluster\"}"

for node in "${nodes[@]}"; do  curl -X GET "http://${user}:${pass}@${node}:5984/_membership"; done