import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // useParams'ı import edin
import Step1MatchInfo from '../../components/Match/Step1MatchInfo';
import Step2CoachWriter from '../../components/Match/Step2CoachWriter';
import Step3Wrestlers from '../../components/Match/Step3Wrestlers';
import Step4FinalReview from '../../components/Match/Step4FinalReview';
import { createMatch } from '../../services/Match/matchService';
import { createMatchParticipant } from '../../services/MatchParticipant/matchParticipantService';

const MatchCreatePage = () => {
  const { id: showId } = useParams(); // Show ID'yi URL'den alın
  const [step, setStep] = useState(1);
  const [matchData, setMatchData] = useState({
    Type: '',
    Stipulation: '',
    MatchOrder: '',
    IsTitleMatch: false,
    coach: null,
    writer: null,
    wrestlerIds: [],
    wrestlers: [],
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const submitMatch = async () => {
    try {
      // Maç oluşturmak için payload oluşturuyoruz
      const matchPayload = {
        Type: matchData.Type,
        Stipulation: matchData.Stipulation,
        IsTitleMatch: matchData.IsTitleMatch,
        MatchOrder: matchData.MatchOrder,
        ShowId: parseInt(showId, 10),
        CoachId: matchData.coach?.Id || null,
        WriterId: matchData.writer?.Id || null,
      };
      console.log("Match Payload:", matchPayload);
  
      // Match oluştur
      const matchResponse = await createMatch(matchPayload);
      const matchId = matchResponse.Id; // Match ID
      console.log("Match created successfully:", matchResponse);
  
      // Participants için payload
      const participantPromises = matchData.participants.map((participant) =>
        createMatchParticipant({
          MatchId: matchId,
          WrestlerId: participant.WrestlerId,
          ParticipantType: "Wrestler",
          IsWinner: participant.IsWinner, // IsWinner bilgisi
        })
      );
  
      console.log("Participant Payloads:", matchData.participants);
  
      // Participants'ı ekle
      await Promise.all(participantPromises);
  
      alert("Match and participants created successfully!");
    } catch (error) {
      console.error("Error creating match or participants:", error);
      alert("Failed to create match or participants.");
    }
  };
  
  

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {step === 1 && (
        <Step1MatchInfo
          matchData={matchData}
          setMatchData={setMatchData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <Step2CoachWriter
          matchData={matchData}
          setMatchData={setMatchData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Step3Wrestlers
          matchData={matchData}
          setMatchData={setMatchData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && (
        <Step4FinalReview
          matchData={matchData}
          setMatchData={setMatchData}
          prevStep={prevStep}
          submitMatch={submitMatch}
        />
      )}
    </div>
  );
};

export default MatchCreatePage;
