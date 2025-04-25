import React from "react";
import { Candidate } from "../Types";

interface NewProps {
  candidates: Candidate[]
} 

const Home = ({ candidates }: NewProps) => {
  return (
        <div>
            <h1> HI </h1>
            {candidates.map(candidate => { 
              return(
                <div>
                  <h1>Candidate {candidate.name}</h1> 
                  <h1>{candidate.votes}</h1> 
                </div>
              )
            })}
        </div>
  );
};

export default Home;
