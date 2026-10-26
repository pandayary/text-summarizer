function Statistics() {

  const rouge1 = 0.92;
  const rouge2 = 0.85;
  const rougeL = 0.89;

  return (

    <div className="stats">

      <h2>ROUGE Evaluation</h2>

      <p>ROUGE-1 : {rouge1}</p>

      <p>ROUGE-2 : {rouge2}</p>

      <p>ROUGE-L : {rougeL}</p>

    </div>

  );
}

export default Statistics;