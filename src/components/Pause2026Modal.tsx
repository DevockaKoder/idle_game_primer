import React from 'react';
import { GameState } from '../types';
import { formatAgeFromDays, getDaysTogether } from '../utils/formatters';
import { Award, Play, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { coupleAvatar } from '../assets/avatars';

interface Pause2026ModalProps {
  isOpen: boolean;
  gameState: GameState;
  onContinueEndless: () => void;
  onViewAlbum: () => void;
}

export const Pause2026Modal: React.FC<Pause2026ModalProps> = ({
  isOpen,
  gameState,
  onContinueEndless,
  onViewAlbum,
}) => {
  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D48166', '#7B96AC', '#E6AF2E', '#4A6B82'],
    });
  };

  const daysTogether = getDaysTogether(gameState.totalDays);
  const age = formatAgeFromDays(gameState.totalDays);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="w-full max-w-2xl bg-white border-2 border-[#D48166] rounded-3xl p-6 sm:p-8 shadow-2xl relative text-[#3D3D3D] my-8"
      >
        {/* Jubilee Ornament & Couple Portrait */}
        <div className="text-center mb-4 flex flex-col items-center">
          <div className="relative mb-3">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border-3 border-[#D48166] p-1 shadow-lg overflow-hidden bg-white">
              <img
                src={coupleAvatar}
                alt="Пара"
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white border border-[#E5E1D8] shadow-md w-8 h-8 rounded-full flex items-center justify-center text-base">
              💍
            </div>
          </div>
          <div className="text-xs uppercase font-extrabold text-[#D48166] tracking-widest">
            Финал Сюжетной Главы • Расцвет Жизни
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#4A6B82] mt-1">
            Путь взросления пройден! ❤️
          </h2>
          <div className="text-sm font-semibold text-[#D48166]">
            Возраст {age.years} лет • Крепкая карьера, уютный дом и настоящая любовь!
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="p-4 rounded-2xl bg-[#D48166]/10 border-2 border-[#D48166]/40 text-center shadow-xs my-4">
          <div className="flex items-center justify-center gap-2 text-[#D48166] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-[#D48166]" />
            <span>Важная веха достигнута</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#3D3D3D] text-balance">
            «Все главные этапы становления открыты! ❤️»
          </h3>
          <p className="text-xs text-[#7A756B] mt-1">
            От первых шагов и учебы до мастерства в профессии и счастливой жизни вдвоем!
          </p>
        </div>

        {/* Milestone Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4">
          <div className="p-3 rounded-2xl bg-[#FDFBF7] border border-[#E5E1D8] text-center">
            <div className="text-[11px] text-[#7A756B]">Прожито дней</div>
            <div className="text-base sm:text-lg font-mono font-bold text-[#4A6B82]">
              {Math.floor(gameState.totalDays).toLocaleString('ru-RU')} дн.
            </div>
            <div className="text-[10px] text-[#7A756B]">{age.text}</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#D48166]/10 border border-[#D48166]/30 text-center">
            <div className="text-[11px] text-[#D48166] font-semibold">Дней вместе</div>
            <div className="text-base sm:text-lg font-mono font-bold text-[#D48166]">
              {daysTogether} дн. ❤️
            </div>
            <div className="text-[10px] text-[#D48166]">2 года гармонии</div>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-[#FDFBF7] border border-[#E5E1D8] text-center">
            <div className="text-[11px] text-[#7A756B]">Посещено городов</div>
            <div className="text-sm font-bold text-[#4A6B82]">{gameState.unlockedCities.length}</div>
            <div className="text-[10px] text-[#7A756B]">Яркие путешествия</div>
          </div>
        </div>

        {/* Summary Note */}
        <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#D48166]/30 text-xs sm:text-sm text-[#3D3D3D] leading-relaxed space-y-3 font-serif shadow-inner max-h-60 overflow-y-auto">
          <p className="font-bold text-[#D48166] text-sm sm:text-base font-sans">
            Поздравляем с прохождением основной истории взросления!
          </p>
          <p>
            За плечами <strong>{age.years} лет</strong> увлекательного пути: первые прочитанные книги, школьные годы, университет, профессиональное становление, ремонт собственной квартиры и судьбоносная встреча с любимым человеком.
          </p>
          <p>
            Совместные вечера, поддержка, подарки и путешествия по самым красивым уголкам мира сделали эту историю по-настоящему теплой и незабываемой.
          </p>
          <p className="text-[#4A6B82] font-semibold">
            Вы можете продолжить игру в свободном бесконечном режиме, чтобы открыть все города, пройти все уровни ремонта и собрать полную коллекцию наград!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              triggerConfetti();
              onViewAlbum();
            }}
            className="flex-1 py-3 px-4 rounded-2xl bg-[#F0EDE6] hover:bg-[#E5E1D8] border border-[#E5E1D8] text-[#4A6B82] font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Award className="w-4 h-4 text-[#E6AF2E]" />
            <span>Открыть Альбом Вех</span>
          </button>

          <button
            onClick={() => {
              triggerConfetti();
              onContinueEndless();
            }}
            className="flex-1 py-3 px-4 rounded-2xl bg-[#D48166] hover:bg-[#c27258] text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Продолжить в бесконечном режиме ❤️</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
