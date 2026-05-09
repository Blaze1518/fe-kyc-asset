"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { getFilesForSlug } from "@/modules/explorer/presentation/mock/files";
import FileHeader from "./FileHeader";
import FileToolbar from "./FileToolbar";
import { FileRow } from "./file-manager";

const EXPLORER_BASE = "/dashboard/explorer";

export default function ExplorerView() {
  const params = useParams();
  const slug = (params.slug as string[] | undefined) ?? [];
  const files = getFilesForSlug(slug);

  return (
    <div className="space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={EXPLORER_BASE}>Root</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {slug.map((segment, index) => {
            const isLast = index === slug.length - 1;
            const href = `${EXPLORER_BASE}/${slug.slice(0, index + 1).join("/")}`;
            return (
              <React.Fragment key={`${index}-${segment}`}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{segment}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="border-border bg-card min-w-0 flex-1 space-y-4 ">
        <FileHeader slug={slug} />
        <div className="flex flex-col border-t">
          <FileToolbar />
          <div className="flex flex-col">
            {files.map((file) => (
              <FileRow key={file.id} data={file} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
