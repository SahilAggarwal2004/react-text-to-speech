import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Text-to-speech conversion",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: <>react-text-to-speech converts text input to speech output using the WebSpeech API.</>,
  },
  {
    title: "Easy to Use, yet Fully Customizable",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: <>react-text-to-speech was designed from the ground up to be easily imported and used in your React.js app, while providing all possible customization options.</>,
  },
  {
    title: "Highlights words",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>react-text-to-speech provides an option to highlight words as they are read in speech utterance.</>,
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
