import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center justify-between">
        <div className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Promptr. All rights reserved.
        </div>
        <Link
          href="/admin/privacy"
          className="text-xs text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
