import type { SceneMeta } from "@/lib/sceneStore";
import { sceneStore } from "@/lib/sceneStore";

export type Command = {
  id: string;
  title: string;
  group: "Scenes" | "Products" | "Links" | "Contact";
  hint?: string;
  keywords?: string;
  dot?: string;
  run: (ctx: { close: () => void }) => void;
};

const go = (href: string, newTab = false) => {
  if (newTab) window.open(href, "_blank", "noopener,noreferrer");
  else window.location.assign(href);
};

/* Scene commands come from the live registry (Home); static commands
   work everywhere. The palette is THE nav — everything reachable. */
export function buildCommands(scenes: SceneMeta[]): Command[] {
  const sceneCmds: Command[] = scenes.map((s) => ({
    id: `scene:${s.id}`,
    title: s.label,
    group: "Scenes",
    hint: "travel",
    keywords: s.id,
    dot: s.accent,
    run: ({ close }) => {
      close();
      sceneStore.travelTo(s.id, { focus: true });
    },
  }));

  const products: Command[] = [
    {
      id: "p:inspector",
      title: "Monday.com Inspector",
      group: "Products",
      hint: "the DevTools for monday.com",
      keywords: "extension chrome devtools graphql import",
      dot: "#6D5EF7",
      run: () => go("/products/extension"),
    },
    {
      id: "p:virtual",
      title: "MondayVirtual",
      group: "Products",
      hint: "your office, inside monday.com",
      keywords: "3d office voice avatars saas",
      dot: "#10B981",
      run: () => go("/products/mondayvirtual"),
    },
  ];

  const links: Command[] = [
    {
      id: "l:store",
      title: "Chrome Web Store",
      group: "Links",
      hint: "install Monday.com Inspector",
      keywords: "install extension download",
      run: () => go("https://chromewebstore.google.com/detail/kmmmfnkjdcmemcmjipidodnipidadaeg", true),
    },
    {
      id: "l:github",
      title: "GitHub — the lab",
      group: "Links",
      hint: "github.com/sametivon",
      keywords: "source open code watch lab",
      run: () => go("https://github.com/sametivon", true),
    },
    {
      id: "l:inspector-site",
      title: "mondayinspector.eu",
      group: "Links",
      hint: "Inspector guides & docs",
      keywords: "docs guides help",
      run: () => go("https://mondayinspector.eu", true),
    },
    {
      id: "l:virtual-site",
      title: "mondayvirtual.eu",
      group: "Links",
      hint: "MondayVirtual product site",
      keywords: "virtual office site",
      run: () => go("https://mondayvirtual.eu", true),
    },
  ];

  const contact: Command[] = [
    {
      id: "c:project",
      title: "Start a project",
      group: "Contact",
      hint: "sam@fruitionservices.io",
      keywords: "email contact hire work build talk",
      run: ({ close }) => {
        close();
        if (!sceneStore.travelTo("contact", { focus: true })) go("/#contact");
      },
    },
  ];

  return [...sceneCmds, ...products, ...links, ...contact];
}
