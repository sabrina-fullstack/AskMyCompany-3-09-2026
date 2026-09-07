import "dotenv/config";
import { addDocument } from "./services/documentService";

const documents = [
  {
    title: "Refund Policy",
    content:
      "Customers may return unopened products within 14 days of purchase.",
  },
  {
    title: "Shipping Policy",
    content: "Orders are normally delivered within 3-5 business days.",
  },
  {
    title: "Support Hours",
    content:
      "Customer support is available Sunday through Thursday from 09:00 to 17:00.",
  },
  {
    title: "Warranty",
    content:
      "Electronic products include a one year warranty from the purchase date.",
  },
  {
    title: "Company Policy",
    content: "Employees receive 22 vacation days per year.",
  },
  {
    title: "Office Hours",
    content:
      "Our offices are open Sunday through Thursday from 08:00 to 18:00. The offices are closed on Friday, Saturday, and public holidays.",
  },
  {
    title: "Payment Policy",
    content:
      "We accept credit cards, debit cards, and PayPal. Payments are processed securely and card details are never stored on our servers.",
  },
  {
    title: "Delivery Areas",
    content:
      "We currently deliver to all regions within the country. International shipping is available to select countries in Europe and North America.",
  },
  {
    title: "Cancellation Policy",
    content:
      "Orders can be cancelled free of charge within 1 hour of being placed. After that, cancellation is only possible if the order has not yet shipped.",
  },
  {
    title: "Technical Support",
    content:
      "Technical support is available by email and live chat. Response time is typically within 24 hours on business days.",
  },

  {
    title: "Student Discount",
    content:
      "Students receive a 10 percent discount on laptops above 3000 shekels. A valid student ID is required. The discount cannot be combined with other promotions.",
  },
];

async function seed() {
  for (const doc of documents) {
    const result = await addDocument(doc.title, doc.content);
    console.log(`✅ Added: ${result.title} (id: ${result.document_id})`);
  }
  console.log("🌱 Seeding complete.");
}

seed();
