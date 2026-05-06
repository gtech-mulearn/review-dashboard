import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GenerateIndividualDialogProps {
  onGenerate: (muid: string) => void;
}

export function GenerateIndividualDialog({
  onGenerate,
}: GenerateIndividualDialogProps) {
  const [individualMuid, setIndividualMuid] = useState("");

  const handleGenerate = () => {
    if (!individualMuid) return;
    onGenerate(individualMuid);
    setIndividualMuid("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          Generate Individual Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Individual Report</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="muid">Intern MUID</Label>
            <Input
              id="muid"
              placeholder="e.g. dev-1234"
              value={individualMuid}
              onChange={(e) => setIndividualMuid(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleGenerate} disabled={!individualMuid}>
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
