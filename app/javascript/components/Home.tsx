import React from "react";
import { Candidate } from "../Types";
import { relative } from "path";

interface NewProps {
  candidates: Candidate[]
} 
const Home = ({ candidates }: NewProps) => {
  const onClick = () => { window.location.href = '/signins/new' };

  return (
        <div>
            <div>
              <p style={{padding: '10px', margin: '0px'}}>VOTE.WEBSITE</p>
              <hr style={{margin: '0px'}} />
            </div>
            <div style={{position: 'relative', width: '500px', maxWidth: '100%', margin: '50px'}}>
              <h1> Results </h1>
              <hr/>
              <div>
                {candidates.map(candidate => { 
                  return(
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between',  padding: '15px'}}>
                        <p>{candidate.name}</p> 
                        <p>{candidate.votes_count}</p> 
                      </div>
                      <hr/>
                    </div>
                  )
                })}
              </div>
              <button onClick={onClick}> Signin </button>
            </div>
        </div>
  );
};

export default Home;
