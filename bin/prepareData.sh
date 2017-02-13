#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

NODE_BIN="$DIR/../node_modules/.bin/"

SHP2JSON="$NODE_BIN/shp2json"
GEO2TOPO="$NODE_BIN/geo2topo"
TOPOSIMPLIFY="$NODE_BIN/toposimplify"

DATA_DIR="$DIR/../data/"
DUMP_DIR="$DIR/../data-dump/"

DATA_TIMELINE="$DATA_DIR/Timeline"
DUMP_TIMELINE="$DUMP_DIR/Timeline"
mkdir -p $DATA_TIMELINE

CITIES="cities1.json";

function convertFromShp(){
  map_name=$1
  dir_name=$map_name
  export_name=$map_name
  [[ $2 != "" ]] && dir_name=$2
  [[ $3 != "" ]] && export_name=$3
  echo -e "\nMap: $map_name\tDir: $dir_name\tExport:$export_name"

  SHP="$DUMP_TIMELINE/$dir_name/$map_name.shp"
  GEO="$DATA_TIMELINE/$export_name.geo.json"
  TOPO="$DATA_TIMELINE/$export_name.topo.json"
  SIMPLE="$DATA_TIMELINE/$export_name.simple.json"

  # echo "Looking for $SHP"
  if [[ -f $SHP ]]; then
    ls -la $SHP
    echo $(date +'%Y%m%d_%H%M%S') "Converting shp to geo"
    $SHP2JSON $SHP -o $GEO
    echo $(date +'%Y%m%d_%H%M%S') "Converting geo to topo"
    $GEO2TOPO < $GEO > $TOPO
    echo $(date +'%Y%m%d_%H%M%S') "Converting topo to simple"
    $TOPOSIMPLIFY -p 1 -f < $TOPO > $SIMPLE
    # ls -la $GEO $TOPO $SIMPLE
  else
    echo "$SHP not found. Skipping"
  fi

}

### Main

echo "$(date +'%Y%m%d_%H%M%S') Copying $CITIES"
cp -f "$DUMP_DIR/$CITIES" "$DATA_DIR/$CITIES"

for dir in `cd $DUMP_TIMELINE; ls |grep "[0-9]"`; do
  convertFromShp $dir
done

convertFromShp "initial-map-North-America" "map" "../borders"
