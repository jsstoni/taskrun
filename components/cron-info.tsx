import { Globe } from 'lucide-react';

export function CronInfo() {
  return (
    <div className="space-y-4">
      <div className="relative rounded-xl border border-white/10 bg-sidebar">
        <div className="flex items-center justify-between rounded-t-xl border-b border-white/10 bg-muted px-3 py-1.5">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center rounded bg-black/20 px-2 py-1 font-mono text-xs text-gray-400">
              <Globe className="mr-1 h-3 w-3" />
              api.taskrun.online
            </div>
          </div>
        </div>
        {/* prettier-ignore */}
        <div className="p-4 tracking-tigh bg-accent rounded-b-lg text-sm">
<pre className="m-0 p-0 font-mono leading-5 text-xs">
{`*  *  *  *  *          http://site.online/send
┬  ┬  ┬  ┬  ┬
│  │  │  │  └────────  Weekday  (0=Sun .. 6=Sat)
│  │  │  └───────────  Month    (1..12)
│  │  └──────────────  Day      (1..31)
│  └─────────────────  Hour     (0..23)
└────────────────────  Minute   (0..59)`}</pre>
      </div>
      </div>
    </div>
  );
}
