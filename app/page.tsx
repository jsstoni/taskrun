import { Logo } from '@/components/logo';
import { SignIn } from '@/components/sign-in';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function Home() {
  return (
    <header className="relative overflow-hidden mask-b-from-70% mask-b-to-90% pb-10">
      <div className="absolute top-1/4 left-1/4 size-[450px] rounded-full bg-purple-900/40 blur-[150px]"></div>
      <div className="absolute right-1/4 bottom-1/4 size-[450px] rounded-full bg-blue-900/40 blur-[150px]"></div>
      <div className="relative flex flex-col items-center gap-2 py-14">
        <Logo />
        <div className="relative flex max-w-xl flex-col gap-2 text-center">
          <h1 className="text-6xl font-black">
            Run jobs on schedule. That’s it.
          </h1>
          <p className="text-lg text-muted-foreground">
            Let users define scheduled tasks that hit your endpoints with custom
            metadata — no infrastructure needed.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button size="sm" variant="outline">
            Read the doc
          </Button>
          <SignIn />
        </div>

        <div className="bg-sideba relative mx-auto mt-4 min-w-2xl rounded-xl border border-white/10">
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
          <div className="p-2 tracking-tigh bg-accent/60 text-sm">
            <pre className="m-0 p-0 font-mono leading-5">
{`*  *  *  *  *          http://site.online/send
┬  ┬  ┬  ┬  ┬
│  │  │  │  └────────  Weekday  (0=Sun .. 6=Sat)
│  │  │  └───────────  Month  (1..12)
│  │  └──────────────  Day    (1..31)
│  └─────────────────  Hour   (0..23)
└────────────────────  Minute   (0..59)`}</pre>
          </div>
        </div>
      </div>
    </header>
  );
}
