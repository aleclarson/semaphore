
# semaphore v1.0.0 [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

```coffee
Semaphore = require "semaphore"

semaphore = Semaphore 2

semaphore
  .then -> # The semaphore was called twice!
  .done() # A promise is returned by `then()`.

semaphore()
semaphore() # This triggers any semaphore listeners.
```
