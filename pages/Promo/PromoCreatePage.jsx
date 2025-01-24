import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // useParams import edildi
import Step1PromoInfo from '../../components/Promo/Step1PromoInfo';
import Step2AssignParticipants from '../../components/Promo/Step2AssignParticipants';
import Step3FinalReview from '../../components/Promo/Step3FinalReview';
import { createPromo } from '../../services/Promo/PromoService'; // Promo servisini ekle
import { createPromoAssignment } from '../../services/PromoAssignment/PromoAssignmentService'; // PromoAssignment servisini ekle

const PromoCreatePage = () => {
  const { id: showId } = useParams(); // useParams ile showId alınır
  const [step, setStep] = useState(1);
  const [promoData, setPromoData] = useState({
    Type: '',
    OrderInShow: '',
    wrestlerIds: [],
    writerId: null,
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const submitPromo = async () => {
    try {
      // 1. Promo POST isteği
      const promoPayload = {
        Type: promoData.Type,
        OrderInShow: promoData.OrderInShow,
        ShowId: parseInt(showId, 10) // Burada showId artık undefined olmayacak
      };

      const promoResponse = await createPromo(promoPayload);
      const promoId = promoResponse.Id; // Oluşturulan Promo'nun ID'si
      console.log('Promo created:', promoResponse);

      // 2. PromoAssignments POST istekleri
      const assignmentPromises = promoData.wrestlerIds.map((wrestlerId) =>
        createPromoAssignment({
          PromoId: promoId,
          WrestlerId: wrestlerId,
          WriterId: promoData.writerId, // Tek bir WriterId gönderiliyor
        })
      );

      // Tüm PromoAssignments'ları POST et
      await Promise.all(assignmentPromises);
      alert('Promo and participants assigned successfully!');
    } catch (error) {
      console.error('Error creating promo or assignments:', error);
      alert('Failed to create promo or assign participants.');
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {step === 1 && (
        <Step1PromoInfo
          promoData={promoData}
          setPromoData={setPromoData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <Step2AssignParticipants
          promoData={promoData}
          setPromoData={setPromoData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Step3FinalReview
          promoData={promoData}
          setPromoData={setPromoData}
          prevStep={prevStep}
          submitPromo={submitPromo}
        />
      )}
    </div>
  );
};

export default PromoCreatePage;
