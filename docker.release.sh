#!/bin/sh

ACTION=$1
TAG=$2

if [ "${TAG}" = "" ]; then TAG="dev"; fi

if [[ "${ACTION}" = "build" || "${ACTION}" = "buildpush" || "${ACTION}" = "push" ]]; then
  echo "Action: '${ACTION}'; Tag: '${TAG}';"
else
  echo $0 '<action> <docker-tag> ?<config-postfix>'
  echo $0 '<build|push|buildpush>' '<dev|prod>' '?<dev|prod>'
fi

if [[ "${ACTION}" = "build" || "${ACTION}" = "buildpush" ]]; then
  docker build -t "chronmaps/frontend:release-${TAG}" --target release .
fi
if [[ "${ACTION}" = "push" || "${ACTION}" = "buildpush" ]]; then
  docker push "chronmaps/frontend:release-${TAG}"
fi
