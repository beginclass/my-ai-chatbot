// src/pages/CreateCharacter.jsx
import React, { useState, useEffect } from "react";
import { collection, addDoc, getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 
import app from "../api/firebase";
import { seedDefaults } from "../utils/seedDefaults"; // ✅ 초기 기본 이미지 등록 파일

export default function CreateCharacter() {
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [profileImages, setProfileImages] = useState([]);
  const [cardImages, setCardImages] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const db = getFirestore(app);
  const navigate = useNavigate();

  // ✅ 최초 화면 조회 시 기본 이미지 등록
  useEffect(() => {
    seedDefaults();
    const fetchImages = async () => {
      const profileDoc = await getDoc(doc(db, "defaults", "profileImages"));
      const cardDoc = await getDoc(doc(db, "defaults", "cardImages"));
      if (profileDoc.exists()) setProfileImages(profileDoc.data().images || []);
      if (cardDoc.exists()) setCardImages(cardDoc.data().images || []);
    };
    fetchImages();
  }, []);

  const handleProfileSelect = (characterName) => {
    const profile = profileImages.find((img) => img.name === characterName);
    const card = cardImages.find((img) => img.name === characterName);
    setSelectedProfile(profile?.url || "");
    setSelectedCard(card?.url || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "characters"), {
      name,
      description: intro, 
      image: selectedCard,
      profile: selectedProfile,
    });
    alert("캐릭터 등록 완료!");
    navigate("/"); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력하세요 (예: 수아, 하준)"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        required
      />
      <input 
        value={intro} 
        onChange={(e) => setIntro(e.target.value)} 
        placeholder="한줄 소개 (예: 상큼발랄 대학생)" 
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition" 
        required 
      />
      <div>
          <h2 className="text-lg font-semibold mb-2">프로필 이미지 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {profileImages.map((img) => (
              <img
                key={img.name}
                src={img.url}
                alt={img.name}
                className={`cursor-pointer rounded-lg border-2 w-full h-32 object-cover transition ${selectedProfile === img.url ? "border-blue-500" : "border-transparent"}`}
                onClick={() => handleProfileSelect(img.name)}
              />
            ))}
          </div>
        </div>
      <button 
        type="submit" 
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
      >
        캐릭터 등록하기
      </button>
    </form>
  );
}
