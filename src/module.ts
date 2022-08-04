import "./style.css";
import rawDonjonData from "@/test/donjon.json";
import { parseDonjonData } from "@/donjon-parser";
import { WallDataConstructorData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/wallData";

Hooks.on("renderSidebarTab", (tab: SidebarTab, html: JQuery) => {
  if (tab instanceof SceneDirectory) {
    const button = $(
      '<button class="donjon-import-btn">Donjon Importer</button>'
    ).on("click", async () => {
      const donjon = parseDonjonData(rawDonjonData);

      if (canvas?.scene && !("size" in canvas.scene.dimensions)) {
        return;
      }

      await canvas?.walls?.deleteAll();

      await donjon.reduce<Promise<void>>(
        (promise, row, rowIdx) =>
          promise.then(() =>
            row.reduce<Promise<void>>(
              (promise, cell, colIdx) =>
                promise.then(async () => {
                  // ignore doors for now, treat theme as empty spaces
                  if (cell.openSpace || cell.doorSpace !== false) {
                    const walls: WallDataConstructorData[] = [];
                    // north (row above, same col)
                    if (
                      rowIdx > 0 &&
                      (donjon[rowIdx - 1][colIdx].nothing ||
                        donjon[rowIdx - 1][colIdx].perimeter)
                    ) {
                      walls.push({ c: [colIdx, rowIdx, colIdx + 1, rowIdx] });
                    }
                    // west
                    if (
                      colIdx > 0 &&
                      (donjon[rowIdx][colIdx - 1].nothing ||
                        donjon[rowIdx][colIdx - 1].perimeter)
                    ) {
                      walls.push({ c: [colIdx, rowIdx, colIdx, rowIdx + 1] });
                    }
                    // ignore south and east for now

                    if (walls.length) {
                      await createWalls(walls);
                    }
                  }
                }),
              Promise.resolve()
            )
          ),
        Promise.resolve()
      );
    });
    html.find("footer.directory-footer").append(button);
  }
});

async function createWalls(walls: WallDataConstructorData[]): Promise<void> {
  if (!canvas?.scene) {
    throw new Error("Current scene not available");
  }
  if (!("size" in canvas.scene.dimensions)) {
    throw new Error("Scene dimensions not available.");
  }
  const { size, paddingX, paddingY } = canvas.scene.dimensions;
  await canvas.scene.createEmbeddedDocuments(
    "Wall",
    walls.map(({ c: [row1, col1, row2, col2] }) => ({
      c: [
        row1 * size + paddingX,
        col1 * size + paddingY,
        row2 * size + paddingX,
        col2 * size + paddingY,
      ],
    }))
  );
}

export {};
