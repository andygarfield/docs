---
id: version-oryOS.15-hydra
title: ORY Hydra
original_id: hydra
---

> You are viewing an outdated version of this documentation. Please head over
> to [www.ory.sh/docs](https://www.ory.sh/docs) for a recent version!

In this document you will find benchmark results for different endpoints of ORY
Hydra. All benchmarks are executed using
[rakyll/hey](https://github.com/rakyll/hey). Please note that these benchmarks
run against the in-memory storage adapter of ORY Hydra. These benchmarks
represent what performance you would get with a zero-overhead database
implementation.

We do not include benchmarks against databases (e.g. MySQL, PostgreSQL or
CockroachDB) as the performance greatly differs between deployments (e.g.
request latency, database configuration) and tweaking individual things may
greatly improve performance. We believe, for that reason, that benchmark results
for these database adapters are difficult to generalize and potentially
deceiving. They are thus not included.

This file is updated on every push to master. It thus represents the benchmark
data for the latest version.

All benchmarks run 10.000 requests in total, with 100 concurrent requests. All
benchmarks run on Circle-CI with a
["2 CPU cores and 4GB RAM"](https://support.circleci.com/hc/en-us/articles/360000489307-Why-do-my-tests-take-longer-to-run-on-CircleCI-than-locally-)
configuration.

## BCrypt

ORY Hydra uses BCrypt to obfuscate secrets of OAuth 2.0 Clients. When using
flows such as the OAuth 2.0 Client Credentials Grant, ORY Hydra validates the
client credentials using BCrypt which causes (by design) CPU load. CPU load and
performance depend on the BCrypt cost which can be set using the environment
variable `BCRYPT_COST`. For these benchmarks, we have set `BCRYPT_COST=8`.

## OAuth 2.0

This section contains various benchmarks against OAuth 2.0 endpoints

### Token Introspection

```

Summary:
  Total:	3.1749 secs
  Slowest:	0.0771 secs
  Fastest:	0.0003 secs
  Average:	0.0308 secs
  Requests/sec:	3149.7222

  Total data:	1550000 bytes
  Size/request:	155 bytes

Response time histogram:
  0.000 [1]	|
  0.008 [560]	|■■■■■■■■■■■■
  0.016 [1142]	|■■■■■■■■■■■■■■■■■■■■■■■■
  0.023 [1587]	|■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  0.031 [1880]	|■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  0.039 [1848]	|■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  0.046 [1440]	|■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  0.054 [860]	|■■■■■■■■■■■■■■■■■■
  0.062 [483]	|■■■■■■■■■■
  0.069 [176]	|■■■■
  0.077 [23]	|


Latency distribution:
  10% in 0.0116 secs
  25% in 0.0198 secs
  50% in 0.0304 secs
  75% in 0.0408 secs
  90% in 0.0509 secs
  95% in 0.0564 secs
  99% in 0.0649 secs

Details (average, fastest, slowest):
  DNS+dialup:	0.0000 secs, 0.0003 secs, 0.0771 secs
  DNS-lookup:	0.0000 secs, 0.0000 secs, 0.0045 secs
  req write:	0.0000 secs, 0.0000 secs, 0.0064 secs
  resp wait:	0.0307 secs, 0.0003 secs, 0.0726 secs
  resp read:	0.0000 secs, 0.0000 secs, 0.0052 secs

Status code distribution:
  [200]	10000 responses



```

### Client Credentials Grant

This endpoint uses [BCrypt](#bcrypt).

```

Summary:
  Total:	20.0618 secs
  Slowest:	0.4083 secs
  Fastest:	0.0173 secs
  Average:	0.1966 secs
  Requests/sec:	498.4602

  Total data:	1570000 bytes
  Size/request:	157 bytes

Response time histogram:
  0.017 [1]	|
  0.056 [204]	|■■
  0.095 [372]	|■■■■
  0.135 [1485]	|■■■■■■■■■■■■■■■■■■
  0.174 [966]	|■■■■■■■■■■■
  0.213 [3375]	|■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  0.252 [1391]	|■■■■■■■■■■■■■■■■
  0.291 [1435]	|■■■■■■■■■■■■■■■■■
  0.330 [651]	|■■■■■■■■
  0.369 [83]	|■
  0.408 [37]	|


Latency distribution:
  10% in 0.1090 secs
  25% in 0.1525 secs
  50% in 0.1989 secs
  75% in 0.2345 secs
  90% in 0.2854 secs
  95% in 0.2988 secs
  99% in 0.3471 secs

Details (average, fastest, slowest):
  DNS+dialup:	0.0001 secs, 0.0173 secs, 0.4083 secs
  DNS-lookup:	0.0000 secs, 0.0000 secs, 0.0091 secs
  req write:	0.0000 secs, 0.0000 secs, 0.0449 secs
  resp wait:	0.1964 secs, 0.0172 secs, 0.4083 secs
  resp read:	0.0000 secs, 0.0000 secs, 0.0027 secs

Status code distribution:
  [200]	10000 responses



```

## OAuth 2.0 Client Management

### Creating OAuth 2.0 Clients

This endpoint uses [BCrypt](#bcrypt) and generates IDs and secrets by reading
from which negatively impacts performance. Performance will be better if IDs and
secrets are set in the request as opposed to generated by ORY Hydra.

```
This test is currently disabled due to issues with /dev/urandom being inaccessible in the CI.
```

### Listing OAuth 2.0 Clients

```

Summary:
  Total:	0.4647 secs
  Slowest:	0.0254 secs
  Fastest:	0.0001 secs
  Average:	0.0044 secs
  Requests/sec:	21517.5823

  Total data:	4820000 bytes
  Size/request:	482 bytes

Response time histogram:
  0.000 [1]	|
  0.003 [4737]	|■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  0.005 [910]	|■■■■■■■■
  0.008 [2010]	|■■■■■■■■■■■■■■■■■
  0.010 [1169]	|■■■■■■■■■■
  0.013 [738]	|■■■■■■
  0.015 [275]	|■■
  0.018 [109]	|■
  0.020 [28]	|
  0.023 [19]	|
  0.025 [4]	|


Latency distribution:
  10% in 0.0001 secs
  25% in 0.0002 secs
  50% in 0.0037 secs
  75% in 0.0075 secs
  90% in 0.0106 secs
  95% in 0.0123 secs
  99% in 0.0163 secs

Details (average, fastest, slowest):
  DNS+dialup:	0.0000 secs, 0.0001 secs, 0.0254 secs
  DNS-lookup:	0.0000 secs, 0.0000 secs, 0.0072 secs
  req write:	0.0000 secs, 0.0000 secs, 0.0102 secs
  resp wait:	0.0041 secs, 0.0001 secs, 0.0234 secs
  resp read:	0.0001 secs, 0.0000 secs, 0.0108 secs

Status code distribution:
  [200]	10000 responses



```

### Fetching a specific OAuth 2.0 Client

```

Summary:
  Total:	0.4414 secs
  Slowest:	0.0274 secs
  Fastest:	0.0001 secs
  Average:	0.0041 secs
  Requests/sec:	22653.4377

  Total data:	4800000 bytes
  Size/request:	480 bytes

Response time histogram:
  0.000 [1]	|
  0.003 [4901]	|■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  0.006 [1338]	|■■■■■■■■■■■
  0.008 [2128]	|■■■■■■■■■■■■■■■■■
  0.011 [909]	|■■■■■■■
  0.014 [417]	|■■■
  0.016 [187]	|■■
  0.019 [89]	|■
  0.022 [18]	|
  0.025 [11]	|
  0.027 [1]	|


Latency distribution:
  10% in 0.0001 secs
  25% in 0.0002 secs
  50% in 0.0031 secs
  75% in 0.0071 secs
  90% in 0.0100 secs
  95% in 0.0123 secs
  99% in 0.0169 secs

Details (average, fastest, slowest):
  DNS+dialup:	0.0000 secs, 0.0001 secs, 0.0274 secs
  DNS-lookup:	0.0000 secs, 0.0000 secs, 0.0076 secs
  req write:	0.0001 secs, 0.0000 secs, 0.0142 secs
  resp wait:	0.0037 secs, 0.0001 secs, 0.0238 secs
  resp read:	0.0002 secs, 0.0000 secs, 0.0138 secs

Status code distribution:
  [200]	10000 responses



```
