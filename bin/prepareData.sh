#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

NODE_BIN="$DIR/../node_modules/.bin/"

SHP2JSON="$NODE_BIN/shp2json"
GEO2TOPO="$NODE_BIN/geo2topo"
TOPO2GEO="$NODE_BIN/topo2geo"
TOPOSIMPLIFY="$NODE_BIN/toposimplify"
SIMPLYFY_OPTIONS="-p 1"

DATA_DIR="$DIR/../data/"
DUMP_DIR="$DIR/../data-dump/"

CITIES="cities1.json"
INVENTIONS="inventions.json"
PERSONS="persons.json"

DATA_TIMELINE="$DATA_DIR/Timeline"
DUMP_TIMELINE="$DUMP_DIR/Timeline"

DATA_CONTOUR="$DATA_DIR/Contour"
DUMP_CONTOUR="$DUMP_DIR/maps/byContinent"

mkdir -p $DATA_TIMELINE
mkdir -p $DATA_CONTOUR

function setPrefix(){
  echo Setting Prefix to $1
  if [[ $1 == 'timeline' ]]; then 
    DATA_PREFIX=${DATA_TIMELINE}
    DUMP_PREFIX=${DUMP_TIMELINE}
  else
    DATA_PREFIX=${DATA_CONTOUR}
    DUMP_PREFIX=${DUMP_CONTOUR}
  fi
}

function convertFromShp(){
  map_name=$1
  dir_name=$map_name
  export_name=$map_name
  [[ $2 != "" ]] && dir_name=$2
  [[ $3 != "" ]] && export_name=$3
  echo -e "\nMap: $map_name\tDir: $dir_name\tExport:$export_name"

  SHP="$DUMP_PREFIX/$dir_name/$map_name.shp"
  GEO="$DATA_PREFIX/$export_name.geo.json"
  TOPO="$DATA_PREFIX/$export_name.topo.json"
  SIMPLE="$DATA_PREFIX/$export_name.simple.json"
  GEOSIM="$DATA_PREFIX/$export_name.geosim.json"
  # echo "Looking for $SHP"
  if [[ -f $SHP ]]; then
    ls -la $SHP
    echo $(date +'%Y%m%d_%H%M%S') "Converting shp to geo"
    $SHP2JSON $SHP -o $GEO
    echo $(date +'%Y%m%d_%H%M%S') "Converting geo to topo"
    $GEO2TOPO < $GEO > $TOPO
    echo $(date +'%Y%m%d_%H%M%S') "Converting topo to simple"
    $TOPOSIMPLIFY $SIMPLYFY_OPTIONS -f < $TOPO > $SIMPLE
    echo $(date +'%Y%m%d_%H%M%S') "Changing object name '-' to 'test'"
    sed -i 's/"-"/"test"/' $SIMPLE
    echo $(date +'%Y%m%d_%H%M%S') "Converting simple to geo"
    $TOPO2GEO "test"=$GEOSIM < $SIMPLE
    # ls -la $GEO $TOPO $SIMPLE
  else
    echo "$SHP not found. Skipping"
  fi

}

function processJSON(){
  NAME=$1
  FROM="$DUMP_DIR/$NAME"
  TO="$DATA_DIR/$NAME"
  [[ $2 != "" ]] && FROM=$2
  [[ $3 != "" ]] && TO=$3
  echo "$(date +'%Y%m%d_%H%M%S') Validating $NAME"
  echo "List of JSON ERRORS ===>"
  tr '\n' ' ' < "$FROM" | sed -e "s/\s//g" -e "s/},/},\n/g" | grep ":,"
  echo "<=== END"
  tr '\n' ' ' < "$FROM" | sed \
      -e 's/\(\W*\)\s\(\W*\)/\1++\2/g' \
      -e "s/\s//g" \
      -e "s/},/},\n/g" \
      -e "s%/\*.*\*/%%" | \
    grep -v ":," | \
    tr '\n' ' ' | \
    sed \
      -e "s/}, }/}}/g" \
      -e "s/++/ /g" \
  > "$TO"
}
# 's/\(\W*\)\s\(\W\)/\1++\2/g'  # Saving spaces between words
# "s/\s//g"                     # remove all spaces
# "s/},/},\n/g                  # remove trailing comma
# "s%/\*.*\*/%%"                # delete comments

# "s/}, }/}}/g"                 # removing trailing comma in the end of array
# "s/++/ /g"                    # Restoring saved spaces

### Main

processJSON "$CITIES"
processJSON "$INVENTIONS"
processJSON "$PERSONS"

for p in 'contour' 'timeline'; do
  setPrefix ${p}
  for dir in `cd $DUMP_PREFIX; ls |grep -v "\.mxd"`; do
    convertFromShp $dir
  done
done
