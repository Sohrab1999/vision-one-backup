import type { DictEntry } from "../types";

/**
 * دیکشنری انگلیسی به انگلیسی جزوه هشتم — ۵۶ واژه کلیدی سطح A1-A2 (۸ واژه از هر درس)
 * بر اساس جداول واژگان درس‌های ۱ تا ۷ (صفحات ۹، ۱۹، ۲۸-۲۹، ۳۶-۳۷، ۴۲-۴۳، ۵۱-۵۲ و ۶۱ جزوه):
 * کشورها/ملیت‌ها، افعال زندگی روزمره و زمان‌ها، توانایی‌ها و سرگرمی‌ها، بیماری‌ها و توصیه‌های
 * بهداشتی، شهرها و جهت‌های جغرافیایی، آب‌وهوا و طبیعت، و سرگرمی‌های آزاد.
 *
 * اصلاحیه (سیاست غلط چاپی): غلط‌های آشکار جزوه هنگام استخراج ترمیم شد:
 * «تعطیالت» → «تعطیلات»، «سالمتی» → «سلامتی»، «معموال» → «معمولا»، «مالقات» → «ملاقات»
 * (ترمیم لیگاتور «لا» در متن فارسی جزوه).
 */
export const DICTIONARY: DictEntry[] = [
  // ─── درس ۱ — My Nationality (کشورها و ملیت‌ها) ───
  { word: "country", phonetic: "/ ˈkʌntri /", pos: "n.", definition: "a place in the world with its own land, people and government", examples: ["Iran is a large country in Asia.", "How many countries can you name?"], lesson: 1 },
  { word: "nationality", phonetic: "/ ˌnæʃəˈnæləti /", pos: "n.", definition: "the name of the country that a person comes from", examples: ["What's his nationality? — He is Brazilian.", "People of many nationalities live in this city."], lesson: 1 },
  { word: "continent", phonetic: "/ ˈkɑːntɪnənt /", pos: "n.", definition: "one of the seven very large areas of land in the world, like Asia or Africa", examples: ["Asia is the biggest continent.", "Egypt is in Africa, a hot continent."], lesson: 1 },
  { word: "cousin", phonetic: "/ ˈkʌzn /", pos: "n.", definition: "the child of your aunt or uncle", examples: ["My cousin lives in Shiraz.", "I play football with my cousins on Fridays."], lesson: 1 },
  { word: "speak", phonetic: "/ spiːk /", pos: "v.", definition: "to talk with someone, or to know and use a language", examples: ["Do you speak English?", "People in Spain speak Spanish."], lesson: 1 },
  { word: "live", phonetic: "/ lɪv /", pos: "v.", definition: "to have your home in a place", examples: ["We live in Tehran.", "Penguins live in cold places."], lesson: 1 },
  { word: "originally", phonetic: "/ əˈrɪdʒənəli /", pos: "adv.", definition: "in the beginning, before things changed", examples: ["This family is originally from Brazil.", "He is originally from Tabriz, but now he lives in Shiraz."], lesson: 1 },
  { word: "welcome", phonetic: "/ ˈwelkəm /", pos: "v.", definition: "to say hello to someone in a friendly way when they arrive", examples: ["Welcome to our city!", "They welcome the tourists with a smile."], lesson: 1 },

  // ─── درس ۲ — My Week (زندگی روزمره، روزها و زمان‌ها) ───
  { word: "afternoon", phonetic: "/ ˌæftərˈnuːn /", pos: "n.", definition: "the time between noon and the evening", examples: ["I study English in the afternoon.", "See you on Thursday afternoon."], lesson: 2 },
  { word: "evening", phonetic: "/ ˈiːvnɪŋ /", pos: "n.", definition: "the time between the afternoon and the night", examples: ["We watch TV in the evening.", "Good evening, sir!"], lesson: 2 },
  { word: "midnight", phonetic: "/ ˈmɪdnaɪt /", pos: "n.", definition: "twelve o'clock at night; the middle of the night", examples: ["The bus arrives at midnight.", "I never stay up until midnight."], lesson: 2 },
  { word: "weekday", phonetic: "/ ˈwiːkdeɪ /", pos: "n.", definition: "a day of the week when people usually work or go to school", examples: ["I go to school on weekdays.", "We play sports only on weekdays."], lesson: 2 },
  { word: "weekend", phonetic: "/ ˈwiːkend /", pos: "n.", definition: "the days at the end of the week when you do not go to school or work", examples: ["We go shopping at the weekend.", "Have a nice weekend!"], lesson: 2 },
  { word: "gym", phonetic: "/ dʒɪm /", pos: "n.", definition: "a big room with equipment for exercise and sport", examples: ["The students exercise in the gym.", "Our school gym is new."], lesson: 2 },
  { word: "study", phonetic: "/ ˈstʌdi /", pos: "v.", definition: "to spend time learning, especially at school", examples: ["I study English every day.", "She studies her lessons in the evening."], lesson: 2 },
  { word: "relax", phonetic: "/ rɪˈlæks /", pos: "v.", definition: "to rest and stop working or worrying", examples: ["I relax and listen to music after school.", "You should relax at the weekend."], lesson: 2 },

  // ─── درس ۳ — My Abilities (توانایی‌ها و سرگرمی‌ها) ───
  { word: "ability", phonetic: "/ əˈbɪləti /", pos: "n.", definition: "something that you are able to do well", examples: ["Swimming is a useful ability.", "She has the ability to draw very well."], lesson: 3 },
  { word: "swim", phonetic: "/ swɪm /", pos: "v.", definition: "to move your body through water", examples: ["I can swim very well.", "We swim in the pool in summer."], lesson: 3 },
  { word: "draw", phonetic: "/ drɔː /", pos: "v.", definition: "to make a picture with a pen or a pencil", examples: ["Can you draw a cat?", "She draws beautiful flowers."], lesson: 3 },
  { word: "cook", phonetic: "/ kʊk /", pos: "v.", definition: "to make food ready to eat by heating it", examples: ["My father can cook delicious food.", "I help Mom cook dinner."], lesson: 3 },
  { word: "ride", phonetic: "/ raɪd /", pos: "v.", definition: "to sit on a bicycle, a horse or a motorcycle and travel on it", examples: ["Ali can ride a bicycle.", "We ride horses in the village."], lesson: 3 },
  { word: "recite", phonetic: "/ rɪˈsaɪt /", pos: "v.", definition: "to say a poem or a text loudly from memory", examples: ["The students recite the Holy Quran.", "He recites a poem in the class."], lesson: 3 },
  { word: "act", phonetic: "/ ækt /", pos: "v.", definition: "to play a part in a movie or a play", examples: ["She acts in school movies.", "Can you act in our play?"], lesson: 3 },
  { word: "puzzle", phonetic: "/ ˈpʌzl /", pos: "n.", definition: "a game with many pieces that you put together to make a picture", examples: ["I can do a puzzle very fast.", "This puzzle has one hundred pieces."], lesson: 3 },

  // ─── درس ۴ — My Health (بیماری‌ها و توصیه‌های بهداشتی) ───
  { word: "health", phonetic: "/ helθ /", pos: "n.", definition: "the condition of your body; being well and not sick", examples: ["Rest is good for your health.", "Sport keeps you in good health."], lesson: 4 },
  { word: "headache", phonetic: "/ ˈhedeɪk /", pos: "n.", definition: "a pain in your head", examples: ["I have a headache, so I should rest.", "She has a bad headache today."], lesson: 4 },
  { word: "flu", phonetic: "/ fluː /", pos: "n.", definition: "a common illness with fever, cough and a running nose", examples: ["He is at home because he has the flu.", "The flu is common in winter."], lesson: 4 },
  { word: "cough", phonetic: "/ kɔːf /", pos: "v.", definition: "to push air out of your throat with a loud sound, often when you are sick", examples: ["I have a cold and I cough a lot.", "The sick boy coughs at night."], lesson: 4 },
  { word: "sneeze", phonetic: "/ sniːz /", pos: "v.", definition: "to blow air out through your nose suddenly", examples: ["Use a tissue when you sneeze.", "He sneezes because of the dust."], lesson: 4 },
  { word: "rest", phonetic: "/ rest /", pos: "n.", definition: "a time of relaxing or sleeping after work or illness", examples: ["You should get some rest.", "The doctor says rest is good for the patient."], lesson: 4 },
  { word: "nurse", phonetic: "/ nɜːrs /", pos: "n.", definition: "a person trained to take care of sick people", examples: ["The nurse helps the doctor in the hospital.", "A kind nurse takes care of the patients."], lesson: 4 },
  { word: "advice", phonetic: "/ ədˈvaɪs /", pos: "n.", definition: "an idea that you give someone about what they should do", examples: ["The dentist gave me good advice.", "You should follow the doctor's advice."], lesson: 4 },

  // ─── درس ۵ — My City (شهرها و جهت‌های جغرافیایی) ───
  { word: "capital", phonetic: "/ ˈkæpɪtl /", pos: "n.", definition: "the most important city of a country, where the government is", examples: ["Tehran is the capital of Iran.", "What's the capital of Brazil?"], lesson: 5 },
  { word: "downtown", phonetic: "/ ˌdaʊnˈtaʊn /", pos: "n.", definition: "the busy center of a city with stores and offices", examples: ["There are many tall buildings downtown.", "We go downtown at the weekend."], lesson: 5 },
  { word: "north", phonetic: "/ nɔːrθ /", pos: "n.", definition: "one of the four main directions; it is up on most maps", examples: ["Tabriz is in the north of Iran.", "The weather is rainy in the north."], lesson: 5 },
  { word: "south", phonetic: "/ saʊθ /", pos: "n.", definition: "one of the four main directions; it is down on most maps", examples: ["Bandar Abbas is in the south of Iran.", "They travel to the south in winter."], lesson: 5 },
  { word: "east", phonetic: "/ iːst /", pos: "n.", definition: "one of the four main directions; the direction of the sunrise", examples: ["The sun rises in the east.", "Mashhad is in the east of Iran."], lesson: 5 },
  { word: "west", phonetic: "/ west /", pos: "n.", definition: "one of the four main directions; the direction of the sunset", examples: ["The sun sets in the west.", "Sanandaj is in the west of Iran."], lesson: 5 },
  { word: "stadium", phonetic: "/ ˈsteɪdiəm /", pos: "n.", definition: "a big place with seats where people watch football and other sports", examples: ["There is a big football stadium in our city.", "Thousands of people watch matches in the stadium."], lesson: 5 },
  { word: "museum", phonetic: "/ mjuːˈziːəm /", pos: "n.", definition: "a building where old and interesting things are kept for people to see", examples: ["We visit the museum on Fridays.", "This museum is famous for its old carpets."], lesson: 5 },

  // ─── درس ۶ — My Village (آب‌وهوا، فصول و طبیعت) ───
  { word: "weather", phonetic: "/ ˈweðər /", pos: "n.", definition: "the condition of the air, like hot, cold, rainy or windy", examples: ["What's the weather like today?", "The weather is warm in spring."], lesson: 6 },
  { word: "rainy", phonetic: "/ ˈreɪni /", pos: "adj.", definition: "with a lot of rain", examples: ["It is a rainy day; take your umbrella.", "Autumn is rainy in the north of Iran."], lesson: 6 },
  { word: "windy", phonetic: "/ ˈwɪndi /", pos: "adj.", definition: "with a lot of wind", examples: ["It is windy today, so let's fly a kite.", "The weather is cold and windy in winter."], lesson: 6 },
  { word: "spring", phonetic: "/ sprɪŋ /", pos: "n.", definition: "the season after winter when flowers open", examples: ["The weather is sunny in spring.", "We have many rainy days in spring."], lesson: 6 },
  { word: "summer", phonetic: "/ ˈsʌmər /", pos: "n.", definition: "the warmest season of the year", examples: ["We go swimming in summer.", "The days are long and hot in summer."], lesson: 6 },
  { word: "winter", phonetic: "/ ˈwɪntər /", pos: "n.", definition: "the coldest season of the year", examples: ["It is often snowy here in winter.", "We wear warm clothes in winter."], lesson: 6 },
  { word: "river", phonetic: "/ ˈrɪvər /", pos: "n.", definition: "water that flows across the land to the sea", examples: ["There is a beautiful river near our village.", "We swim in the river in summer."], lesson: 6 },
  { word: "farm", phonetic: "/ fɑːrm /", pos: "n.", definition: "a place with fields where people grow plants and keep animals", examples: ["My grandfather works on a farm.", "There are many cows and hens on the farm."], lesson: 6 },

  // ─── درس ۷ — My Hobbies (سرگرمی‌های اوقات آزاد) ───
  { word: "hobby", phonetic: "/ ˈhɑːbi /", pos: "n.", definition: "an activity that you enjoy doing in your free time", examples: ["What's your hobby?", "Reading is my favorite hobby."], lesson: 7 },
  { word: "free time", phonetic: "/ ˌfriː ˈtaɪm /", pos: "n.", definition: "the time when you have no school or work and can do what you like", examples: ["I play tennis in my free time.", "What do you do in your free time?"], lesson: 7 },
  { word: "enjoy", phonetic: "/ ɪnˈdʒɔɪ /", pos: "v.", definition: "to get happiness from something", examples: ["I enjoy walking in the park.", "We enjoy listening to music."], lesson: 7 },
  { word: "usually", phonetic: "/ ˈjuːʒuəli /", pos: "adv.", definition: "most of the time; happening more than any other way", examples: ["I usually read magazines at night.", "She usually goes shopping on Fridays."], lesson: 7 },
  { word: "ski", phonetic: "/ skiː /", pos: "v.", definition: "to move over snow on long thin boards", examples: ["People ski in the mountains in winter.", "Can you ski?"], lesson: 7 },
  { word: "poem", phonetic: "/ ˈpoʊəm /", pos: "n.", definition: "a piece of writing with beautiful words and rhythm", examples: ["She writes a short poem about spring.", "We learn a new poem every month."], lesson: 7 },
  { word: "magazine", phonetic: "/ ˈmæɡəziːn /", pos: "n.", definition: "a thin book with news, pictures and stories, printed every week or month", examples: ["I read a sports magazine every week.", "There are many English magazines in the library."], lesson: 7 },
  { word: "search", phonetic: "/ sɜːrtʃ /", pos: "v.", definition: "to look for something carefully on the web or in a place", examples: ["I search the web for new words.", "Search the net for information about cities."], lesson: 7 },
];
