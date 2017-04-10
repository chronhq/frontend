TABLES=$1
PORT=$2
PG_DUMP=$3
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

[[ PORT == "" ]] && PORT=5432
[[ $PG_DUMP == "" ]] && PG_DUMP="echo pg_dump"

GEO_TABLES="admin type geometry properties borders contour"
FACTS_TABLES="inventions persons cities geo_events"
SURVEY_TABLES="surveys answers"

num=0
[[ $TABLES == "" ]] && TABLES="all"
[[ $TABLES == "all" ]] && TABLES_LIST="${GEO_TABLES} ${FACTS_TABLES} ${SURVEY_TABLES}"
[[ $TABLES == "geo" ]] && TABLES_LIST=$GEO_TABLES
[[ $TABLES == "facts" ]] && TABLES_LIST=$FACTS_TABLES && num=6
[[ $TABLES == "survey" ]] && TABLES_LIST=$SURVEY_TABLES && num=10

for DB in $TABLES_LIST; do
	let "num++"
	[[ $num -lt 10 ]] && NAME="0${num}_${DB}" || NAME="${num}_$DB"
	echo; echo; echo
 	echo $DB $NAME;
	echo; echo; echo
	$PG_DUMP --host localhost --port $PORT --username 'postgres' --no-password  --format plain --verbose --file "$DIR/../initdb/$NAME.sql" --table public.$DB 'chronist';
done;

