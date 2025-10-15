interface PageHeaderProps {
  heading: string;
  paragraph: string;
}
function PageHeader({ heading, paragraph }: PageHeaderProps) {
  return (
    <div>
      <h2>{heading}</h2>
      <p>{paragraph}</p>
    </div>
  );
}

export default PageHeader;
