// src/pages/Main.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">🎯 AI 연인 선택하기</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
        {/* ➕ 새 캐릭터 추가 카드 */}
        <div
          className="bg-gray-100 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 hover:border-blue-400 hover:bg-gray-50 transition cursor-pointer"
        >
          <Link to="/create" className="flex flex-col items-center">
            <div className="text-5xl mb-4">➕</div>
            <div className="text-xl font-bold text-gray-700">새 캐릭터 추가하기</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
