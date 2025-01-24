import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Step1EditPromoDetails from "../../components/Promo/Step1EditPromoDetails";
import Step2EditAssignments from "../../components/Promo/Step2EditAssignments";
import Step3EditFinalReview from "../../components/Promo/Step3EditFinalReview";
import { getPromoById, updatePromo } from "../../services/Promo/PromoService";
import {
  getPromoAssignmentsByPromoId,
  createPromoAssignment,
  deletePromoAssignment,
} from "../../services/PromoAssignment/PromoAssignmentService";

const PromoEditPage = () => {
  const { id: promoId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [promoData, setPromoData] = useState({
    Type: "",
    OrderInShow: "",
    PromoRating: "",
    wrestlerIds: [],
    writerId: null,
  });

  const [originalPromoData, setOriginalPromoData] = useState(null);

  useEffect(() => {
    const fetchPromoDetails = async () => {
      try {
        const promo = await getPromoById(promoId);
        const assignments = await getPromoAssignmentsByPromoId(promoId);

        setPromoData({
          Type: promo.Type,
          OrderInShow: promo.OrderInShow,
          PromoRating: promo.PromoRating,
          wrestlerIds: assignments.map((a) => a.WrestlerId),
          writerId: assignments[0]?.WriterId || null,
        });

        setOriginalPromoData({
          Type: promo.Type,
          OrderInShow: promo.OrderInShow,
          PromoRating: promo.PromoRating,
          wrestlerIds: assignments.map((a) => a.WrestlerId),
          writerId: assignments[0]?.WriterId || null,
          ShowId: promo.ShowId,
        });
      } catch (error) {
        console.error("Failed to fetch promo details:", error);
        alert("Failed to load promo details.");
      }
    };

    fetchPromoDetails();
  }, [promoId]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const submitPromo = async () => {
    try {
      // Promo güncellemesi
      const promoPayload = {
        Type: promoData.Type,
        OrderInShow: promoData.OrderInShow,
        PromoRating: promoData.PromoRating,
      };
      console.log("Updating promo with payload:", promoPayload);
      await updatePromo(promoId, promoPayload);
  
      // Eski Assignment'ları sil
      const originalAssignments = await getPromoAssignmentsByPromoId(promoId);
      if (originalAssignments && originalAssignments.length > 0) {
        const deletePromises = originalAssignments.map((assignment) =>
          deletePromoAssignment(assignment.Id)
        );
        await Promise.all(deletePromises);
      }
  
      // Yeni Assignment'ları oluştur
      const createPromises = promoData.wrestlerIds.map((wrestlerId) =>
        createPromoAssignment({
          PromoId: promoId,
          WrestlerId: wrestlerId,
          WriterId: promoData.writerId,
        })
      );
      await Promise.all(createPromises);
  
      alert("Promo updated successfully!");
      // Show detay sayfasına yönlendirme (showId kullanılarak)
      console.log("Navigating to show:", originalPromoData.ShowId);
      navigate(`/show/${originalPromoData.ShowId}`);
    } catch (error) {
      console.error("Error updating promo:", error);
      alert("Failed to update promo.");
    }
  };
  
  

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {step === 1 && (
        <Step1EditPromoDetails
          promoData={promoData}
          setPromoData={setPromoData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <Step2EditAssignments
          promoData={promoData}
          setPromoData={setPromoData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Step3EditFinalReview
          promoData={promoData}
          originalPromoData={originalPromoData}
          prevStep={prevStep}
          submitPromo={submitPromo}
        />
      )}
    </div>
  );
};

export default PromoEditPage;
