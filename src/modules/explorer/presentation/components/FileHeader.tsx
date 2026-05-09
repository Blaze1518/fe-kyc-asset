interface FileHeaderProps {
  slug?: string[];
}

const FileHeader = ({ slug = [] }: FileHeaderProps) => {
  const title =
    slug.length === 0 ? "Explorer" : (slug[slug.length - 1] ?? "Explorer");

  return (
    <div className="flex justify-between p-4 lg:p-6">
      <h1 className="text-lg font-semibold tracking-tight capitalize">
        {title}
      </h1>
    </div>
  );
};

export default FileHeader;
