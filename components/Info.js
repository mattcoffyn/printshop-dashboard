function createArrayFromPhrase(phrase) {
  const splitPhrase = phrase.split(' ');
  const thirdWord = splitPhrase.pop();
  return [splitPhrase.join(' '), thirdWord];
}

const InfoSection = (props) => {
  const { className, heading, children } = props;
  return (
    <section className={`bx--row ${className} info-section`}>
      <div className="bx--col-md-8 bx--col-lg-4 bx--col-xlg-3">
        <h3 className="info-section__heading">{heading}</h3>
      </div>
      {children}
    </section>
  );
};

const InfoCard = (props) => {
  const { heading, body, children } = props;
  const splitHeading = createArrayFromPhrase(heading);
  return (
    <div className="info-card bx--col-md-4 bx--col-lg-4 bx--col-xlg-3 bx--offset-xlg-0">
      <h4 className="info-card__heading">
        {' '}
        {`${splitHeading[0]} `}
        <strong>{splitHeading[1]}</strong>
      </h4>
      <p className="info-card__body">{body}</p>
      {children}
    </div>
  );
};

export { InfoSection, InfoCard };
