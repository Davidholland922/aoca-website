#!/usr/bin/env bash
# Checks that www.aoca.ie is up and its important parts work.
# Run by .github/workflows/uptime.yml every 30 minutes. Exits non-zero on a
# real failure, which makes GitHub email the repository owner.
set -u
SITE="https://www.aoca.ie"
fail=0
report() { echo "FAIL: $1"; fail=1; }

# fetch with three tries, 20 seconds apart, so one slow moment is not an alarm
fetch() { # url -> body on stdout, status in $code
  local i
  for i in 1 2 3; do
    code=$(curl -sS -L --max-time 25 -o /tmp/body -w '%{http_code}' -A 'aoca-uptime-check' "$1" 2>/dev/null || echo 000)
    [ "$code" = "200" ] && return 0
    sleep 20
  done
  return 1
}

page() { # path, text that must be on the page
  if fetch "$SITE$1"; then
    grep -q "$2" /tmp/body || report "$1 loaded but is missing \"$2\""
  else
    report "$1 returned $code"
  fi
}

page "/"                                  "AOCA"
page "/contact"                           "Send message"
page "/careers"                           "Send application"
page "/expertise"                         "Expertise"
page "/expertise/subsidence-engineering"  "Subsidence"
page "/projects"                          "Projects"
page "/insights"                          "Insights"
page "/sitemap.xml"                       "<urlset"
page "/robots.txt"                        "Sitemap"

# the CV form needs private storage and its encryption key to be configured
if fetch "$SITE/api/apply"; then
  grep -q '"token"' /tmp/body || report "/api/apply answered without a challenge (storage or key missing)"
else
  report "/api/apply returned $code (CV form would not work)"
fi

# plain http and the bare domain must still forward to the site
loc=$(curl -sS -I --max-time 20 http://aoca.ie/ 2>/dev/null | tr -d '\r' | awk 'tolower($1)=="location:"{print $2}' | head -1)
case "$loc" in https://*aoca.ie/*) ;; *) report "http://aoca.ie no longer redirects to https (got \"$loc\")";; esac

# the security certificate renews itself; warn if it ever gets close to expiry
end=$(echo | openssl s_client -servername www.aoca.ie -connect www.aoca.ie:443 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
if [ -n "$end" ]; then
  days=$(( ( $(date -d "$end" +%s 2>/dev/null || date -j -f "%b %e %T %Y %Z" "$end" +%s) - $(date +%s) ) / 86400 ))
  echo "certificate valid for $days more days"
  [ "$days" -lt 14 ] && report "security certificate expires in $days days and has not renewed"
else
  report "could not read the security certificate"
fi

[ "$fail" = "0" ] && echo "All checks passed for $SITE"
exit $fail
