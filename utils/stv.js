const { Ballot, Candidate, STV } = require('votejs');
const CandidateModel = require('../models/Candidate');
const BallotModel = require('../models/Ballot');

// Get all the candidates from the database
const getCandidates = async () => {
  return await CandidateModel.find({});
};

// Get all the ballots from the database
const getBallots = async () => {
  const ballots = await BallotModel.find({});
  return ballots.map(ballot => new Ballot({ ...ballot.preferences }));
};

// Save the results to the database
const saveResults = async (results) => {
  for (const candidate of results) {
    await CandidateModel.findByIdAndUpdate(candidate.id, { votes: candidate.votes });
  }
};

// Conduct the STV election
const conductElection = async () => {
  const candidates = await getCandidates();
  const ballots = await getBallots();
  const stv = new STV(candidates, ballots);
  const results = stv.results();
  await saveResults(results);
  return results;
};

module.exports = { conductElection };
