Heroku Benchpack
=================================

This is a repository which makes it easy to performance test an application deployed on Heroku.
[Apache Bench](http://httpd.apache.org/docs/2.2/programs/ab.html), `ab` is the defacto tool for testing the performance of a web application, but many people do not have access to a high enough bandwidth connection to actually test the performance of applications deployed on clouds such as Heroku. This repository makes it easy to perform performance testing on Heroku applications. 

This repository makes use of vendored binaries on heroku, using the result of [Vulcan-Apache](https://github.com/wcdolphin/vulcan-apache), [Heroku-buildpack-vendorbinaries](https://github.com/wcdolphin/heroku-buildpack-vendorbinaries). Please consult me if any issues arise, and please contribute if you see any room for improvement!

To use, clone this repository and simply deploy to heroku and set the environment variables.

    $ git clone git@github.com:wcdolphin/heroku-benchpack.git
    $ herok apps:create
    $ heroku config:add LD_LIBRARY_PATH=/app/vendor/apache-2.4.4/lib/:$LD_LIBRARY_PATH
    $ heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
    $ heroku config:add PATH=/app/vendor/apache-2.4.4/bin/:$PATH
    $ git push heroku master

To actually bench a website, use the standard ab commandline options, prefixed by `heroku run`:

    $ heroku run "ab -n 10000 -c 1000 http://www.google.com/"

Result:

    This is ApacheBench, Version 2.3 <$Revision: 1430300 $>
    Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/

    Licensed to The Apache Software Foundation, http://www.apache.org/

    Benchmarking www.google.com (be patient)
    Completed 1000 requests
    Completed 2000 requests
    Completed 3000 requests
    Completed 4000 requests
    Completed 5000 requests
    Completed 6000 requests
    Completed 7000 requests
    Completed 8000 requests
    Completed 9000 requests
    Completed 10000 requests
    Finished 10000 requests


    Server Software:        gws
    Server Hostname:        www.google.com
    Server Port:            80

    Document Path:          /
    Document Length:        12728 bytes
    Concurrency Level:      1000
    Time taken for tests:   7.776 seconds
    Complete requests:      10000
    Failed requests:        9209
       (Connect: 0, Receive: 0, Length: 9209, Exceptions: 0)
    Write errors:           0
    Total transferred:      135381100 bytes
    HTML transferred:       128021100 bytes
    Requests per second:    1286.07 [#/sec] (mean)
    Time per request:       777.562 [ms] (mean)
    Time per request:       0.778 [ms] (mean, across all concurrent requests)
    Transfer rate:          17002.89 [Kbytes/sec] received

    Connection Times (ms)
                  min  mean[+/-sd] median   max
    Connect:       21  163 195.5     62    1561
    Processing:    51  377 368.9    194    4538
    Waiting:       30  168 191.3     78    4496
    Total:        104  541 464.1    316    4582

    Percentage of the requests served within a certain time (ms)
      50%    316
      66%    543
      75%    788
      80%    969
      90%   1271
      95%   1498
      98%   1684
      99%   1897
     100%   4582 (longest request)
