
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { 
  CheckCircle, 
  Menu, 
  X, 
  Play, 
  Users, 
  MessageCircle, 
  Clock, 
  Globe, 
  Lock, 
  Briefcase, 
  HelpCircle, 
  Phone,
  Download,
  ShieldCheck,
  Bot,
  Send,
  Loader2,
  Minimize2,
  Instagram,
  Mic,
  Volume2,
  StopCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Layers,
  FileText,
  Star,
  Crown,
  Zap,
  Sparkles,
  ArrowUp,
  User,
  Smartphone
} from 'lucide-react';

// --- Telegram Config ---
const TELEGRAM_BOT_TOKEN = '8552497399:AAFI4rGIb2TXg4BKA-dQ9kpr9r1uE8Rou0Q'; 
const TELEGRAM_CHAT_ID = '1743789419'; 

// --- CountUp Component ---
const CountUp = ({ end, duration = 2000, suffix = "", prefix = "" }: { end: number, duration?: number, suffix?: string, prefix?: string }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [end, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}{count}{suffix}
    </span>
  );
};

// --- Translations ---
type Language = 'uz' | 'en' | 'ru';

const translations = {
  uz: {
    nav: {
      about: "Loyiha haqida",
      problems: "Muammolar",
      program: "Dastur",
      team: "Jamoa",
      pricing: "Narxlar",
      contact: "Bog'lanish"
    },
    hero: {
      formatLabel: "Formati:",
      formatValue: "Gibrid onlayn",
      durationLabel: "Davomiyligi:",
      durationValue: "1 oy",
      titlePrefix: "Sun'iy intellekt dasturlarini",
      titleHighlight: "professional",
      titleSuffix: "darajada o'rganing",
      subtitle: "10+ zamonaviy AI platformalarini o‘rganish, 100+ tayyor PDF promptlar va 24/7 ishlaydigan maxsus AI yordamchi.",
      ctaPrimary: "Dasturga yozilish",
      ctaSecondary: "Batafsil tanishish",
      stats: {
        platforms: "AI Platformalar",
        prompts: "Tayyor promptlar",
        assistant: "AI Yordamchi",
        guarantee: "Pul qaytarish kafolati",
        guaranteeValue: "3 kun"
      }
    },
    about: {
      brand: "Hamroh AI",
      title: "Qanday loyiha?",
      description: "\"HamrohAI\" insonlar uchun maxsus yaratilgan sun'iy intellektni o‘rgatuvchi platforma. Biz odamlarni AI bilan ishlashni 0 dan, juda sodda tilda o‘rgatamiz va o‘rganganini kundalik hayotda va ish jarayonida darhol qo‘llashga yordam beramiz.",
      missionTitle: "Bizning missiyamiz",
      missionText1: "Insonlarga sun’iy intellektni qo‘rqmasdan, oson va ishonch bilan o‘rganish imkoniyatini berishdir.",
      missionText2: "O‘rganish uchun kech emas, texnik bo‘lish ham shart emas — to‘g‘ri yo‘l ko‘rsatadigan, sizni qadamingizdan tushunadigan ustoz bo‘lsa bas."
    },
    problems: {
      title: "Nimaga sun'iy intellektni ishlatishni o'rganmaysiz?",
      subtitle: "HamrohAI jamoasi 40 dan ortiq katta yoshdagilar o'rtasida so'rovnoma o'tkazdi va 4 ta asosiy muammoni aniqladi.",
      items: [
        { id: "01", title: "Amaliyotga qo'llashni bilmayman" },
        { id: "02", title: "Ishlatish uchun ingliz tili kerak bo'ladi" },
        { id: "03", title: "Texnik bilmim yo'q" },
        { id: "04", title: "O'rganishga vaqt bo'lmaydi" }
      ]
    },
    curriculum: {
      title: "Dastur Strukturasi",
      subtitle: "7 ta modul, 0 dan professional darajagacha",
      modules: [
        {
          title: "MODUL 1. AI BILAN 0-KUNDAN NATIJA (WOW EFFECT)",
          lessons: [
            "1-dars: AI sizga hozir nima qilib bera oladi?",
            "2-dars: ChatGPT bilan real ish bajarish",
            "3-dars: To‘g‘ri prompt yozish",
            "4-dars: Eng ko‘p uchraydigan xatolar"
          ]
        },
        {
          title: "MODUL 2. AI ASOSLARI",
          lessons: [
            "1-dars: AI nima va qanday ishlaydi?",
            "2-dars: AI qayerda qo‘llaniladi?",
            "3-dars: AI platformalar",
            "4-dars: AI etikasi"
          ]
        },
        {
          title: "MODUL 3. CHATGPT 0 DAN PROGACHA",
          lessons: [
            "1-dars: Ro‘yxatdan o‘tish",
            "2-dars: Prompt texnikalari",
            "3-dars: Matn ishlash",
            "4-dars: Fayllar bilan ishlash",
            "5-dars: Amaliy topshiriqlar"
          ]
        },
        {
          title: "MODUL 4. GOOGLE AI STUDIO + GEMINI",
          lessons: [
            "1-dars: Google AI Studio",
            "2-dars: Gemini matn",
            "3-dars: Vision",
            "4-dars: Kompyuter muammolarini hal qilish"
          ]
        },
        {
          title: "MODUL 5. NOTION AI",
          lessons: [
            "1-dars: Notion asoslari",
            "2-dars: Database",
            "3-dars: AI bilan matn struktura",
            "4-dars: Avtomatlashtirish"
          ]
        },
        {
          title: "MODUL 6. CANVA AI + GAMMA AI",
          lessons: [
            "1-dars: Canva interfeysi",
            "2-dars: Magic Studio",
            "3-dars: Magic Presentation",
            "4-dars: Video montaj",
            "5-dars: Gamma AI"
          ]
        },
        {
          title: "MODUL 7. AI SUPER TOOLKIT",
          lessons: [
            "1-dars: Perplexity AI",
            "2-dars: Claude AI",
            "3-dars: Copilot",
            "4-dars: Leonardo AI / Pixlr",
            "5-dars: Runway / Veed.io",
            "6-dars: Quadratic AI"
          ]
        }
      ]
    },
    solution: {
      titlePrefix: "Hamroh AI",
      titleSuffix: "bu muammolarni qanday hal qiladi?",
      items: [
        { title: "Bepul sinab ko'rish", desc: "3 kunlik bepul sinab ko'rish. Agar darslar sizga ma'qul kelmasa, pulingizni 100% qaytarib olishingiz mumkin." },
        { title: "30+ ortiq video darslar", desc: "Istalgan vaqtda va joyda o'rganish uchun 0 dan tushuntirilgan 30+ ortiq video-darsliklar." },
        { title: "Siz uchun alohida ustoz", desc: "Siz uchun alohida biriktirilgan yordamchi ustoz sizdagi texnik tomondan tushunmaganlaringizni tushuntirib o'tadi." },
        { title: "Faol hamjamiyat", desc: "40+ a'zodan iborat faol hamjamiyatda fikr almashish imkoniyati." },
        { title: "Maxsus AI yordamchi", desc: "Darsdagi qo'shimcha savollarga HamrohAI telegram bot orqali 24/7 tezda javob olasiz." },
        { title: "100+ tayyor PDF promptlar", desc: "Sun'iy intellektdan foydalanish uchun tayyor PDF promptlar doimiy foydalanish uchun qoladi." }
      ]
    },
    freeLesson: {
      title: "Bepul Video Dars",
      subtitle: "Dasturimizdagi birinchi darsni hoziroq bepul ko'ring va ta'lim sifatiga baho bering."
    },
    team: {
      title: "Bizning Jamoa",
      members: [
        { name: "Atadjanov Jasur", role: "Loyiha asoschisi", desc: "4 yildan ortiq AI marketing va product management sohasida tajriba. DATA o'quv markazi sobiq bosh marketologi. 20+ loyihalar muallifi.", image: "https://ui-avatars.com/api/?name=Atadjanov+Jasur&background=0D9488&color=fff" },
        { name: "Qilichbek Ismoilov", role: "Co-founder", desc: "Savdo va jarayonlarni optimallashtirish bo'yicha 2 yillik tajriba. Engame kompaniyasi Sotuv bo'limi rahbari.", image: "https://ui-avatars.com/api/?name=Qilichbek+Ismoilov&background=0D9488&color=fff" },
        { name: "Sanjarbek Sobirov", role: "Loyiha menejer", desc: "FH Aachen universiteti talabasi. Kuchli analitik yondashuv va strategik qarorlar qabul qilish bo'yicha mutaxassis.", image: "https://ui-avatars.com/api/?name=Sanjarbek+Sobirov&background=0D9488&color=fff" },
        { name: "Sirojbek Baxtiyorov", role: "Loyiha IT-menedjeri", desc: "New Uzbekistan University talabasi. Texnik jarayonlar va platforma infratuzilmasi nazoratchisi.", image: "https://ui-avatars.com/api/?name=Sirojbek+Baxtiyorov&background=0D9488&color=fff" },
        { name: "Sevinch Urazmetova", role: "Loyiha IT dasturchisi", desc: "Yangi O'zbekiston Universiteti talabasi. Backend va Telegram botlar bo'yicha mutaxassis.", image: "https://ui-avatars.com/api/?name=Sevinch+Urazmetova&background=0D9488&color=fff" }
      ]
    },
    pricing: {
      title: "Dastur to'lov tartibi va narxi",
      guarantee: "3 kunlik pulni qaytarish kafolati",
      disclaimer: "Agar dastur sizga yoqmasa 3 kun ichida pulingizni 100% qaytarib olishingiz mumkin",
      plans: [
        {
          name: "Tarif STARTER",
          price: "229 000",
          currency: "SO'M",
          button: "Starter xarid qilish",
          isPopular: false,
          features: [
            { text: "30+ ortiq video darslarga 1 oy vaqt davomida foydalanish", highlight: false },
            { text: "100+ PDF promptlar", highlight: false },
            { text: "24/7 ishlaydigan HamrohAI telegram botdan foydalanish", highlight: false },
            { text: "40+ a'zodan iborat faol hamjamiyat guruhiga a'zo bo'lish", highlight: false },
            { text: "10+ ortiq AI platformalarini o'rganish", highlight: false }
          ]
        },
        {
          name: "Tarif STANDART",
          price: "339 000",
          currency: "SO'M",
          button: "Standart xarid qilish",
          isPopular: false,
          features: [
            { text: "30+ ortiq video darslarga 3 oy vaqt davomida foydalanish", highlight: true },
            { text: "Qo'shimcha video darslar Sun'iy intellekt o'rganish bo'yicha", highlight: true },
            { text: "Sun'iy intellekt bo'yicha yangiliklar ulashib boriladigan yangiliklar kanaliga qo'shilish", highlight: true },
            { text: "100+ PDF promptlar", highlight: false },
            { text: "24/7 ishlaydigan HamrohAI telegram botdan foydalanish", highlight: false },
            { text: "40+ a'zodan iborat faol hamjamiyat guruhiga a'zo bo'lish", highlight: false },
            { text: "10+ ortiq AI platformalarini o'rganish", highlight: false }
          ]
        },
        {
          name: "Tarif PREMIUM",
          price: "529 000",
          currency: "SO'M",
          button: "Premium xarid qilish",
          isPopular: true,
          discountBadge: "Maxsus taklif: -20%",
          features: [
            { text: "Yordamchi ustoz (Alohida siz uchun biriktirilgan)", highlight: true },
            { text: "Partnership modeliga a'zo bo'lish", highlight: true },
            { text: "30+ ortiq video darslarga 12 oy vaqt davomida foydalanish", highlight: true },
            { text: "Qo'shimcha video darslar Sun'iy intellekt o'rganish bo'yicha", highlight: true },
            { text: "Sun'iy intellekt bo'yicha yangiliklar ulashib boriladigan yangiliklar kanaliga qo'shilish", highlight: true },
            { text: "100+ PDF promptlar", highlight: false },
            { text: "24/7 ishlaydigan HamrohAI telegram botdan foydalanish", highlight: false },
            { text: "40+ a'zodan iborat faol hamjamiyat guruhiga a'zo bo'lish", highlight: false }
          ]
        }
      ]
    },
    contact: {
      title: "Sun'iy idrok sizga hamroh",
      subtitle: "Bepul darsga qo'shilish uchun menejer bilan bog'laning",
      role: "HamrohAI Menejer",
      socialTitle: "Bizni ijtimoiy tarmoqlarda kuzating"
    },
    footer: "© 2024 Hamroh AI. Barcha huquqlar himoyalangan.",
    chatbot: {
        online: "Onlayn",
        connecting: "Jonli AI bilan ulanmoqda...",
        listening: "Tinglanmoqda...",
        listeningDesc: "Gapiravering, Hamroh AI sizni tinglamoqda.",
        endSession: "Ovozli rejimni yakunlash",
        thinking: "O'ylanmoqda...",
        inputPlaceholder: "Savolingizni yozing...",
        error: "Kechirasiz, hozir javob bera olmayman.",
        welcome: "Assalomu alaykum! Hamroh AI bo'yicha qanday savolingiz bor?",
        title: "Hamroh AI Yordamchi"
    },
    modal: {
        title: "Ro'yxatdan o'tish",
        subtitle: "Ma'lumotlaringizni qoldiring, biz siz bilan bog'lanamiz.",
        nameLabel: "Ismingiz",
        phoneLabel: "Telefon raqamingiz",
        submit: "Yuborish",
        successTitle: "Muvaffaqiyatli yuborildi!",
        successMsg: "Tez orada menejerlarimiz siz bilan bog'lanishadi.",
        close: "Yopish"
    },
    faq: {
        title: "Ko'p beriladigan savollar",
        items: [
            { q: "Dastur kimlar uchun mo'ljallangan?", a: "Dasturimiz sun'iy intellektni 0 dan o'rganmoqchi bo'lgan barcha uchun mos keladi. Texnik bilim yoki dasturlash ko'nikmalari talab qilinmaydi." },
            { q: "Darslar qanday formatda o'tiladi?", a: "Darslar maxsus platformada video formatda joylashtirilgan. Siz o'zingizga qulay vaqtda ko'rib, topshiriqlarni bajarishingiz mumkin." },
            { q: "Ingliz tilini bilish shartmi?", a: "Yo'q, ingliz tilini bilish shart emas. Biz barcha vositalarni o'zbek tilida qanday ishlatishni va tarjimonlardan foydalanishni o'rgatamiz." },
            { q: "Pulni qaytarib olish kafolati qanday ishlaydi?", a: "Agar dastur sizga ma'qul kelmasa, xarid qilganingizdan so'ng 3 kun ichida murojaat qilsangiz, pulingizni 100% qaytarib beramiz." },
            { q: "Premium tarifidagi 'Partnership modeli' nima?", a: "Bu eng faol o'quvchilarimiz uchun imkoniyat bo'lib, dasturni bitirgach Hamroh AI jamoasi bilan birga ishlash yoki loyihalarda qatnashish imkonini beradi." }
        ]
    }
  },
  ru: {
    nav: {
      about: "О проекте",
      problems: "Проблемы",
      program: "Программа",
      team: "Команда",
      pricing: "Цены",
      contact: "Контакты"
    },
    hero: {
      formatLabel: "Формат:",
      formatValue: "Гибрид онлайн",
      durationLabel: "Длительность:",
      durationValue: "1 месяц",
      titlePrefix: "Изучите программы ИИ на",
      titleHighlight: "профессиональном",
      titleSuffix: "уровне",
      subtitle: "Изучение 10+ современных платформ ИИ, 100+ готовых PDF промптов и круглосуточный специальный ИИ-ассистент.",
      ctaPrimary: "Записаться на программу",
      ctaSecondary: "Подробнее",
      stats: {
        platforms: "Платформы ИИ",
        prompts: "Готовые промпты",
        assistant: "ИИ Ассистент",
        guarantee: "Гарантия возврата",
        guaranteeValue: "3 дня"
      }
    },
    about: {
      brand: "Hamroh AI",
      title: "Что это за проект?",
      description: "\"HamrohAI\" — это платформа, созданная специально для обучения людей искусственному интеллекту. Мы учим работать с ИИ с нуля простым языком и помогаем сразу применять полученные знания в повседневной жизни и работе.",
      missionTitle: "Наша миссия",
      missionText1: "Дать людям возможность изучать искусственный интеллект без страха, легко и уверенно.",
      missionText2: "Учиться никогда не поздно, и не обязательно быть технарем — главное, чтобы был наставник, который укажет правильный путь и поддержит вас."
    },
    problems: {
      title: "Почему вы не изучаете использование ИИ?",
      subtitle: "Команда HamrohAI провела опрос среди более чем 40 взрослых и выявила 4 основные проблемы.",
      items: [
        { id: "01", title: "Не знаю, как применить на практике" },
        { id: "02", title: "Для использования нужен английский язык" },
        { id: "03", title: "Нет технических знаний" },
        { id: "04", title: "Нет времени на изучение из-за работы" }
      ]
    },
    curriculum: {
      title: "Структура Программы",
      subtitle: "7 модулей, с нуля до профессионального уровня",
      modules: [
        {
          title: "МОДУЛЬ 1. РЕЗУЛЬТАТ С ИИ С ПЕРВОГО ДНЯ (WOW EFFECT)",
          lessons: [
            "Урок 1: Что ИИ может сделать для вас прямо сейчас?",
            "Урок 2: Реальная работа с ChatGPT",
            "Урок 3: Написание правильных промптов",
            "Урок 4: Самые частые ошибки"
          ]
        },
        {
          title: "МОДУЛЬ 2. ОСНОВЫ ИИ",
          lessons: [
            "Урок 1: Что такое ИИ и как он работает?",
            "Урок 2: Где применяется ИИ?",
            "Урок 3: Платформы ИИ",
            "Урок 4: Этика ИИ"
          ]
        },
        {
          title: "МОДУЛЬ 3. CHATGPT ОТ НУЛЯ ДО ПРОФИ",
          lessons: [
            "Урок 1: Регистрация",
            "Урок 2: Техники промптинга",
            "Урок 3: Работа с текстом",
            "Урок 4: Работа с файлами",
            "Урок 5: Практические задания"
          ]
        },
        {
          title: "МОДУЛЬ 4. GOOGLE AI STUDIO + GEMINI",
          lessons: [
            "Урок 1: Google AI Studio",
            "Урок 2: Gemini текст",
            "Урок 3: Vision (зрение)",
            "Урок 4: Решение компьютерных проблем"
          ]
        },
        {
          title: "МОДУЛЬ 5. NOTION AI",
          lessons: [
            "Урок 1: Основы Notion",
            "Урок 2: Базы данных",
            "Урок 3: Структура текста с ИИ",
            "Урок 4: Автоматизация"
          ]
        },
        {
          title: "МОДУЛЬ 6. CANVA AI + GAMMA AI",
          lessons: [
            "Урок 1: Интерфейс Canva",
            "Урок 2: Magic Studio",
            "Урок 3: Magic Presentation",
            "Урок 4: Видеомонтаж",
            "Урок 5: Gamma AI"
          ]
        },
        {
          title: "МОДУЛЬ 7. AI SUPER TOOLKIT",
          lessons: [
            "Урок 1: Perplexity AI",
            "Урок 2: Claude AI",
            "Урок 3: Copilot",
            "Урок 4: Leonardo AI / Pixlr",
            "Урок 5: Runway / Veed.io",
            "Урок 6: Quadratic AI"
          ]
        }
      ]
    },
    solution: {
      titlePrefix: "Как",
      titleSuffix: "решает эти проблемы?",
      items: [
        { title: "Бесплатная пробная версия", desc: "3 дня бесплатного пробного периода. Если уроки вам не понравятся, вы можете вернуть 100% своих денег." },
        { title: "30+ видеоуроков", desc: "Более 30 видеоуроков с объяснениями с нуля для обучения в любое время и в любом месте." },
        { title: "Ваш личный наставник", desc: "Прикрепленный к вам помощник-наставник объяснит все технические моменты, которые вы не поняли." },
        { title: "Активное сообщество", desc: "Возможность обмениваться мнениями в активном сообществе из более чем 40 участников." },
        { title: "Специальный ИИ-помощник", desc: "Получайте быстрые ответы на дополнительные вопросы по урокам через Telegram-бот HamrohAI 24/7." },
        { title: "100+ готовых PDF промптов", desc: "Готовые PDF промпты для использования искусственного интеллекта останутся у вас навсегда." }
      ]
    },
    freeLesson: {
      title: "Бесплатный Видеоурок",
      subtitle: "Посмотрите первый урок программы бесплатно прямо сейчас и оцените качество обучения."
    },
    team: {
      title: "Наша команда",
      members: [
        { name: "Атаджанов Жасур", role: "Основатель проекта", desc: "Более 4 лет опыта в AI маркетинге и управлении продуктами. Бывший главный маркетолог учебного центра DATA.", image: "https://ui-avatars.com/api/?name=Atadjanov+Jasur&background=0D9488&color=fff" },
        { name: "Киличбек Исмоилов", role: "Соучредитель", desc: "2 года опыта в продажах и оптимизации процессов. Руководитель отдела продаж компании Engame.", image: "https://ui-avatars.com/api/?name=Qilichbek+Ismoilov&background=0D9488&color=fff" },
        { name: "Санжарбек Собиров", role: "Менеджер проекта", desc: "Студент университета FH Aachen. Эксперт по аналитическому подходу и принятию стратегических решений.", image: "https://ui-avatars.com/api/?name=Sanjarbek+Sobirov&background=0D9488&color=fff" },
        { name: "Сирожбек Бахтиёров", role: "IT-менеджер проекта", desc: "Студент университета New Uzbekistan. Контролер технических процессов и инфраструктуры платформы.", image: "https://ui-avatars.com/api/?name=Sirojbek+Baxtiyorov&background=0D9488&color=fff" },
        { name: "Севинч Уразметова", role: "IT-разработчик проекта", desc: "Студентка университета Yangi O'zbekiston. Специалист по Backend и Telegram-ботам.", image: "https://ui-avatars.com/api/?name=Sevinch+Urazmetova&background=0D9488&color=fff" }
      ]
    },
    pricing: {
      title: "Порядок оплаты и цена программы",
      guarantee: "Гарантия возврата денег 3 дня",
      disclaimer: "Если программа вам не понравится, вы можете вернуть 100% денег в течение 3 дней",
      plans: [
        {
          name: "Тариф STARTER",
          price: "229 000",
          currency: "СУМ",
          button: "Купить Starter",
          isPopular: false,
          features: [
            { text: "Доступ к 30+ видеоурокам в течение 1 месяца", highlight: false },
            { text: "100+ PDF промптов", highlight: false },
            { text: "Круглосуточный Telegram-бот HamrohAI", highlight: false },
            { text: "Доступ к сообществу из 40+ участников", highlight: false },
            { text: "Изучение 10+ платформ ИИ", highlight: false }
          ]
        },
        {
          name: "Тариф СТАНДАРТ",
          price: "339 000",
          currency: "СУМ",
          button: "Купить Стандарт",
          isPopular: false,
          features: [
            { text: "Доступ к 30+ видеоурокам в течение 3 месяцев", highlight: true },
            { text: "Дополнительные видеоуроки по ИИ", highlight: true },
            { text: "Доступ к новостному каналу об ИИ", highlight: true },
            { text: "100+ PDF промптов", highlight: false },
            { text: "Круглосуточный Telegram-бот HamrohAI", highlight: false },
            { text: "Доступ к сообществу из 40+ участников", highlight: false },
            { text: "Изучение 10+ платформ ИИ", highlight: false }
          ]
        },
        {
          name: "Тариф ПРЕМИУМ",
          price: "529 000",
          currency: "СУМ",
          button: "Купить Премиум",
          isPopular: true,
          discountBadge: "Спецпредложение: -20%",
          features: [
            { text: "ЛИЧНЫЙ НАСТАВНИК (Индивидуально для вас)", highlight: true },
            { text: "Членство в партнерской модели", highlight: true },
            { text: "Доступ к 30+ видеоурокам в течение 12 месяцев", highlight: true },
            { text: "Дополнительные видеоуроки по ИИ", highlight: true },
            { text: "Доступ к новостному каналу об ИИ", highlight: true },
            { text: "100+ PDF промптов", highlight: false },
            { text: "Круглосуточный Telegram-бот HamrohAI", highlight: false },
            { text: "Доступ к сообществу из 40+ участников", highlight: false }
          ]
        }
      ]
    },
    contact: {
      title: "Искусственный интеллект — ваш спутник",
      subtitle: "Свяжитесь с менеджером, чтобы присоединиться к бесплатному уроку",
      role: "Менеджер HamrohAI",
      socialTitle: "Следите за нами в социальных сетях"
    },
    footer: "© 2024 Hamroh AI. Все права защищены.",
    chatbot: {
        online: "Онлайн",
        connecting: "Подключение к Live AI...",
        listening: "Слушаю...",
        listeningDesc: "Говорите, Hamroh AI слушает вас.",
        endSession: "Завершить голосовой режим",
        thinking: "Думаю...",
        inputPlaceholder: "Напишите ваш вопрос...",
        error: "Извините, я не могу ответить прямо сейчас.",
        welcome: "Здравствуйте! У вас есть вопросы по Hamroh AI?",
        title: "Hamroh AI Помощник"
    },
    modal: {
        title: "Регистрация",
        subtitle: "Оставьте свои данные, и мы свяжемся с вами.",
        nameLabel: "Ваше имя",
        phoneLabel: "Ваш телефон",
        submit: "Отправить",
        successTitle: "Успешно отправлено!",
        successMsg: "Наши менеджеры свяжутся с вами в ближайшее время.",
        close: "Закрыть"
    },
    faq: {
        title: "Часто задаваемые вопросы",
        items: [
            { q: "Для кого предназначен этот курс?", a: "Наш курс подходит всем, кто хочет изучить искусственный интеллект с нуля. Технические знания или навыки программирования не требуются." },
            { q: "В каком формате проходят уроки?", a: "Уроки размещены на специальной платформе в видеоформате. Вы можете смотреть их в удобное время и выполнять задания." },
            { q: "Обязательно ли знать английский язык?", a: "Нет, знание английского не обязательно. Мы учим, как использовать все инструменты на вашем языке и пользоваться переводчиками." },
            { q: "Как работает гарантия возврата денег?", a: "Если курс вам не понравится, вы можете обратиться к нам в течение 3 дней после покупки, и мы вернем вам 100% денег." },
            { q: "Что такое 'Партнерская модель' в тарифе Премиум?", a: "Это возможность для наших самых активных студентов работать вместе с командой Hamroh AI или участвовать в проектах после окончания курса." }
        ]
    }
  },
  en: {
    nav: {
      about: "About",
      problems: "Problems",
      program: "Program",
      team: "Team",
      pricing: "Pricing",
      contact: "Contact"
    },
    hero: {
      formatLabel: "Format:",
      formatValue: "Hybrid Online",
      durationLabel: "Duration:",
      durationValue: "1 Month",
      titlePrefix: "Learn AI Tools at a",
      titleHighlight: "Professional",
      titleSuffix: "Level",
      subtitle: "Learn 10+ modern AI platforms, 100+ ready-made PDF prompts, and a 24/7 dedicated AI assistant.",
      ctaPrimary: "Enroll in Program",
      ctaSecondary: "Learn More",
      stats: {
        platforms: "AI Platforms",
        prompts: "Ready Prompts",
        assistant: "AI Assistant",
        guarantee: "Money Back Guarantee",
        guaranteeValue: "3 Days"
      }
    },
    about: {
      brand: "Hamroh AI",
      title: "What is this project?",
      description: "\"HamrohAI\" is a platform specifically designed to teach people artificial intelligence. We teach how to work with AI from scratch in very simple language and help apply what is learned immediately in daily life and work.",
      missionTitle: "Our Mission",
      missionText1: "To give people the opportunity to learn artificial intelligence without fear, easily and confidently.",
      missionText2: "It's never too late to learn, and you don't have to be technical — as long as there is a mentor who shows the right path and understands you."
    },
    problems: {
      title: "Why don't you learn to use AI?",
      subtitle: "The HamrohAI team conducted a survey among more than 40 adults and identified 4 main problems.",
      items: [
        { id: "01", title: "I don't know how to apply it in practice" },
        { id: "02", title: "English is needed to use it" },
        { id: "03", title: "I have no technical knowledge" },
        { id: "04", title: "No time to learn due to work" }
      ]
    },
    curriculum: {
      title: "Program Structure",
      subtitle: "7 modules, from 0 to professional level",
      modules: [
        {
          title: "MODULE 1. RESULTS WITH AI FROM DAY 0 (WOW EFFECT)",
          lessons: [
            "Lesson 1: What can AI do for you right now?",
            "Lesson 2: Real work with ChatGPT",
            "Lesson 3: Writing correct prompts",
            "Lesson 4: Most common mistakes"
          ]
        },
        {
          title: "MODULE 2. AI FUNDAMENTALS",
          lessons: [
            "Lesson 1: What is AI and how does it work?",
            "Lesson 2: Where is AI applied?",
            "Lesson 3: AI Platforms",
            "Lesson 4: AI Ethics"
          ]
        },
        {
          title: "MODULE 3. CHATGPT FROM ZERO TO PRO",
          lessons: [
            "Lesson 1: Registration",
            "Lesson 2: Prompting techniques",
            "Lesson 3: Working with text",
            "Lesson 4: Working with files",
            "Lesson 5: Practical assignments"
          ]
        },
        {
          title: "MODULE 4. GOOGLE AI STUDIO + GEMINI",
          lessons: [
            "Lesson 1: Google AI Studio",
            "Lesson 2: Gemini Text",
            "Lesson 3: Vision",
            "Lesson 4: Solving computer problems"
          ]
        },
        {
          title: "MODULE 5. NOTION AI",
          lessons: [
            "Lesson 1: Notion Basics",
            "Lesson 2: Databases",
            "Lesson 3: Text structure with AI",
            "Lesson 4: Automation"
          ]
        },
        {
          title: "MODULE 6. CANVA AI + GAMMA AI",
          lessons: [
            "Lesson 1: Canva Interface",
            "Lesson 2: Magic Studio",
            "Lesson 3: Magic Presentation",
            "Lesson 4: Video editing",
            "Lesson 5: Gamma AI"
          ]
        },
        {
          title: "MODULE 7. AI SUPER TOOLKIT",
          lessons: [
            "Lesson 1: Perplexity AI",
            "Lesson 2: Claude AI",
            "Lesson 3: Copilot",
            "Lesson 4: Leonardo AI / Pixlr",
            "Lesson 5: Runway / Veed.io",
            "Lesson 6: Quadratic AI"
          ]
        }
      ]
    },
    solution: {
      titlePrefix: "How does",
      titleSuffix: "solve these problems?",
      items: [
        { title: "Free Trial", desc: "3-day free trial. If you don't like the lessons, you can get 100% of your money back." },
        { title: "30+ Video Lessons", desc: "Over 30 video lessons explained from scratch for learning anytime and anywhere." },
        { title: "Your Personal Mentor", desc: "A dedicated assistant mentor will explain any technical points you didn't understand." },
        { title: "Active Community", desc: "Opportunity to exchange ideas in an active community of over 40 members." },
        { title: "Special AI Assistant", desc: "Get quick answers to additional questions about lessons via HamrohAI Telegram bot 24/7." },
        { title: "100+ Ready PDF Prompts", desc: "Ready-made PDF prompts for using artificial intelligence remain yours forever." }
      ]
    },
    freeLesson: {
      title: "Free Video Lesson",
      subtitle: "Watch the first lesson of the program for free right now and evaluate the quality of education."
    },
    team: {
      title: "Our Team",
      members: [
        { name: "Atadjanov Jasur", role: "Project Founder", desc: "Over 4 years of experience in AI marketing and product management. Former Chief Marketer of DATA training center.", image: "https://ui-avatars.com/api/?name=Atadjanov+Jasur&background=0D9488&color=fff" },
        { name: "Qilichbek Ismoilov", role: "Co-founder", desc: "2 years of experience in sales and process optimization. Head of Sales at Engame.", image: "https://ui-avatars.com/api/?name=Qilichbek+Ismoilov&background=0D9488&color=fff" },
        { name: "Sanjarbek Sobirov", role: "Project Manager", desc: "Student at FH Aachen University. Expert in analytical approach and strategic decision making.", image: "https://ui-avatars.com/api/?name=Sanjarbek+Sobirov&background=0D9488&color=fff" },
        { name: "Sirojbek Baxtiyorov", role: "Project IT Manager", desc: "Student at New Uzbekistan University. Controller of technical processes and platform infrastructure.", image: "https://ui-avatars.com/api/?name=Sirojbek+Baxtiyorov&background=0D9488&color=fff" },
        { name: "Sevinch Urazmetova", role: "Project IT Developer", desc: "Student at Yangi O'zbekiston University. Specialist in Backend and Telegram bots.", image: "https://ui-avatars.com/api/?name=Sevinch+Urazmetova&background=0D9488&color=fff" }
      ]
    },
    pricing: {
      title: "Program Pricing and Payment",
      guarantee: "3-Day Money Back Guarantee",
      disclaimer: "If you don't like the program, you can get 100% of your money back within 3 days",
      plans: [
        {
          name: "STARTER Plan",
          price: "229 000",
          currency: "UZS",
          button: "Buy Starter",
          isPopular: false,
          features: [
            { text: "Access to 30+ video lessons for 1 month", highlight: false },
            { text: "100+ PDF Prompts", highlight: false },
            { text: "24/7 HamrohAI Telegram Bot", highlight: false },
            { text: "Access to community of 40+ members", highlight: false },
            { text: "Learn 10+ AI Platforms", highlight: false }
          ]
        },
        {
          name: "STANDARD Plan",
          price: "339 000",
          currency: "UZS",
          button: "Buy Standard",
          isPopular: false,
          features: [
            { text: "Access to 30+ video lessons for 3 months", highlight: true },
            { text: "Additional AI Video Lessons", highlight: true },
            { text: "Access to AI News Channel", highlight: true },
            { text: "100+ PDF Prompts", highlight: false },
            { text: "24/7 HamrohAI Telegram Bot", highlight: false },
            { text: "Access to community of 40+ members", highlight: false },
            { text: "Learn 10+ AI Platforms", highlight: false }
          ]
        },
        {
          name: "PREMIUM Plan",
          price: "529 000",
          currency: "UZS",
          button: "Buy Premium",
          isPopular: true,
          discountBadge: "Limited Offer: -20%",
          features: [
            { text: "PERSONAL MENTOR (Assigned specifically to you)", highlight: true },
            { text: "Partnership Model Membership", highlight: true },
            { text: "Access to 30+ video lessons for 12 months", highlight: true },
            { text: "Additional AI Video Lessons", highlight: true },
            { text: "Access to AI News Channel", highlight: true },
            { text: "100+ PDF Prompts", highlight: false },
            { text: "24/7 HamrohAI Telegram Bot", highlight: false },
            { text: "Access to community of 40+ members", highlight: false }
          ]
        }
      ]
    },
    contact: {
      title: "Artificial Intelligence is Your Companion",
      subtitle: "Contact the manager to join the free lesson",
      role: "HamrohAI Manager",
      socialTitle: "Follow us on social media"
    },
    footer: "© 2024 Hamroh AI. All rights reserved.",
    chatbot: {
        online: "Online",
        connecting: "Connecting to Live AI...",
        listening: "Listening...",
        listeningDesc: "Speak now, Hamroh AI is listening.",
        endSession: "End Voice Session",
        thinking: "Thinking...",
        inputPlaceholder: "Type your question...",
        error: "Sorry, I cannot answer right now.",
        welcome: "Hello! How can I help you with Hamroh AI?",
        title: "Hamroh AI Assistant"
    },
    modal: {
        title: "Registration",
        subtitle: "Leave your details, and we will contact you.",
        nameLabel: "Your Name",
        phoneLabel: "Your Phone",
        submit: "Submit",
        successTitle: "Successfully Sent!",
        successMsg: "Our managers will contact you shortly.",
        close: "Close"
    },
    faq: {
        title: "Frequently Asked Questions",
        items: [
            { q: "Who is this program intended for?", a: "Our program is suitable for everyone who wants to learn artificial intelligence from scratch. No technical knowledge or programming skills are required." },
            { q: "What is the format of the lessons?", a: "Lessons are hosted on a special platform in video format. You can watch them at your convenience and complete assignments." },
            { q: "Is it mandatory to know English?", a: "No, knowing English is not mandatory. We teach how to use all tools in your language and how to use translators." },
            { q: "How does the money-back guarantee work?", a: "If you don't like the program, contact us within 3 days after purchase, and we will refund 100% of your money." },
            { q: "What is the 'Partnership Model' in the Premium plan?", a: "This is an opportunity for our most active students to work together with the Hamroh AI team or participate in projects after finishing the program." }
        ]
    }
  }
};

const App = () => {
  const [language, setLanguage] = useState<Language>('uz');
  const t = translations[language];
  
  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatInstance, setChatInstance] = useState<any>(null);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isVoiceConnecting, setIsVoiceConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Registration Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [modalForm, setModalForm] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Mouse Spotlight Effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Refs
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Modal Functions
  const openRegistration = (planName: string) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
    setIsSuccess(false);
  };

  const closeRegistration = () => {
    setIsModalOpen(false);
    setModalForm({ name: '', phone: '' });
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
        const text = `
<b>Yangi Xarid / Buyurtma!</b>
👤 <b>Ism:</b> ${modalForm.name}
📞 <b>Telefon:</b> ${modalForm.phone}
📋 <b>Tarif:</b> ${selectedPlan}
        `;
        
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(text)}&parse_mode=HTML`;
        
        await fetch(url);
        
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
            closeRegistration();
        }, 2000);
    } catch (error) {
        console.error("Telegram Error:", error);
        setIsSubmitting(false);
        alert("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    }
  };

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isChatLoading]);

  // Initialize Chat
  const initChat = async () => {
    if (!chatInstance && process.env.API_KEY) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const newChat = ai.chats.create({
          model: 'gemini-3-pro-preview',
          config: {
            thinkingConfig: { thinkingBudget: 32768 },
            systemInstruction: `You are the AI assistant for "Hamroh AI", an educational platform teaching Artificial Intelligence to people from scratch. 
            Project details: 
            - Name: Hamroh AI
            - Mission: Teach AI simply to everyone, regardless of technical background.
            - Format: Hybrid online, 1 month duration (Starter), 3 months (Standard), 12 months (Premium).
            - Features: 10+ AI platforms, 100+ PDF prompts, 24/7 AI assistant, Community support.
            - Pricing: Starter (229k UZS), Standard (339k UZS), Premium (529k UZS).
            - Money back guarantee: 3 days.
            - Contact: +998 88 605 44 54 (Qilichbek Ismoilov).
            
            Answer questions based on this info. Be helpful, polite, and use the language the user speaks (Uzbek, Russian, or English).`
          }
        });
        setChatInstance(newChat);
        setChatMessages([{ role: 'model', text: t.chatbot.welcome }]);
      } catch (error) {
        console.error("Chat init error:", error);
      }
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      initChat();
    }
  }, [isChatOpen]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !chatInstance) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await chatInstance.sendMessage({ message: userMsg });
      setChatMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages(prev => [...prev, { role: 'model', text: t.chatbot.error }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Live API Voice Mode
  const startVoiceMode = async () => {
    if (!process.env.API_KEY) return;
    
    setIsVoiceMode(true);
    setIsVoiceConnecting(true);
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        
        const sessionPromise = ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
                },
                systemInstruction: "You are Hamroh AI's voice assistant. Speak briefly and helpfully about the AI course."
            },
            callbacks: {
                onopen: () => {
                    console.log("Live API Connected");
                    setIsVoiceConnecting(false);
                    
                    // Setup Input Stream
                    if (!inputAudioContextRef.current) return;
                    const source = inputAudioContextRef.current.createMediaStreamSource(stream);
                    const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
                    
                    scriptProcessor.onaudioprocess = (e) => {
                        const inputData = e.inputBuffer.getChannelData(0);
                        const l = inputData.length;
                        const int16 = new Int16Array(l);
                        for (let i = 0; i < l; i++) {
                            int16[i] = inputData[i] * 32768;
                        }
                        const base64 = btoa(String.fromCharCode(...new Uint8Array(int16.buffer)));
                        
                        sessionPromise.then(session => {
                            session.sendRealtimeInput({
                                media: {
                                    mimeType: 'audio/pcm;rate=16000',
                                    data: base64
                                }
                            });
                        });
                    };
                    source.connect(scriptProcessor);
                    scriptProcessor.connect(inputAudioContextRef.current.destination);
                },
                onmessage: async (msg: LiveServerMessage) => {
                    const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                    if (audioData && audioContextRef.current) {
                        setIsSpeaking(true);
                        const binaryString = atob(audioData);
                        const len = binaryString.length;
                        const bytes = new Uint8Array(len);
                        for (let i = 0; i < len; i++) {
                            bytes[i] = binaryString.charCodeAt(i);
                        }
                        
                        const int16Array = new Int16Array(bytes.buffer);
                        const float32Array = new Float32Array(int16Array.length);
                         for (let i = 0; i < int16Array.length; i++) {
                            float32Array[i] = int16Array[i] / 32768.0;
                        }
                        
                        const audioBuffer = audioContextRef.current.createBuffer(1, float32Array.length, 24000);
                        audioBuffer.getChannelData(0).set(float32Array);
                        
                        const source = audioContextRef.current.createBufferSource();
                        source.buffer = audioBuffer;
                        source.connect(audioContextRef.current.destination);
                        
                        const currentTime = audioContextRef.current.currentTime;
                        const startTime = Math.max(currentTime, nextStartTimeRef.current);
                        source.start(startTime);
                        nextStartTimeRef.current = startTime + audioBuffer.duration;
                        
                        source.onended = () => {
                            sourcesRef.current.delete(source);
                            if (sourcesRef.current.size === 0) setIsSpeaking(false);
                        };
                        sourcesRef.current.add(source);
                    }
                },
                onclose: () => {
                    console.log("Live API Closed");
                    setIsVoiceMode(false);
                },
                onerror: (err) => {
                    console.error("Live API Error:", err);
                    setIsVoiceMode(false);
                }
            }
        });
        sessionRef.current = sessionPromise;
        
    } catch (error) {
        console.error("Voice Mode Error:", error);
        setIsVoiceMode(false);
        setIsVoiceConnecting(false);
    }
  };

  const stopVoiceMode = async () => {
    if (sessionRef.current) {
        const session = await sessionRef.current;
        session.close();
    }
    
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    // Safely close contexts
    if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
        inputAudioContextRef.current.close();
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
    }
    
    setIsVoiceMode(false);
    setIsSpeaking(false);
    setIsVoiceConnecting(false);
    nextStartTimeRef.current = 0;
  };

  // TTS Feature
  const playTTS = async (text: string) => {
    if (!process.env.API_KEY || !text) return;
    
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-preview-tts',
            contents: { parts: [{ text }] },
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
                }
            }
        });
        
        const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (audioData) {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
            const binaryString = atob(audioData);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            
            const int16Array = new Int16Array(bytes.buffer);
             const float32Array = new Float32Array(int16Array.length);
             for (let i = 0; i < int16Array.length; i++) {
                float32Array[i] = int16Array[i] / 32768.0;
            }

            const audioBuffer = ctx.createBuffer(1, float32Array.length, 24000);
            audioBuffer.getChannelData(0).set(float32Array);
            
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            source.start();
             source.onended = () => {
                if (ctx.state !== 'closed') {
                    ctx.close();
                }
            };
        }
    } catch (error) {
        console.error("TTS Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* Mouse Spotlight Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.15), transparent 80%)`,
        }}
      />

      {/* Navbar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="relative w-10 h-10 rounded-full overflow-hidden bg-teal-500/10 flex items-center justify-center">
                <img 
                  src="/1.webp" 
                  alt="Hamroh AI" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('bg-teal-500');
                  }}
                />
                <span className="absolute text-xs font-bold text-teal-500 hidden">AI</span>
             </div>
             <span className="text-2xl font-bold text-slate-900">Hamroh <span className="text-teal-500">AI</span></span>
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
            <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="text-sm font-medium hover:text-teal-500 transition">{t.nav.about}</a>
            <a href="#problems" onClick={(e) => handleScrollTo(e, 'problems')} className="text-sm font-medium hover:text-teal-500 transition">{t.nav.problems}</a>
            <a href="#curriculum" onClick={(e) => handleScrollTo(e, 'curriculum')} className="text-sm font-medium hover:text-teal-500 transition">{t.nav.program}</a>
            <a href="#team" onClick={(e) => handleScrollTo(e, 'team')} className="text-sm font-medium hover:text-teal-500 transition">{t.nav.team}</a>
            <a href="#pricing" onClick={(e) => handleScrollTo(e, 'pricing')} className="text-sm font-medium hover:text-teal-500 transition">{t.nav.pricing}</a>
            <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="bg-teal-500 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-600 transition">{t.nav.contact}</a>
            
            {/* Language Switcher */}
            <div className="flex gap-2 ml-4">
              <button onClick={() => setLanguage('uz')} className={`p-1 rounded ${language === 'uz' ? 'bg-slate-100 ring-1 ring-teal-500' : 'opacity-50 hover:opacity-100'}`}>🇺🇿</button>
              <button onClick={() => setLanguage('ru')} className={`p-1 rounded ${language === 'ru' ? 'bg-slate-100 ring-1 ring-teal-500' : 'opacity-50 hover:opacity-100'}`}>🇷🇺</button>
              <button onClick={() => setLanguage('en')} className={`p-1 rounded ${language === 'en' ? 'bg-slate-100 ring-1 ring-teal-500' : 'opacity-50 hover:opacity-100'}`}>🇬🇧</button>
            </div>
          </div>

          <button className="md:hidden text-slate-900">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background decorative blobs with animation */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl -z-10 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl -z-10 animate-drift"></div>

        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex justify-center gap-4 mb-8">
             <div className="bg-white border border-teal-100 shadow-sm px-4 py-1 rounded-full text-sm font-medium text-slate-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                {t.hero.formatLabel} <span className="text-teal-600 font-bold">{t.hero.formatValue}</span>
             </div>
             <div className="bg-white border border-teal-100 shadow-sm px-4 py-1 rounded-full text-sm font-medium text-slate-600 flex items-center gap-2">
                <Clock className="w-3 h-3 text-teal-500" />
                {t.hero.durationLabel} <span className="text-teal-600 font-bold">{t.hero.durationValue}</span>
             </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-normal md:leading-relaxed mb-6">
            {t.hero.titlePrefix} <span className="inline-block text-teal-500 bg-teal-50 px-2 py-1 rounded-lg">{t.hero.titleHighlight}</span> {t.hero.titleSuffix}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button onClick={() => openRegistration('Umumiy')} className="bg-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-600 transition shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2">
              {t.hero.ctaPrimary} <Play className="w-4 h-4 fill-current" />
            </button>
            <a href="#curriculum" onClick={(e) => handleScrollTo(e, 'curriculum')} className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-teal-500 hover:text-teal-500 transition">
              {t.hero.ctaSecondary}
            </a>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
             <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition group relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    10+ AI vositalarini o'rganamiz
                </div>
                <Layers className="w-8 h-8 text-teal-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  <CountUp end={10} suffix="+" />
                </div>
                <div className="text-sm text-slate-500 font-medium">{t.hero.stats.platforms}</div>
             </div>
             <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition group relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Ishingizni osonlashtiruvchi tayyor matnlar
                </div>
                <FileText className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  <CountUp end={100} suffix="+" />
                </div>
                <div className="text-sm text-slate-500 font-medium">{t.hero.stats.prompts}</div>
             </div>
             <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition group relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Har qanday savolga javob beruvchi bot
                </div>
                <Bot className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  <CountUp end={24} suffix="/7" />
                </div>
                <div className="text-sm text-slate-500 font-medium">{t.hero.stats.assistant}</div>
             </div>
             <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition group relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Agar yoqmasa pulingizni qaytaramiz
                </div>
                <ShieldCheck className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  <CountUp end={3} suffix={" " + t.hero.stats.guaranteeValue.split(' ')[1]} />
                </div>
                <div className="text-sm text-slate-500 font-medium">{t.hero.stats.guarantee}</div>
             </div>
          </div>
        </div>
      </header>

      {/* AI Platforms Marquee */}
      <div className="bg-slate-50 py-10 border-y border-slate-100 overflow-hidden">
         <div className="container mx-auto px-4 mb-6 text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">O'rganiladigan vositalar</p>
         </div>
         <div className="flex gap-12 justify-center flex-wrap opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {[
                { name: 'ChatGPT', logo: 'https://cdn.simpleicons.org/openai/000000' },
                { name: 'Gemini', logo: 'https://cdn.simpleicons.org/googlegemini/4E86F5' },
                { name: 'Claude', logo: 'https://cdn.simpleicons.org/anthropic/D97757' },
                { name: 'Midjourney', logo: 'https://cdn.simpleicons.org/midjourney/FFFFFF/000000' },
                { name: 'Canva AI', logo: 'https://cdn.simpleicons.org/canva/00C4CC' },
                { name: 'Notion AI', logo: 'https://cdn.simpleicons.org/notion/000000' },
                { name: 'Perplexity', logo: 'https://cdn.simpleicons.org/perplexity/222222' },
                { name: 'Google AI Studio', logo: 'https://cdn.simpleicons.org/google/4285F4' }
            ].map((platform, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                    <img src={platform.logo} alt={platform.name} className="h-8 w-8 object-contain" />
                    <span className="text-xs font-medium text-slate-500">{platform.name}</span>
                </div>
            ))}
         </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
             <div className="md:w-1/2">
                <div className="bg-slate-900 text-white p-12 rounded-3xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 rounded-full blur-3xl opacity-20"></div>
                   <span className="text-teal-400 font-bold tracking-wider text-sm uppercase mb-2 block">{t.about.brand}</span>
                   <h2 className="text-3xl font-bold mb-6">{t.about.title}</h2>
                   <p className="text-slate-300 leading-relaxed mb-8">
                     {t.about.description}
                   </p>
                </div>
             </div>
             <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                   <Globe className="text-teal-500" /> {t.about.missionTitle}
                </h3>
                <div className="space-y-4">
                   <div className="flex gap-4">
                      <div className="w-1 bg-teal-500 rounded-full h-auto"></div>
                      <p className="text-slate-600">{t.about.missionText1}</p>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-1 bg-teal-500 rounded-full h-auto"></div>
                      <p className="text-slate-600">{t.about.missionText2}</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section id="problems" className="py-20 bg-slate-50">
         <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.problems.title}</h2>
               <p className="text-slate-600">{t.problems.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {t.problems.items.map((item, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-teal-500 transition group">
                     <span className="text-4xl font-black text-slate-100 group-hover:text-teal-50 transition mb-4 block">{item.id}</span>
                     <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                  </div>
               ))}
            </div>
         </div>
      </section>

       {/* Solution Section */}
       <section className="py-20 bg-white">
         <div className="container mx-auto px-4">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-slate-900">
                  <span className="text-teal-500">Hamroh AI</span> {t.solution.titleSuffix}
               </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               {t.solution.items.map((item, idx) => (
                  <div key={idx} className="flex gap-6 p-6 rounded-2xl hover:bg-slate-50 transition">
                     <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 text-teal-600">
                        {[<Download/>, <Play/>, <Users/>, <MessageCircle/>, <Bot/>, <FileText/>][idx]}
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-slate-600">{item.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
       </section>

      {/* Free Lesson Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.freeLesson.title}</h2>
          <p className="text-slate-600 mb-12">{t.freeLesson.subtitle}</p>
          
          <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-2xl border border-slate-200 bg-black">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/vcx1u2vJbdo" 
              title="Free Video Lesson" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Curriculum Section (Accordion) */}
      <section id="curriculum" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.curriculum.title}</h2>
               <p className="text-slate-600">{t.curriculum.subtitle}</p>
            </div>
            
            <div className="space-y-4">
               {t.curriculum.modules.map((module, idx) => (
                   <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                       <details className="group">
                           <summary className="flex justify-between items-center cursor-pointer p-6 font-bold text-slate-800 hover:bg-slate-50 transition list-none">
                               <span className="flex items-center gap-3">
                                   <span className="bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded uppercase">Modul {idx + 1}</span>
                                   {module.title}
                               </span>
                               <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                           </summary>
                           <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50">
                               <ul className="space-y-3">
                                   {module.lessons.map((lesson, lIdx) => (
                                       <li key={lIdx} className="flex items-start gap-3 text-slate-600">
                                           <Play className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                                           <span>{lesson}</span>
                                       </li>
                                   ))}
                               </ul>
                           </div>
                       </details>
                   </div>
               ))}
            </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-slate-50">
         <div className="container mx-auto px-4">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-slate-900">{t.team.title}</h2>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
               {t.team.members.map((member, idx) => (
                  <div key={idx} className="w-full sm:w-[48%] md:w-[30%] lg:w-[18%] text-center group">
                     <div className="w-24 h-24 mx-auto bg-gradient-to-br from-teal-400 to-blue-500 rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition duration-300 overflow-hidden">
                        {(member as any).image ? (
                            <img src={(member as any).image} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                            member.name.charAt(0)
                        )}
                     </div>
                     <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                     <p className="text-teal-500 text-xs font-bold uppercase tracking-wide mb-3">{member.role}</p>
                     <p className="text-xs text-slate-500 leading-relaxed">{member.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-900 text-white relative overflow-hidden">
         {/* Animated background blobs */}
         <div className="absolute top-1/3 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>

         <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.pricing.title}</h2>
               <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-4 py-1 rounded-full text-sm font-medium border border-teal-500/30">
                  <ShieldCheck className="w-4 h-4" /> {t.pricing.guarantee}
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
               {t.pricing.plans.map((plan, idx) => {
                 const isPremium = plan.name.includes("PREMIUM") || plan.name.includes("ПРЕМИУМ");
                 const isStandard = plan.name.includes("STANDART") || plan.name.includes("СТАНДАРТ") || plan.name.includes("STANDARD");
                 const isStarter = !isPremium && !isStandard;
                 
                 return (
                  <div key={idx} className={`relative bg-white text-slate-900 rounded-3xl p-8 transition-transform hover:-translate-y-2 ${isPremium ? 'ring-4 ring-yellow-400 shadow-2xl shadow-yellow-500/20 scale-105 md:scale-110 z-10' : isStandard ? 'ring-2 ring-teal-500 shadow-xl' : 'shadow-lg'}`}>
                     {isPremium && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                            <Crown className="w-3 h-3" /> MOST POPULAR
                        </div>
                     )}
                     <div className="text-center mb-8">
                       {(plan as any).discountBadge && (
                           <div className="inline-block bg-red-100 text-red-600 border border-red-200 text-xs font-extrabold px-3 py-1 rounded-full mb-3 animate-pulse">
                               {(plan as any).discountBadge}
                           </div>
                       )}
                        <h3 className={`text-sm font-bold uppercase tracking-wider mb-2 ${isPremium ? 'text-yellow-600' : isStandard ? 'text-teal-600' : 'text-slate-500'}`}>{plan.name}</h3>
                        <div className="text-4xl font-black text-slate-900 mb-1">{plan.price} <span className="text-lg font-medium text-slate-400">{plan.currency}</span></div>
                     </div>

                     <button onClick={() => openRegistration(plan.name)} className={`block w-full py-4 rounded-xl font-bold text-center mb-8 transition shadow-lg ${isPremium ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white hover:to-teal-500' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                        {plan.button}
                     </button>

                     <ul className="space-y-4">
                        {plan.features.map((feature, fIdx) => (
                           <li key={fIdx} className={`flex items-start gap-3 p-2 rounded-lg transition ${feature.highlight ? (isPremium ? 'bg-yellow-50 border border-yellow-100' : 'bg-teal-50 border border-teal-100') : ''}`}>
                              {feature.highlight ? (
                                  isPremium ? <Crown className="w-5 h-5 text-yellow-500 fill-yellow-500 flex-shrink-0 mt-0.5" /> : <Zap className="w-5 h-5 text-teal-500 fill-teal-500 flex-shrink-0 mt-0.5" />
                              ) : (
                                  <CheckCircle className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                              )}
                              <span className={`text-sm ${feature.highlight ? 'font-bold text-slate-900' : 'text-gray-600'}`}>{feature.text}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
                 );
               })}
            </div>

            <p className="text-center text-slate-400 mt-24 text-sm">{t.pricing.disclaimer}</p>
         </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.contact.title}</h2>
            <p className="text-slate-600 mb-12">{t.contact.subtitle}</p>

            <div className="inline-flex flex-col md:flex-row items-center gap-8 bg-slate-50 p-8 rounded-3xl border border-slate-100">
               <div className="flex items-center gap-4">
                   <div className="relative w-16 h-16 rounded-full overflow-hidden bg-teal-500/10 flex items-center justify-center">
                        <img 
                          src="/1.webp" 
                          alt="Hamroh AI" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.classList.add('bg-teal-500');
                          }}
                        />
                         <span className="absolute text-xs font-bold text-teal-500 hidden">AI</span>
                   </div>
                   <div className="text-left">
                      <p className="text-xs font-bold text-teal-500 uppercase">{t.contact.role}</p>
                      <h3 className="text-xl font-bold text-slate-900">Qilichbek Ismoilov</h3>
                   </div>
               </div>
               <div className="h-px w-full md:w-px md:h-12 bg-slate-200"></div>
               <div className="text-left">
                   <div className="flex items-center gap-2 text-slate-500 mb-1">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">Telefon raqam</span>
                   </div>
                   <a href="tel:+998886054454" className="text-2xl font-bold text-slate-900 hover:text-teal-500 transition">+998 88 605 44 54</a>
               </div>
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.faq.title}</h2>
            </div>
            
            <div className="space-y-4">
               {t.faq.items.map((item, idx) => (
                   <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                       <details className="group">
                           <summary className="flex justify-between items-center cursor-pointer p-6 font-bold text-slate-800 hover:bg-slate-50 transition list-none">
                               <span className="pr-4">{item.q}</span>
                               <ChevronDown className="w-5 h-5 text-teal-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                           </summary>
                           <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed border-t border-slate-100">
                               {item.a}
                           </div>
                       </details>
                   </div>
               ))}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center items-center gap-2 mb-8">
             <div className="relative w-10 h-10 rounded-full overflow-hidden bg-teal-500/10 flex items-center justify-center">
                <img 
                  src="/1.webp" 
                  alt="Hamroh AI" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('bg-teal-500');
                  }}
                />
                 <span className="absolute text-xs font-bold text-teal-500 hidden">AI</span>
             </div>
             <span className="text-2xl font-bold text-white">Hamroh <span className="text-teal-400">AI</span></span>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a 
              href="https://www.instagram.com/hamroh.ai?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-slate-800 p-4 rounded-full text-teal-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://t.me/aihamroh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-slate-800 p-4 rounded-full text-teal-400 hover:bg-blue-500 hover:text-white transition-all hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              aria-label="Telegram"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
          </div>

          <p>{t.footer}</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 z-40 bg-white text-teal-500 p-3 rounded-full shadow-lg border border-teal-100 transition-all duration-300 hover:bg-teal-50 hover:scale-110 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
            <button 
              onClick={closeRegistration}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>
            
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-teal-100 text-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.modal.successTitle}</h3>
                <p className="text-slate-600 mb-6">{t.modal.successMsg}</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.modal.title}</h3>
                  <p className="text-slate-600 text-sm">{t.modal.subtitle}</p>
                  {selectedPlan && (
                    <span className="inline-block mt-3 px-3 py-1 bg-teal-50 text-teal-600 text-xs font-bold uppercase rounded-full border border-teal-100">
                      {selectedPlan}
                    </span>
                  )}
                </div>
                
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">{t.modal.nameLabel}</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input 
                        type="text" 
                        required
                        value={modalForm.name}
                        onChange={(e) => setModalForm({...modalForm, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder={t.modal.nameLabel}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">{t.modal.phoneLabel}</label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input 
                        type="tel" 
                        required
                        value={modalForm.phone}
                        onChange={(e) => setModalForm({...modalForm, phone: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="+998 90 123 45 67"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-teal-500 text-white font-bold py-3 rounded-xl hover:bg-teal-600 transition shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : t.modal.submit}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Chat Toggle */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="bg-teal-500 text-white p-4 rounded-full shadow-lg hover:bg-teal-600 transition hover:scale-110 flex items-center justify-center"
          >
            {isChatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            {!isChatOpen && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 flex flex-col overflow-hidden animate-float">
            <div className="bg-slate-900 p-4 flex justify-between items-center border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6 text-teal-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">{t.chatbot.title}</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs text-slate-400">{t.chatbot.online}</span>
                        </div>
                    </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white">
                    <Minimize2 className="w-5 h-5" />
                </button>
            </div>

            {/* Messages Area */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-teal-500 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'}`}>
                            {msg.text}
                             {msg.role === 'model' && (
                                <button onClick={() => playTTS(msg.text)} className="ml-2 mt-1 opacity-50 hover:opacity-100">
                                    <Volume2 className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {isChatLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                           <Loader2 className="w-4 h-4 animate-spin text-teal-500" />
                           <span className="text-xs text-slate-400">{t.chatbot.thinking}</span>
                        </div>
                    </div>
                )}
                
                {isVoiceMode && (
                    <div className="flex flex-col items-center justify-center py-8 gap-4 bg-teal-50 rounded-xl border border-teal-100 animate-pulse">
                        {isVoiceConnecting ? (
                             <>
                                <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
                                <span className="text-sm text-teal-600 font-medium">{t.chatbot.connecting}</span>
                             </>
                        ) : (
                            <>
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isSpeaking ? 'bg-teal-500 scale-110 shadow-lg shadow-teal-500/50' : 'bg-teal-100'}`}>
                                    <Mic className={`w-8 h-8 ${isSpeaking ? 'text-white' : 'text-teal-500'}`} />
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-teal-700">{isSpeaking ? "AI Gapirmoqda..." : t.chatbot.listening}</p>
                                    <p className="text-xs text-teal-500">{t.chatbot.listeningDesc}</p>
                                </div>
                                <button onClick={stopVoiceMode} className="bg-white border border-red-200 text-red-500 px-4 py-2 rounded-full text-xs font-bold hover:bg-red-50">
                                    {t.chatbot.endSession}
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-100">
                <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1 pl-4 border border-slate-200">
                    <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={t.chatbot.inputPlaceholder}
                        disabled={isVoiceMode}
                        className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400 disabled:opacity-50"
                    />
                    {chatInput.trim() ? (
                        <button onClick={handleSendMessage} className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white hover:bg-teal-600 transition">
                            <Send className="w-4 h-4" />
                        </button>
                    ) : (
                         <button onClick={startVoiceMode} disabled={isVoiceMode} className={`w-10 h-10 rounded-full flex items-center justify-center transition ${isVoiceMode ? 'bg-red-50 text-red-500' : 'bg-slate-200 text-slate-500 hover:bg-teal-500 hover:text-white'}`}>
                            <Mic className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
