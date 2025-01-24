import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Step1EditMatchInfo from '../../components/Match/Step1EditMatchInfo';
import Step2EditCoachWriter from '../../components/Match/Step2EditCoachWriter';
import Step3EditParticipants from '../../components/Match/Step3EditParticipants';
import Step4EditFinalReview from '../../components/Match/Step4EditFinalReview';
import { getMatchById,updateMatch } from '../../services/Match/matchService';
import { getCoachById } from '../../services/Coach/coachService';
import { getWriterById } from '../../services/Writer/writerService';
import { getMatchParticipants,deleteMatchParticipant,createMatchParticipant } from '../../services/MatchParticipant/matchParticipantService';
import { getWrestlerById } from '../../services/Wrestler/wrestlerService';

const MatchEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [matchData, setMatchData] = useState({
    Type: '',
    Stipulation: '',
    IsTitleMatch: false,
    MatchOrder: '',
    MatchRating: 0, // Başlangıç değeri
    CoachId: null,
    WriterId: null,
    coach: null,
    writer: null,
    participants: [], // Mevcut participant bilgileri
  });
  
  const [originalMatchData, setOriginalMatchData] = useState(null); // Eski değerler
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        setLoading(true);

        // Match detaylarını al
        const match = await getMatchById(id);

        // Coach bilgilerini getir
        const coachDetails = match.CoachId ? await getCoachById(match.CoachId) : null;

        // Writer bilgilerini getir
        const writerDetails = match.WriterId ? await getWriterById(match.WriterId) : null;

        // Participant bilgilerini al
        const participantsData = await getMatchParticipants(match.Id);

        // Wrestler detaylarını al
        const participantsWithDetails = await Promise.all(
          participantsData.map(async (participant) => {
            const wrestlerDetails = await getWrestlerById(participant.WrestlerId);
            return { ...participant, wrestlerDetails };
          })
        );

        const matchWithDetails = {
            ...match,
            MatchRating: match.MatchRating || 0, // Gelen rating değeri yoksa 0 olarak ayarla
            coach: coachDetails,
            writer: writerDetails,
            participants: participantsWithDetails,
          };
          setOriginalMatchData(matchWithDetails);
          setMatchData(matchWithDetails);
      } catch (err) {
        console.error('Failed to fetch match data:', err);
        setError('Failed to load match data.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [id]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const submitMatch = async () => {
    try {
      // 1. Maç detaylarını güncelle
      const matchUpdateData = {
        Type: matchData.Type,
        Stipulation: matchData.Stipulation,
        IsTitleMatch: matchData.IsTitleMatch,
        MatchOrder: matchData.MatchOrder,
        MatchRating: matchData.MatchRating, // MatchRating'i gönderiyoruz
        CoachId: matchData.CoachId,
        WriterId: matchData.WriterId,
      };
  
      console.log('Updating match with data:', matchUpdateData);
  
      await updateMatch(matchData.Id, matchUpdateData);
  
      // 2. Eski katılımcıları sil
      const originalParticipantIds = originalMatchData.participants.map((p) => p.Id);
      console.log('Deleting participants:', originalParticipantIds);
  
      await Promise.all(
        originalParticipantIds.map((participantId) =>
          deleteMatchParticipant(participantId).catch((error) => {
            console.error(`Failed to delete participant ${participantId}:`, error);
            throw error;
          })
        )
      );
  
      // 3. Yeni katılımcıları ekle
      const newParticipantsData = matchData.participants.map((participant) => ({
        WrestlerId: participant.WrestlerId,
        IsWinner: participant.IsWinner,
        MatchId: matchData.Id,
        ParticipantType: 'Wrestler',
      }));
  
      console.log('Adding new participants:', newParticipantsData);
  
      await Promise.all(
        newParticipantsData.map((participant) =>
          createMatchParticipant(participant).catch((error) => {
            console.error('Failed to add participant:', error);
            throw error;
          })
        )
      );
  
      // Başarı mesajı ve yönlendirme
      alert('Match updated successfully!');
      navigate(`/show/${matchData.ShowId}`);
    } catch (err) {
      console.error('Error updating match:', err);
      alert(`Failed to update match: ${err.message}`);
    }
  };
  
  

  if (loading) return <p>Loading match data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  console.log("edit page original match data",originalMatchData);
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {step === 1 && (
        <Step1EditMatchInfo
          matchData={matchData}
          setMatchData={setMatchData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <Step2EditCoachWriter
          matchData={matchData}
          setMatchData={setMatchData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Step3EditParticipants
          matchData={matchData}
          setMatchData={setMatchData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && originalMatchData && (
        <Step4EditFinalReview
          matchData={matchData}
          originalMatchData={originalMatchData} // Eski verileri ilet
          prevStep={prevStep}
          submitMatch={submitMatch}
        />
      )}
    </div>
  );
};

export default MatchEditPage;
