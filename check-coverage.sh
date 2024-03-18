#! /bin/sh

TEST_URL="./src/tests/coverage/coverage-summary.json"

lines_covered="$(cat $TEST_URL | jq -r ".total.lines.pct")"
statements_covered="$(cat $TEST_URL | jq -r ".total.statements.pct")"
functions_covered="$(cat $TEST_URL | jq -r ".total.functions.pct")"


if [ "${lines_covered%.*}" -ge 80 -a "${statements_covered%.*}" -ge 80 -a "${functions_covered%.*}" -ge 80 ]
then
    echo "The test coverage percentages are good!"
    return 0;
else
    echo "The test coverage percentages are not sufficient."
    return 1;
fi