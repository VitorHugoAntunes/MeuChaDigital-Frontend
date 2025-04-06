interface HeaderProps {
  title: string;
  description: string;
}

export const Header = ({ title, description }: HeaderProps) => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-text-primary text-left">{title}</h1>
      <p className="text-md mt-2 text-text-secondary text-left">{description}</p>
    </>
  );
};