import PaginationLink from "@/app/components/PaginationLink";

interface PaginationProps {
  page: number;
}

const Pagination = ({ page }: PaginationProps) => (
  <div className="w-full text-center mt-6">
    <PaginationLink page={page - 1} text="Previous" disabled={page === 1} />
    <PaginationLink page={page + 1} text="Next" />
  </div>
);

export default Pagination;
