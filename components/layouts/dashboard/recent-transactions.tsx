import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Gavel } from "lucide-react";
  import { StatusBadge } from "./status-badge";
  
  export function RecentTable({ onDispute, onRelease }: any) {
    return (
      <div className="rounded-2xl border">
        <Table className="p-4 scrollbar-hide">
          <TableHeader >
            <TableRow>
              <TableHead>Recipient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
  
          <TableBody>
            <TableRow>
              <TableCell>@merchant_alpha</TableCell>
              <TableCell>50,000 PTS</TableCell>
              <TableCell>
                <StatusBadge status="RELEASE_REQUESTED" />
              </TableCell>
  
              <TableCell className="text-right space-x-3">
                <button
                  onClick={() => onRelease("TX-9901")}
                  className="text-green-600 font-bold"
                >
                  Release
                </button>
  
                <button
                  onClick={() => onDispute("TX-9901")}
                  className="text-red-500 font-bold"
                >
                  <Gavel size={14} className="inline mr-1" />
                  Dispute
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }