import "./style.css";
import rawDonjonData from "@/test/donjon-2.json";
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

      interface MyWall {
        col1: number;
        row1: number;
        col2: number;
        row2: number;
      }

      const walls: { horizontal: MyWall[]; vertical: MyWall[] } = {
        horizontal: [],
        vertical: [],
      };

      donjon.forEach((row, rowIdx) => {
        row.forEach((cell, colIdx) => {
          // horizontal wall (top side)
          if (
            // the current cell is open but its on the top edge of the map
            (rowIdx === 0 && cell.free) ||
            // not on top-most row
            (rowIdx > 0 &&
              // the current cell is blocked, but above is open
              ((cell.blocked && donjon[rowIdx - 1][colIdx].free) ||
                // the current cell is open and above is blocked
                (cell.free && donjon[rowIdx - 1][colIdx].blocked)))
          ) {
            walls.horizontal.push({
              row1: rowIdx,
              col1: colIdx,
              row2: rowIdx,
              col2: colIdx + 1,
            });
          }
          // horizontal wall (bottom side)
          if (
            // bottom row that's open, paint a south wall
            rowIdx === donjon.length - 1 &&
            cell.free
          ) {
            walls.horizontal.push({
              row1: rowIdx + 1,
              col1: colIdx,
              row2: rowIdx + 1,
              col2: colIdx + 1,
            });
          }

          // vertical wall (left side)
          if (
            // the current cell is open and on the left edge of the map
            (colIdx === 0 && cell.free) ||
            // not on left-most column
            (colIdx > 0 &&
              // the current cell is blocked, but left is open
              ((cell.blocked && donjon[rowIdx][colIdx - 1].free) ||
                // the current cell is open and left is blocked
                (cell.free && donjon[rowIdx][colIdx - 1].blocked)))
          ) {
            walls.vertical.push({
              row1: rowIdx,
              col1: colIdx,
              row2: rowIdx + 1,
              col2: colIdx,
            });
          }

          // vertical wall (right side)
          if (
            // right most column that open, paint an right wall
            colIdx === row.length - 1 &&
            cell.free
          ) {
            walls.horizontal.push({
              row1: rowIdx,
              col1: colIdx + 1,
              row2: rowIdx + 1,
              col2: colIdx + 1,
            });
          }
        });
      });

      console.log([...walls.horizontal, ...walls.vertical]);

      // if (oldWalls.length) {
      await createWalls([
        ...[
          ...walls.horizontal,
          ...walls.vertical,
        ].map<WallDataConstructorData>(({ col1, row1, col2, row2 }) => ({
          c: [col1, row1, col2, row2],
        })),
      ]);
      // }
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
