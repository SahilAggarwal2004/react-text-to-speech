import { getImageUrl } from "@site/src/utils/images";
import Heading from "@theme/Heading";
import clsx from "clsx";
import { JSX } from "react";

import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  svg: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Text-to-speech conversion",
    svg: getImageUrl("undraw_docusaurus_tree.svg"),
    description: <>react-text-to-speech converts text input to speech output using the WebSpeech API.</>,
  },
  {
    title: "Easy to Use, yet Fully Customizable",
    svg: getImageUrl("undraw_docusaurus_mountain.svg"),
    description: <>react-text-to-speech was designed from the ground up to be easily imported and used in your React.js app, while providing all possible customization options.</>,
  },
  {
    title: "Highlights words",
    svg: getImageUrl("undraw_docusaurus_react.svg"),
    description: <>react-text-to-speech provides an option to highlight words as they are read in speech utterance.</>,
  },
];

function Feature({ title, svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img src={svg} alt={title} className={styles.featureSvg} />
        {/* <Svg className={styles.featureSvg} role="img" /> */}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
