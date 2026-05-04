import * as React from "react";
import Image from "next/image";
interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function Logo({ size = 24, className, ...props }: LogoProps) {
  return (
    <Image src="/logo/logo-full.png" alt="Logo" width={size} height={size} />
  );
}
