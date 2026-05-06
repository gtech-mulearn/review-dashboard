import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventReportFormProps {
  title: string;
  setTitle: (title: string) => void;
  details: string;
  setDetails: (details: string) => void;
  onDownloadPDF: () => void;
}

export function EventReportForm({
  title,
  setTitle,
  details,
  setDetails,
  onDownloadPDF,
}: EventReportFormProps) {
  return (
    <div className="space-y-6 lg:col-span-4 print:hidden">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm sticky top-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-card-foreground">
          <FileText size={20} className="text-primary" />
          Report Details
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Report Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Enter report title..."
            />
          </div>

          <div>
            <label
              htmlFor="details"
              className="mb-1 block text-sm font-medium text-foreground"
            >
              Report Content
            </label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={16}
              className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Enter report details..."
            />
          </div>
          <Button variant={"default"} onClick={onDownloadPDF}>
            Generate PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
