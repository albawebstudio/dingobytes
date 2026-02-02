---
title: Avoid SQL Divide by zero errors
description: The "divide by zero" error in MSSQL can be frustrating when generating reports. A solution using the ⁠NULLIf() method allows for safe handling of zero divisors, refining the SQL statement to calculate click rates without errors. This insight aims to assist others facing similar challenges.
last_updated_at: 2011-09-30T21:27:00
categories: 
  - sql
  - feature
changeFreq: never
backgroundImage: /img/code/Divided_by_zero.jpg
---

I have been writing queries of one type or another for several years, and for the last year and a half I have been trying to learn MSSQL. Although most of the syntax is like every other SQL language, the differences are enough to make me struggle.

One particular item that has always flustered me in the realm of report generating is the dreaded “divide by zero” error. I have been using ColdFusion for handling this through a method I call isZero(value, return_if_zero_value) where I pass it a value and a value I want returned if the value is zero. This has never really been a good solution as the divide value is often something it should not be (should be zero).

I was frustrated with my inability to resolve this correctly and decided to spend some time trying to solve this.

I know that my select statement below will fail when `t1.IMPRESSIONS == 0`

```tsql
SELECT (CONVERT(DECIMAL(10,5), t1.CLICKS) / CONVERT(DECIMAL(10,5), t1.IMPRESSIONS)) * 100 AS CLICK_RATE
```

I scoured through the SQL documentation, and after about 20–30 minutes, I had one of those ‘Eureka!’ moments. What if I could use the `IsNULL()` method in SQL? If I could return null for a value, then maybe I could use IsNULL() to return zero when the divisor is zero. The only way I could do this is to return a null value when the divisor is zero, then correct? Enter the NULLIf() method.

```tsql
IsNULL( DIVIDEND / NULLIf(DIVISOR, 0), 0)
```

I thought I just created something groundbreaking, but in fact another few Google searches and I found that this is really the most common way for most experienced developers to write out the SQL. Here is the result of the SELECT statement.

```tsql
SELECT (IsNULL(CONVERT(DECIMAL(10,5), t1.CLICKS) / NULLIf(CONVERT(DECIMAL(10,5), t1.IMPRESSIONS), 0), 0)
* 100 AS CLICK_RATE
```

I hope that this will help someone in the future. I know I could use it about a year ago.
