# TaskRun

Let users define scheduled tasks that hit your endpoints with custom metadata — no infrastructure needed.

```
*  *  *  *  *          http://site.online/send
┬  ┬  ┬  ┬  ┬
│  │  │  │  └────────  Weekday  (0=Sun .. 6=Sat)
│  │  │  └───────────  Month  (1..12)
│  │  └──────────────  Day    (1..31)
│  └─────────────────  Hour   (0..23)
└────────────────────  Minute   (0..59)
```
