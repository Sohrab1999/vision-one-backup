"use client";

import { useMemo, useState } from "react";
import { Repeat, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { IRREGULAR_VERBS } from "@/data/book-meta";
import { SpeakButton } from "./speak-button";

export function VerbsView() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return IRREGULAR_VERBS;
    return IRREGULAR_VERBS.filter(
      (v) =>
        v.base.toLowerCase().includes(q) ||
        v.past.toLowerCase().includes(q) ||
        v.participle.toLowerCase().includes(q) ||
        v.meaning.includes(query.trim()),
    );
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-black">
            <Repeat size={20} className="text-primary" />
            افعال بی‌قاعده
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {IRREGULAR_VERBS.length.toLocaleString("fa-IR")} فعل بی‌قاعده جزوه — شکل اول، گذشته، اسم مفعول و معنی.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو (go / went / رفتن)"
            className="pr-9 bg-card"
            aria-label="جستجوی فعل"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-card">
                <TableRow>
                  <TableHead className="w-10 text-center">#</TableHead>
                  <TableHead className="text-left">شکل اول</TableHead>
                  <TableHead className="text-left">شکل دوم (گذشته)</TableHead>
                  <TableHead className="text-left">شکل سوم (p.p)</TableHead>
                  <TableHead>معنی</TableHead>
                  <TableHead className="w-12">صدا</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((v, i) => (
                  <TableRow key={`${v.base}-${i}`} className="hover:bg-muted/40">
                    <TableCell className="text-center text-xs text-muted-foreground">
                      {(i + 1).toLocaleString("fa-IR")}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" dir="ltr" className="font-en text-[12px] font-bold">
                        {v.base}
                      </Badge>
                    </TableCell>
                    <TableCell dir="ltr" className="font-en text-left text-[13px] font-semibold">
                      {v.past}
                    </TableCell>
                    <TableCell dir="ltr" className="font-en text-left text-[13px] font-semibold text-primary">
                      {v.participle}
                    </TableCell>
                    <TableCell className="text-[13px]">{v.meaning}</TableCell>
                    <TableCell>
                      <SpeakButton text={`${v.base}, ${v.past}, ${v.participle}`} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
