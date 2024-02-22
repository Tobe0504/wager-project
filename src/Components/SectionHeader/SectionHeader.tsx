import classes from "./SectionHeader.module.css";

type SectionHeaderProps = {
  title: string;
  paragraph: string;
};

const SectionHeader = ({ title, paragraph }: SectionHeaderProps) => {
  return (
    <div className={classes.container}>
      <h4>{title}</h4>
      <p>{paragraph}</p>
    </div>
  );
};

export default SectionHeader;
