#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

NODE_BIN="$DIR/../node_modules/.bin/"

MAPSHAPER="$NODE_BIN/mapshaper"
SIMPLYFY_OPTIONS="-simplify visvalingam 1%"

DATA_DIR="$DIR/../data/"
DUMP_DIR="$DIR/../data-dump/"

CITIES="cities1.json"
INVENTIONS="inventions.json"
PERSONS="persons.json"

DATA_TIMELINE="$DATA_DIR/Timeline"
DUMP_TIMELINE="$DUMP_DIR/Timeline"

DATA_CONTOUR="$DATA_DIR/Contour"
DUMP_CONTOUR="$DUMP_DIR/maps/byContinent_contour"

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
  S_OPTS=$SIMPLYFY_OPTIONS
  echo -e "\nMap: $map_name\tDir: $dir_name\tExport:$export_name"

  SHP="$DUMP_PREFIX/$dir_name/$map_name.shp"
  GEOMAX="$DATA_PREFIX/$export_name.geomax.json"
  GEOSIM="$DATA_PREFIX/$export_name.geosim.json"
  TOPOSIM="$DATA_PREFIX/$export_name.toposim.json"
  [[ $export_name == 'Antarctics' ]] && S_OPTS='-simplify visvalingam 5%'
  # echo "Looking for $SHP"
  if [[ -f $SHP ]]; then
    ls -la $SHP
    [[ $1 == 'MAX' ]] && $MAPSHAPER $SHP -o format=geojson $GEOMAX
    $MAPSHAPER $SHP $S_OPTS -o format=geojson $GEOSIM
    [[ $1 == 'TOPO' ]] && $MAPSHAPER $SHP $S_OPTS -o format=topojson $TOPOSIM
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
