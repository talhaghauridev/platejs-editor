import { Toaster } from "sonner";
import { SettingsProvider } from "@/components/editor/settings";
import { EditorLayout } from "@/components/editor/editor-layout";

export default function Page() {
  return (
    <div>
      <section className="flex items-center justify-center">
        <div
          className="h-screen w-full flex flex-col overflow-auto"
          data-registry="plate"
        >
          <SettingsProvider>
            <EditorLayout />
          </SettingsProvider>

          <Toaster />
        </div>
      </section>
    </div>
  );
}
