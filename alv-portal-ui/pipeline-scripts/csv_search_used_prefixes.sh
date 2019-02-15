#!/usr/bin/env bash
# searches for prefixes and colorfully shows where those prefixes were found

FIRST_COLUMN=`awk -F "," '{print $1}' $1`
for TRANSLATION in ${FIRST_COLUMN} ; do
    if ! grep --recursive --quiet '../src/app' -e ${TRANSLATION}; then
        # do we match at least partial translations?
        SUFFIX=.${TRANSLATION//*./}
        TRANSLATION_WITHOUT_SUFFIX=${TRANSLATION/${SUFFIX}/}
        grep --color=always --recursive -B 1 -A 1 '../src/app' -e ${TRANSLATION_WITHOUT_SUFFIX}
    fi
done
