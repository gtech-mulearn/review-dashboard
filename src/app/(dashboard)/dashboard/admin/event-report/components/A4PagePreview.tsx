import Image from "next/image";

interface PageContent {
  id: string;
  paragraphs: { id: string; text: string }[];
}

interface A4PagePreviewProps {
  pages: PageContent[];
  title: string;
}

export function A4PagePreview({ pages, title }: A4PagePreviewProps) {
  return (
    <div className="flex flex-col items-center overflow-auto lg:col-span-8 print:col-span-12 print:overflow-visible gap-8 print:gap-0 pb-8">
      {pages.map((pageContent, index) => (
        <div
          key={pageContent.id}
          className="relative bg-background shadow-xl print:shadow-none shrink-0 print:break-inside-avoid print:break-after-page"
          style={{
            width: "210mm",
            minHeight: "297mm",
            padding: "20mm",
          }}
        >
          {/* Header on all pages */}
          <div className="mb-4 flex items-start justify-between border-b border-border">
            <h1 className="text-3xl font-bold text-foreground uppercase tracking-wider mt-2">
              Event Report
            </h1>
            <div className="relative h-16 w-32 flex-shrink-0">
              <Image
                src="/logo.webp"
                alt="Logo"
                width={100}
                height={100}
                className="object-contain object-right"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>

          {/* Title & Date only on first page */}
          {index === 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground break-words">
                {title || "Untitled Report"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground font-medium">
                Date: {new Date().toLocaleDateString()}
              </p>
            </div>
          )}

          {/* Content */}
          <div className="prose max-w-none text-foreground">
            {pageContent.paragraphs.map((p) => (
              <p
                key={p.id}
                className="whitespace-pre-wrap leading-relaxed min-h-[1.5rem]"
              >
                {p.text}
              </p>
            ))}
          </div>

          {/* Footer explicitly rendered on every page */}
          <div className="absolute bottom-[20mm] left-[20mm] right-[20mm] flex items-center justify-end border-t border-border pt-4 text-sm text-muted-foreground">
            <span>
              Page {index + 1} of {pages.length}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
