/**
 * Formatting and Date calculation utilities for the Life & Growing-Up Idle Simulator
 */

export const BIRTH_TIMESTAMP = new Date('2000-01-01T00:00:00').getTime();
export const MEETING_DAY = 10359; // ~28 years old (Meeting your soulmate)
export const PAUSE_DAY = 11089; // ~30 years old (2 years together milestone)

export function formatNumber(num: number): string {
  if (num === undefined || num === null || isNaN(num)) return '0';
  if (num < 1000) return Math.floor(num).toLocaleString('ru-RU');
  if (num < 10_000) {
    const formatted = (num / 1000).toFixed(2);
    return (formatted.endsWith('.00') ? formatted.slice(0, -3) : formatted) + ' тыс.';
  }
  if (num < 1_000_000) {
    const formatted = (num / 1000).toFixed(1);
    return (formatted.endsWith('.0') ? formatted.slice(0, -2) : formatted) + ' тыс.';
  }
  if (num < 1_000_000_000) return (num / 1_000_000).toFixed(2).replace('.00', '') + ' млн';
  if (num < 1_000_000_000_000) return (num / 1_000_000_000).toFixed(2).replace('.00', '') + ' млрд';
  return (num / 1_000_000_000_000).toFixed(2).replace('.00', '') + ' трлн';
}

export function formatAgeFromDays(days: number): { years: number; months: number; days: number; text: string } {
  const totalDaysFloor = Math.max(0, Math.floor(days));
  const years = Math.floor(totalDaysFloor / 365.25);
  const remainingDaysAfterYears = totalDaysFloor - Math.floor(years * 365.25);
  const months = Math.min(11, Math.floor(remainingDaysAfterYears / 30.4375));
  const d = Math.max(0, Math.floor(remainingDaysAfterYears - months * 30.4375));

  const yText = pluralizeRu(years, ['год', 'года', 'лет']);
  const mText = pluralizeRu(months, ['месяц', 'месяца', 'месяцев']);
  const dText = pluralizeRu(d, ['день', 'дня', 'дней']);

  return {
    years,
    months,
    days: d,
    text: `${years} ${yText}, ${months} ${mText}, ${d} ${dText}`,
  };
}

export function getCalendarDate(days: number): { dateStr: string; isBirthday: boolean; isAnniversary: boolean; month: number; day: number; year: number } {
  const date = new Date(BIRTH_TIMESTAMP + days * 24 * 60 * 60 * 1000);
  const seasonsRu = [
    'Зима', 'Зима', 'Весна', 'Весна', 'Весна', 'Лето',
    'Лето', 'Лето', 'Осень', 'Осень', 'Осень', 'Зима'
  ];
  const day = date.getDate();
  const month = date.getMonth();
  const year = Math.floor(days / 365.25) + 1;
  const season = seasonsRu[month];
  const dateStr = `Год жизни ${year}-й • ${season}`;

  const isBirthday = Math.floor(days) > 0 && Math.floor(days % 365.25) === 0;
  const daysTogether = getDaysTogether(days);
  const isAnniversary = days >= MEETING_DAY && (daysTogether === 0 || daysTogether === 365 || daysTogether === 730);

  return { dateStr, isBirthday, isAnniversary, month, day, year };
}

export function getCalendarDateFromDays(days: number): string {
  return getCalendarDate(days).dateStr;
}

export function getDaysTogether(days: number): number {
  if (days < MEETING_DAY) return 0;
  return Math.floor(days - MEETING_DAY);
}

export function pluralizeRu(n: number, forms: [string, string, string]): string {
  const absN = Math.abs(n) % 100;
  const n1 = absN % 10;
  if (absN > 10 && absN < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}

export function getStageTitle(days: number): { title: string; subtitle: string; era: string; color: string } {
  if (days < 365 * 7) {
    return {
      title: 'Раннее детство и первые открытия',
      subtitle: 'Первые шаги, чтение сказок и познание огромного мира',
      era: 'Детство',
      color: 'from-slate-600 to-slate-800'
    };
  }
  if (days < 365 * 18) {
    return {
      title: 'Школьные годы и увлечения',
      subtitle: 'Школа, верные друзья, хобби, книги и первые мечты',
      era: 'Школьные годы',
      color: 'from-slate-600 to-slate-800'
    };
  }
  if (days < 365 * 23) {
    return {
      title: 'Студенчество & Старт карьеры',
      subtitle: 'Университет, самостоятельность, новые знакомства и первая работа',
      era: 'Студенчество',
      color: 'from-blue-600 to-indigo-800'
    };
  }
  if (days < MEETING_DAY) {
    return {
      title: 'Самореализация & Взрослая жизнь',
      subtitle: 'Карьерный рост, спорт, обустройство жилья и поиск себя',
      era: 'Взрослая жизнь',
      color: 'from-cyan-700 to-blue-900'
    };
  }
  if (days < MEETING_DAY + 100) {
    return {
      title: 'Встреча, изменившая мир ✨',
      subtitle: 'Первые свидания, искры, долгие разговоры и бабочки в животе',
      era: 'Начало отношений',
      color: 'from-pink-500 to-rose-600'
    };
  }
  if (days < MEETING_DAY + 365) {
    return {
      title: 'Первый год любви и романтики ❤️',
      subtitle: 'Уютные киновечера, забота, сюрпризы и первые совместные поездки',
      era: 'Романтика вдвоем',
      color: 'from-rose-500 to-amber-600'
    };
  }
  if (days < PAUSE_DAY) {
    return {
      title: 'Гармония & Путешествия мечты ✈️',
      subtitle: 'Открываем новые страны, копим яркие воспоминания и строим общий дом',
      era: 'Счастливая пара',
      color: 'from-rose-600 to-purple-600'
    };
  }
  return {
    title: 'Расцвет жизни и крепкий союз! 💍',
    subtitle: 'Позади яркий путь взросления, а впереди — бесконечные горизонты счастья!',
    era: 'Полная гармония',
    color: 'from-amber-500 to-rose-600'
  };
}
