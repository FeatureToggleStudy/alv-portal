#!/usr/bin/env bash
# prints the translations for which there's no match anywhere in the code
# for the translation key such as one.two.three it will first try to find one.two.three
# and then will try to find just one.two
# This way we will not have false positives

FIRST_COLUMN=`awk -F "," '{print $1}' $1`
for TRANSLATION in ${FIRST_COLUMN} ; do
    if ! grep --recursive --quiet '../src/app' -e ${TRANSLATION}; then
        # do we match at least partial translations?
        SUFFIX=.${TRANSLATION//*./}
        TRANSLATION_WITHOUT_SUFFIX=${TRANSLATION/${SUFFIX}/}
        grep --color=always --recursive -B 1 -A 1 '../src/app' -e ${TRANSLATION_WITHOUT_SUFFIX}
    fi
done
