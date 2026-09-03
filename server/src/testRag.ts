import "dotenv/config";
import { askDocuments } from "./services/ragService";

async function test() {
  const result = await askDocuments("How long do I have to send an item back?");

  console.log(result);
}

test();
