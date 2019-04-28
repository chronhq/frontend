#!/bin/sh

[[ $1 == '' ]] && exit 1;


# echo "Line Icon from $1";
# echo;

i=$(echo $1 | sed -e 's%.*/%%' -e 's%.svg%%')

echo;
echo ".line-$i(@color) {"
echo -ne "\tbackground-image: url('data:image/svg+xml;utf8,"
echo -n `sed "s%[[:space:]]%\n %g" $1| grep -v filter |tr -d '\n' | sed -e "s/[[:space:]]\+/ /g" -e "s%<defs>.*defs>%%" -e 's%fill="#\w*"%fill="@{color}"%'`
echo "');"
echo "}"
