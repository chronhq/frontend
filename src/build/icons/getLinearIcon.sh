#!/bin/sh

[[ $1 == '' ]] && exit 1;

# echo "LinearIcon for $1";
# echo;
xml='xmlns="http://www.w3.org/2000/svg"'

echo ".$1(@color) {"
echo -ne "\tbackground-image: url('data:image/svg+xml;utf8,"
echo -n `grep "id=\"$1\"" LinearIcons.svg | sed -e 's%symbol%svg%g' -e "s%<svg%<svg ${xml}%" -e 's%<title.*title>%%' -e 's%class%fill="@{color}" class%g'`
echo "');"
echo "}"
