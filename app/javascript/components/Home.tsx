import React from "react";
import { Candidate } from "../Types";

interface NewProps {
  candidates: Candidate[]
} 
const Home = ({ candidates }: NewProps) => {
  const onClick = () => { window.location.href = '/signins/new' };

  return (
        <div>
            <h1> HI </h1>
            {candidates.map(candidate => { 
              return(
                <div>
                  <h1>Candidate {candidate.name}</h1> 
                  <h1>{candidate.votes_count}</h1> 
                </div>
              )
            })}
            <button onClick={onClick}> Signin </button>
        </div>
  );
};

export default Home;
