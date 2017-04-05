port=15432

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PG_DUMP="pg_dump"
num=0
for DB in admin type geometry properties borders contour inventions persons cities geo_events; do
	let "num++"
	[[ $num -lt 10 ]] && NAME="0${num}_${DB}" || NAME="${num}_$DB"
	echo; echo; echo
 	echo $DB $NAME;
	echo; echo; echo
	$PG_DUMP --host localhost --port $port --username 'postgres' --no-password  --format plain --verbose --file "$DIR../initdb/$NAME.sql" --table public.$DB 'chronist';
done;

