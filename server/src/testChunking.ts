import { splitIntoChunks } from "./services/chunkingService";

const text = `
Employees are entitled to 22 vacation days per year, accrued monthly starting from the first day of employment. Vacation requests must be submitted at least two weeks in advance through the internal HR portal, and approval depends on team workload and manager availability. Unused vacation days may be carried over into the next calendar year, up to a maximum of five days, after which they are forfeited.

Sick leave is granted separately from vacation days. Employees may take up to 14 paid sick days per year without providing a medical certificate for absences of one or two days. For absences longer than three consecutive days, a medical certificate from a licensed physician is required and must be submitted to HR within five business days of returning to work.

Remote work is permitted up to two days per week, subject to manager approval and team needs. Employees working remotely are expected to remain reachable during core hours, from 10:00 to 16:00, and to attend all scheduled meetings with video enabled unless otherwise agreed. Equipment such as laptops and monitors may be provided by the company for remote setups upon request.

Parental leave policies comply with local labor law and provide additional benefits beyond the legal minimum. New parents are entitled to sixteen weeks of paid leave, which can be split between both parents if applicable. A phased return to work, at reduced hours for the first month, is available upon request and does not affect seniority or benefits calculations.
`.trim();

console.log("Text length:", text.length);

const chunks = splitIntoChunks(text, 800, 100);

console.log("Number of chunks:", chunks.length);

chunks.forEach((chunk, index) => {
  console.log(`\n--- Chunk ${index + 1} (${chunk.length} chars) ---`);
  console.log(chunk);
});
