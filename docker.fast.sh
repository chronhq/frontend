#!/bin/sh

ACTION=$1
TAG=$2
EXT=$3

SETTINGS='settings.json'
FIREBASE='firebase-config.json'

RELEASE='dist_release'

function set_configs() {
  if [[ "${EXT}" != "" ]]; then
    if [[ -f "${SETTINGS}.${EXT}" && -f "${FIREBASE}.${EXT}" ]]; then
      mv "${SETTINGS}" "${SETTINGS}.bak"; mv "${FIREBASE}" "${FIREBASE}.bak"
      mv "${SETTINGS}.${EXT}" "${SETTINGS}"; mv "${FIREBASE}.${EXT}" "${FIREBASE}"
    else
      echo Check config files: "${SETTINGS}.${EXT}" "${FIREBASE}.${EXT}";
    fi
  fi
}

function restore_configs() {
  if [[ "${EXT}" != "" ]]; then
    if [[ -f "${SETTINGS}.bak" && -f "${FIREBASE}.bak" ]]; then
      mv "${SETTINGS}" "${SETTINGS}.${EXT}"; mv "${FIREBASE}" "${FIREBASE}.${EXT}"
      mv "${SETTINGS}.bak" "${SETTINGS}"; mv "${FIREBASE}.bak" "${FIREBASE}"
    fi
  fi
}

trap "restore_configs; rm -rf $RELEASE; exit" INT TERM EXIT

if [ "${TAG}" = "" ]; then TAG="dev"; fi

if [[ "${ACTION}" = "build" || "${ACTION}" = "buildpush" || "${ACTION}" = "push" ]]; then
  echo "Action: '${ACTION}'; Tag: '${TAG}'; CFG_EXT: ${EXT}";
else
  echo $0 '<action> <docker-tag> ?<config-postfix>'
  echo $0 '<build|push|buildpush>' '<dev|prod>' '?<dev|prod>'
fi

if [[ "${ACTION}" = "build" || "${ACTION}" = "buildpush" ]]; then
  set_configs
  npm run release && mv dist $RELEASE
  restore_configs
  
  docker build -t "chronmaps/frontend:release-${TAG}" -f Dockerfile.prebuild .
  mv $RELEASE dist
fi

if [[ "${ACTION}" = "push" || "${ACTION}" = "buildpush" ]]; then
  docker push "chronmaps/frontend:release-${TAG}"
fi
