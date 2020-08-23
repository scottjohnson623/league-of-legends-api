import fs from "fs";

export function findChampionName(id) {
  let championData = fs.readFileSync("./src/data/champion.json");
  for (const champion in championData.data) {
    if (champion.id == id) {
      return champion.name;
    }
  }
}
