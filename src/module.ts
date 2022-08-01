import "./style.css";

Hooks.on("renderSidebarTab", (tab: SidebarTab, html: JQuery) => {
  if (tab instanceof SceneDirectory) {
    const button = $(
      '<button class="donjon-import-btn">Donjon Importer</button>'
    ).on("click", () => {
      debugger;
    });
    html.find("footer.directory-footer").append(button);
  }
});

export {};
