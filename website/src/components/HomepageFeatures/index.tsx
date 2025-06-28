import { getImageUrl } from "@site/src/utils/images";
import Heading from "@theme/Heading";
import clsx from "clsx";
import { JSX } from "react";

import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Text-to-speech conversion",
    image: getImageUrl("1.svg"),
    description: <>react-text-to-speech converts text input to speech output using the WebSpeech API.</>,
  },
  {
    title: "Easy to Use, yet Fully Customizable",
    image: getImageUrl("2.png"),
    description: <>react-text-to-speech was designed from the ground up to be easily imported and used in your React.js app, while providing all possible customization options.</>,
  },
  {
    title: "Highlights words",
    image: getImageUrl("3.png"),
    description: <>react-text-to-speech provides an option to highlight words as they are read in speech utterance.</>,
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className={styles.featureSvgWrapper}>
        <img src={image} alt={title} className={styles.featureSvg} />
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
