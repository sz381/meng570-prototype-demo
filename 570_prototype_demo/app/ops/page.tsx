export default function OpsPage() {
  return (
    <main className="flex flex-1 items-center px-6 pb-24 lg:px-10">
      <div className="mx-auto w-full max-w-3xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5A6B82]">
          Prototype 03
        </p>
        <h1 className="mt-4 text-[clamp(2.2rem,4vw,3.2rem)] font-medium leading-none tracking-[-0.04em]">
          Relay Ops
        </h1>
        <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.65] text-[#5A6B82]">
          Stock in, stock out. The operations console is being built here —
          today&rsquo;s pickups, what is in storage, what is reserved, and what
          ships in August.
        </p>
      </div>
    </main>
  );
}
