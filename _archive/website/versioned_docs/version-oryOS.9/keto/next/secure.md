---
id: version-oryOS.9-keto-next-secure
title: Secure
original_id: keto-next-secure
---

> You are viewing an outdated version of this documentation. Please head over
> to [www.ory.sh/docs](https://www.ory.sh/docs) for a recent version!

Similar to other services in our ecosystem, ORY Keto has no integrated access
control in it's APIs. This means that any request made to any API endpoint is
considered authenticated, authorized and is thus being executed. However, these
endpoints are very sensitive as they define who is allowed to do what in your
system.

Please use [ORY Oathkeeper](https://github.com/ory/oathkeeper), an API Gateway,
or a similar mechanism to protect these endpoints. How you protect them, is up
to you.

If you require dedicated help with this, consider [asking us](mailto:hi@ory.sh).
