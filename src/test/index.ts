import "./donjon.png";
import "./test.css";
import donjonDataRaw from "./donjon-2.json";
import { parseDonjonData, RawDonjonDungeon } from "../donjon-parser";

const donjonData: RawDonjonDungeon = donjonDataRaw;

const parsed = parseDonjonData(donjonData);

const container = document.createElement("div");
container.id = "root";
container.classList.add("container");
const img = document.createElement("img");
img.src = "/src/test/donjon-2.png";

parsed.forEach((row, rowIdx) => {
  const rowDiv = document.createElement("div");
  rowDiv.dataset.rowIdx = rowIdx.toString();
  rowDiv.classList.add("row");

  row.forEach((cell, colIdx) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.dataset.colIdx = colIdx.toString();
    cellDiv.title = JSON.stringify(cell, null, 2);
    if (cell.perimeter) {
      cellDiv.classList.add("perimeter");
    } else if (cell.doorSpace) {
      cellDiv.classList.add(cell.doorSpace);
    } else if (cell.openSpace) {
      cellDiv.classList.add("open");
    } else if (cell.nothing) {
      cellDiv.classList.add("empty");
    }

    rowDiv.appendChild(cellDiv);
  });

  container.appendChild(rowDiv);
});

document.getElementById("app")!.append(container, img);

export {};
