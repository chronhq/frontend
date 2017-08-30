TABLES=$1
PORT=$2
PG_DUMP=$3
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

[[ PORT == "" ]] && PORT=5432
[[ $PG_DUMP == "" ]] && PG_DUMP="pg_dump"

GEO_TABLES="admin type geometry properties borders contour"
FACTS_TABLES="inventions persons cities geo_events"
COURSE_TABLES="course course_event course_timeline course_trace"

num=0
[[ $TABLES == "" ]] && exit 0
[[ $TABLES == "all" ]] && TABLES_LIST="${GEO_TABLES} ${FACTS_TABLES} ${COURSE_TABLES}"
[[ $TABLES == "geo" ]] && TABLES_LIST=$GEO_TABLES
[[ $TABLES == "facts" ]] && TABLES_LIST=$FACTS_TABLES && num=6
[[ $TABLES == "course" ]] && TABLES_LIST=$COURSE_TABLES && num=10

for DB in $TABLES_LIST; do
	let "num++"
	[[ $num -lt 10 ]] && NAME="0${num}_${DB}" || NAME="${num}_$DB"
	# echo; echo; echo
 	echo $DB $NAME;
	# echo; echo; echo
	$PG_DUMP --username 'postgres' --no-password  --format plain --verbose --file "$NAME.sql" --table public.$DB 'chronist';
done;

