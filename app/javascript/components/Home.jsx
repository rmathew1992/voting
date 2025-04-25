import React from "react";

const Home = ({ candidates }) => {
  return (
        <div>
            <h1> HI </h1>
            {candidates.map(candidate => { 
              return(
                <h1>Candidate {candidate.name}</h1> 
              )
            })}
        </div>
  );
};

export default Home;
