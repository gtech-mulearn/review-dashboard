"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { A4PagePreview } from "./components/A4PagePreview";
import { EventReportForm } from "./components/EventReportForm";

export default function EventReportPage() {
  const [title, setTitle] = useState("Sample Event Report Title");
  const [details, setDetails] = useState(
    "This is a sample description for the event report. It contains all the necessary details about what happened during the event, the number of participants, key takeaways, and future action items. You can edit this text to see how it looks on the A4 sheet preview.",
  );

  const handleDownloadPDF = () => {
    window.print();
  };

  const getPages = (text: string) => {
    if (!text) return [{ id: "empty-page", paragraphs: [] }];

    const paragraphs = text.split("\n");
    const pages: { id: string; paragraphs: { id: string; text: string }[] }[] =
      [];
    let currentPage: { id: string; text: string }[] = [];
    let currentLength = 0;

    let idCounter = 0;
    const nextId = () => `item-${idCounter++}`;

    // First page has header, so fewer characters
    const FIRST_PAGE_LIMIT = 1800;
    const NORMAL_PAGE_LIMIT = 3000;

    for (let i = 0; i < paragraphs.length; i++) {
      const p = paragraphs[i];
      const limit = pages.length === 0 ? FIRST_PAGE_LIMIT : NORMAL_PAGE_LIMIT;

      // If a single paragraph is longer than a page limit, we must split it
      if (p.length > limit) {
        if (currentPage.length > 0) {
          pages.push({ id: nextId(), paragraphs: currentPage });
          currentPage = [];
          currentLength = 0;
        }

        let remaining = p;
        while (remaining.length > 0) {
          const chunkLimit =
            pages.length === 0 ? FIRST_PAGE_LIMIT : NORMAL_PAGE_LIMIT;
          const chunk = remaining.slice(0, chunkLimit);
          pages.push({
            id: nextId(),
            paragraphs: [{ id: nextId(), text: chunk }],
          });
          remaining = remaining.slice(chunkLimit);
        }
      } else {
        if (currentLength + p.length > limit && currentPage.length > 0) {
          pages.push({ id: nextId(), paragraphs: currentPage });
          currentPage = [{ id: nextId(), text: p }];
          currentLength = p.length;
        } else {
          currentPage.push({ id: nextId(), text: p });
          // add 1 for newline equivalent
          currentLength += p.length + 1;
        }
      }
    }

    if (currentPage.length > 0) {
      pages.push({ id: nextId(), paragraphs: currentPage });
    }

    return pages;
  };

  const pages = getPages(details);

  return (
    <div className="min-h-screen bg-muted p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Event Report Generator
            </h1>
            <p className="text-muted-foreground">
              Create and download event reports as PDF
            </p>
          </div>
          <Button
            variant={"default"}
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 print:hidden"
          >
            <Download size={20} />
            Download PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <EventReportForm
            title={title}
            setTitle={setTitle}
            details={details}
            setDetails={setDetails}
            onDownloadPDF={handleDownloadPDF}
          />

          <A4PagePreview pages={pages} title={title} />
        </div>
      </div>
    </div>
  );
}
