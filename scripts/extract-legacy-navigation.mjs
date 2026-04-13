import {
  buildLegacyInventory,
  printInventorySummary,
  writeJsonFile,
  GENERATED_ROOT,
} from "./shared/legacy-content.mjs";

const inventory = buildLegacyInventory();

writeJsonFile(`${GENERATED_ROOT}/legacy-inventory.json`, inventory);
printInventorySummary(inventory);
