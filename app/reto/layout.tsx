import { LangToggle } from "@/components/LangToggle";
import { ProgressBar } from "@/components/ProgressBar";

export default function RetoLayout({ children }: LayoutProps<"/reto">) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <header className="flex items-center justify-between px-5 pb-2 pt-[max(1rem,env(safe-area-inset-top))]">
        <ProgressBar />
        <LangToggle />
      </header>
      <main className="flex flex-1 flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">{children}</main>
    </div>
  );
}
