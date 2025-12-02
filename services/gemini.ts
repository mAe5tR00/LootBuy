import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // In a real app, strict env handling

export const generateListingDescription = async (
  game: string,
  item: string,
  type: string,
  features: string[]
): Promise<string> => {
  if (!apiKey) {
    console.warn("No API Key provided for Gemini");
    return "Пожалуйста, настройте API Key для использования ИИ-помощника. (Симуляция ответа)";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
      Ты профессиональный копирайтер для биржи игровых ценностей LootBuy (аналог FunPay).
      Напиши продающее, короткое и емкое описание товара для объявления на русском языке.
      Используй эмодзи умеренно. Делай акцент на безопасности, скорости и выгоде.
      
      Игра: ${game}
      Предмет/Услуга: ${item}
      Тип: ${type}
      Ключевые особенности: ${features.join(', ')}

      Формат: Markdown. Не более 150 слов.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Не удалось сгенерировать описание.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ошибка подключения к ИИ-ассистенту.";
  }
};