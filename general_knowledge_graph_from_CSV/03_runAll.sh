#!/bin/bash

# #  ------------------- Expertiese ----------
# var1="createNodes"
# var2=true
# var3="./V1.0_CSV_graph_tomSimple/01_expertise/create.csv"
# var4="expertise"
# node 00_all_readCSV_graph.js $var1 $var2 $var3 $var4 


# var1="createNodes"
# var2=false
# var3="./V1.0_CSV_graph_tomSimple/01_expertise/create.csv"
# var4="expertise"
# node 00_all_readCSV_graph.js $var1 $var2 $var3 $var4


var1="createRelationships"
var2=false
var3="./V1.0_CSV_graph_tomSimple/01_expertise/similar.csv"
var4="expertise"
node 00_all_readCSV_graph.js $var1 $var2 $var3 $var4
#  ------------------- Expertiese ----------



#  ------------------- Type Project ----------
# var1="createNodes"
# var2=true
# var3="./V1.0_CSV_graph_tomSimple/02_type_project/create.csv"
# var4="typeProject"
# node 00_all_readCSV_graph.js $var1 $var2 $var3 $var4 


# var1="createNodes"
# var2=false
# var3="./V1.0_CSV_graph_tomSimple/02_type_project/create.csv"
# var4="typeProject"
# node 00_all_readCSV_graph.js $var1 $var2 $var3 $var4


var1="createRelationships"
var2=false
var3="./V1.0_CSV_graph_tomSimple/02_type_project/similar.csv"
var4="typeProject"
node 00_all_readCSV_graph.js $var1 $var2 $var3 $var4
#  ------------------- Type Project ----------
