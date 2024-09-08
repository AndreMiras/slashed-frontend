import Link from "next/link";

interface PaginationLinkProps {
  page: number;
  text: string;
  disabled?: boolean;
}

const PaginationLink = ({
  page,
  text,
  disabled = false,
}: PaginationLinkProps) => (
  <Link
    href={`?page=${page}`}
    className={`inline-block px-4 py-2 mx-2 bg-neutral-50 dark:bg-neutral-700 text-white rounded hover:bg-neutral-500 ${
      disabled ? "pointer-events-none" : ""
    }`}
    aria-disabled={disabled}
  >
    {text}
  </Link>
);

export default PaginationLink;
