// src/lib/firebaseAdmin.ts
import "server-only";
import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const runtime = "nodejs"; // make sure it's not Edge

let adminApp: App;

if (!getApps().length) {
  adminApp = initializeApp({
    credential: cert({
      projectId: "my-next-shop-1a9bb",
      clientEmail: "firebase-adminsdk-fbsvc@my-next-shop-1a9bb.iam.gserviceaccount.com",
      privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEht4guVofgQXJ
/gF6TWOzF+DhIiuvRz7fl3I3bDAT4TEAeZq66aVywtADA3L//ETmq7QOCpt35yEw
GWJOurtj2P0na5dAfdsgxOlLKIKjCZ4TJNG2w5ZGdKsosdfqPeyNcavw6O6yQhOt
vubJi+zGgSHPPcVUhkssotGnnPyF487mv1l2h5n93lDVqgr+aFqAVz38VhPYQmQV
CUkC+OgNREuosNkY84kYmiFv4wNI4IqkKmh2ZuyBxqOybcpTF+cP6IWwib5fZmgN
lz8scYEe8H3kOaeWkUy0z0AUM2eiW/AcU9QdYLESnkZtuHf/cc2gQJ0X7GX0Pgsz
1ugT9J4tAgMBAAECggEACTL1mNCJmxSTVyDQTuTqeB/zrctyAggICw1FZ7oPsg6G
GFXuMTZDQVDvIwT5UBQt4XeYu64xbXZgg6Yx3NTkH/NbPjTMuqm+z7+H2rXFulNL
6+zQSDQgMky/FO47g20XR95R7w/oLxM6upTyAUMkd9I5k+rPSXqTxZNwKYlb+fmv
3lAz767E2vzX2bRBk2z+Ul93ff8L840tDGJCx6fhvno3oYoSYhh3AX0GrkvgzuAM
dimn+bd88dBlPH/TkiUGaniPk94Y3VwPesKNqRG7BWbi45QN1KRC7YZJjXQCEzsf
Cc5yHsD6CG2b48PipIf2cuzxArUR5r3gXDsMIQmx/QKBgQDg6359BC2wb0EwNj+N
fs10VkBIfng8WMdoCluwdkli9jjTeGcQgiwneigzWGf57FeTGgg1AQ0yFTQnQX1X
sGtTlRM5x83yYCLDSu/SD2d5UJVhyURIf+nqbuNCnV13tETrlkhxnNgG8fNni0/G
0AHt3Qv3FcuDPDZ8lpij/4NuuwKBgQDfrvkgxlr66EsNjNpnDIGibV5un7sE7crE
8fNnJ0sC7poiSDxTmr3U5YPNYTuFh4Y2eMs0prb/xkgSRbvzg5vBcqENVzjbUGKI
rh9Pb7TgBEXjkfblIuK5xoeer3rgOKaka/7DEOyEg1YkLFZo/kL6pKFHfNKV52ui
WvoVkAw8NwKBgH7CWbQNUc6YtO199U1CRHonTe1NUWf5RNCO3ePSlkNurtIHjlZQ
dp/9CYD+dwL0PtrJlgyBPjWWm6DwGLr90070ujQbNic+JPlZV1VUlyVY1AebTZ9q
b6NOwUe+tnmLIDiBpuxYz6sCWwJlEh3jBuNOa7riDqM0oSSQHxB2JVWXAoGARsYW
DUi1gK3/EUp/0Bsk6T+xoU7o3aZfgfEMEpdcJJFaM36nl8xeQ/5ataEONDGtRY7y
vLYDMOqL4zwtO99oaMzcKFxwoPPOOXDed0Pg9wBjHJ4SgG2JTz6BqrPbLRa/o0aI
VTAFpefoWYmtzYqlpqhwXy4fc07Fv5kJh8kMFgECgYEA1fCLL3UUATCSAX04l4md
YH1e2RhyCg4vY2L23V7bttoNE5gIQEgmDB0DFn6GQKe8UFZyoOiZSmsckQud8vCP
wbkAQY1kVx3TvjnQkB7DrnzUhIUG+NYcA+02E6M3pPU3vo8ggWP63JKyhodIp+uL
HbAwpqjfc5gdk5Z+kG3CizQ=
-----END PRIVATE KEY-----`,
    }),
  });
} else {
  adminApp = getApps()[0]!;
}

export const adminDb = getFirestore(adminApp);
