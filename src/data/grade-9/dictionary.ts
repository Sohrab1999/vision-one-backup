import type { DictEntry } from "../types";

/**
 * دیکشنری انگلیسی به انگلیسی جزوه نهم — واژگان کلیدی ستاره‌دار هر درس
 * (تلفظ، نوع، تعریف انگلیسی و مثال) بر اساس واژگان صفحات ۱۱ تا ۸۹ جزوه.
 */
export const DICTIONARY: DictEntry[] = [
  // ─── درس ۱ — Personality ───
  { word: "kind", phonetic: "/ kaɪnd /", pos: "adj.", definition: "friendly, generous, and caring about other people", examples: ["She is kind to everyone.", "A kind man helps old people."], lesson: 1 },
  { word: "lazy", phonetic: "/ ˈleɪzi /", pos: "adj.", definition: "not willing to work or be active", examples: ["He is a lazy student.", "Lazy people don't finish their homework."], lesson: 1 },
  { word: "nervous", phonetic: "/ ˈnɜːrvəs /", pos: "adj.", definition: "worried and anxious about something", examples: ["I feel nervous before exams.", "The boy is nervous about the test."], lesson: 1 },
  { word: "brave", phonetic: "/ breɪv /", pos: "adj.", definition: "not afraid of danger or pain", examples: ["A brave soldier saves people.", "She is brave enough to speak."], lesson: 1 },
  { word: "patient", phonetic: "/ ˈpeɪʃnt /", pos: "adj.", definition: "able to wait for a long time without getting angry", examples: ["My mother is very patient.", "Be patient with little kids."], lesson: 1 },
  { word: "polite", phonetic: "/ pəˈlaɪt /", pos: "adj.", definition: "behaving in a respectful and kind way", examples: ["A polite student says 'thank you'.", "He is polite to his teachers."], lesson: 1 },
  { word: "selfish", phonetic: "/ ˈselfɪʃ /", pos: "adj.", definition: "caring only about yourself and not about other people", examples: ["A selfish person never shares.", "Don't be selfish with your toys."], lesson: 1 },
  { word: "generous", phonetic: "/ ˈdʒenərəs /", pos: "adj.", definition: "happy to give more than is expected; giving freely", examples: ["My uncle is generous.", "A generous girl gives money to charity."], lesson: 1 },
  { word: "clever", phonetic: "/ ˈklevər /", pos: "adj.", definition: "quick to learn and understand things", examples: ["He's a clever boy.", "Clever students solve hard questions."], lesson: 1 },

  // ─── درس ۲ — Travel ───
  { word: "airport", phonetic: "/ ˈeərpɔːrt /", pos: "n.", definition: "a place where planes take off and land", examples: ["We go to the airport by taxi.", "The plane lands at the airport."], lesson: 2 },
  { word: "passport", phonetic: "/ ˈpæspɔːrt /", pos: "n.", definition: "an official document you need when you travel to another country", examples: ["The receptionist checks her passport.", "Don't forget your passport!"], lesson: 2 },
  { word: "exchange", phonetic: "/ ɪksˈtʃeɪndʒ /", pos: "v.", definition: "to change one thing for another, e.g. money", examples: ["You can exchange money at the bank.", "I exchanged dollars for rials."], lesson: 2 },
  { word: "land", phonetic: "/ lænd /", pos: "v.", definition: "to come down to the ground from the air", examples: ["The plane lands at 8.", "Birds land on the tree."], lesson: 2 },
  { word: "take off", phonetic: "/ teɪk ɒf /", pos: "phr. v.", definition: "to leave the ground and rise into the air (a plane)", examples: ["The plane takes off at noon.", "Watch the plane take off!"], lesson: 2 },
  { word: "timetable", phonetic: "/ ˈtaɪmteɪbl /", pos: "n.", definition: "a list showing the times of trains, buses or classes", examples: ["Check the timetable, please.", "The timetable shows our classes."], lesson: 2 },
  { word: "tourist", phonetic: "/ ˈtʊrɪst /", pos: "n.", definition: "a person who travels to visit places", examples: ["Many tourists visit Isfahan.", "The tourist is buying a ticket."], lesson: 2 },
  { word: "voyage", phonetic: "/ ˈvɔɪɪdʒ /", pos: "n.", definition: "a long journey by sea or in space", examples: ["Our ship crossed the Atlantic in 7 days — a long voyage.", "They made a voyage to the south."], lesson: 2 },
  { word: "receptionist", phonetic: "/ rɪˈsepʃənɪst /", pos: "n.", definition: "a person whose job is to welcome people in a hotel or office", examples: ["Talk to the receptionist.", "The receptionist gives you the key."], lesson: 2 },

  // ─── درس ۳ — Festivals and Ceremonies ───
  { word: "anniversary", phonetic: "/ ˌænɪˈvɜːrsəri /", pos: "n.", definition: "a date on which something important happened in a past year", examples: ["The Islamic revolution anniversary is in Bahman.", "It's our school's 50th anniversary."], lesson: 3 },
  { word: "commemorate", phonetic: "/ kəˈmeməreɪt /", pos: "v.", definition: "to remember and honor an important person or event", examples: ["We commemorate our martyrs.", "A ceremony commemorates the war heroes."], lesson: 3 },
  { word: "ceremony", phonetic: "/ ˈserəmoʊni /", pos: "n.", definition: "a formal event held on an important occasion", examples: ["They hold a ceremony every year.", "The opening ceremony starts at 9."], lesson: 3 },
  { word: "fireworks", phonetic: "/ ˈfaɪərwɜːrks /", pos: "n.", definition: "small explosive objects that make bright lights in the sky", examples: ["We watch fireworks on New Year's Eve.", "The fireworks are beautiful."], lesson: 3 },
  { word: "parade", phonetic: "/ pəˈreɪd /", pos: "n.", definition: "a public march of soldiers or people celebrating an event", examples: ["We watch the military parade.", "A big parade goes through the city."], lesson: 3 },
  { word: "revolution", phonetic: "/ ˌrevəˈluːʃn /", pos: "n.", definition: "a big change in a country's government or way of life", examples: ["The Islamic revolution was in 1979.", "Penicillin was a revolution in medicine."], lesson: 3 },
  { word: "culture", phonetic: "/ ˈkʌltʃər /", pos: "n.", definition: "the beliefs, customs and way of life of a country", examples: ["Nowruz is important in Iranian culture.", "Islamic-Iranian culture is rich."], lesson: 3 },
  { word: "hold", phonetic: "/ hoʊld /", pos: "v.", definition: "to organize an event and make it happen", examples: ["Iranians hold a ceremony each year.", "The school holds a festival."], lesson: 3 },

  // ─── درس ۴ — Services ───
  { word: "donate", phonetic: "/ doʊˈneɪt /", pos: "v.", definition: "to give money, blood or things to help people", examples: ["He donates blood every year.", "We donate money to charity."], lesson: 4 },
  { word: "emergency", phonetic: "/ ɪˈmɜːrdʒənsi /", pos: "n.", definition: "a sudden serious situation that needs quick action", examples: ["Call the emergency in a fire.", "Firefighters are ready for emergencies."], lesson: 4 },
  { word: "charity", phonetic: "/ ˈtʃærəti /", pos: "n.", definition: "an organization that helps people in need", examples: ["She always helps charity.", "The Red Crescent is a charity."], lesson: 4 },
  { word: "account", phonetic: "/ əˈkaʊnt /", pos: "n.", definition: "an arrangement with a bank to keep your money", examples: ["I want to open an account.", "She has a bank account."], lesson: 4 },
  { word: "firefighter", phonetic: "/ ˈfaɪərfaɪtər /", pos: "n.", definition: "a person whose job is to put out fires", examples: ["A firefighter puts out fires.", "Firefighters work in two shifts."], lesson: 4 },
  { word: "shift", phonetic: "/ ʃɪft /", pos: "n.", definition: "a period of work time, e.g. at night or in the morning", examples: ["They work in two shifts.", "My father works the night shift."], lesson: 4 },
  { word: "stamp", phonetic: "/ stæmp /", pos: "n.", definition: "a small paper label you put on a letter before posting it", examples: ["I want a stamp, please.", "She buys stamps from a post office."], lesson: 4 },
  { word: "recharge", phonetic: "/ ˌriːˈtʃɑːrdʒ /", pos: "v.", definition: "to fill a battery with electricity so it can work again", examples: ["Recharge your E-ticket here.", "I need to recharge my phone."], lesson: 4 },
  { word: "voluntary", phonetic: "/ ˈvɑːlənteri /", pos: "adj.", definition: "done willingly without being paid", examples: ["He does voluntary work.", "Voluntary work is great for students."], lesson: 4 },

  // ─── درس ۵ — Media ───
  { word: "attend", phonetic: "/ əˈtend /", pos: "v.", definition: "to go to and be present at an event", examples: ["She attended Fajr Film Festival.", "Will you attend the meeting?"], lesson: 5 },
  { word: "download", phonetic: "/ ˌdaʊnˈloʊd /", pos: "v.", definition: "to copy data from the Internet to your device", examples: ["They downloaded the book yesterday.", "Download something from the Internet."], lesson: 5 },
  { word: "install", phonetic: "/ ɪnˈstɔːl /", pos: "v.", definition: "to put a program onto a computer or phone", examples: ["Install an antivirus program.", "He installed a computer dictionary."], lesson: 5 },
  { word: "connect", phonetic: "/ kəˈnekt /", pos: "v.", definition: "to join to the Internet or another system", examples: ["She connected to the Internet at school.", "Connect to the Internet, please."], lesson: 5 },
  { word: "blog", phonetic: "/ blɒɡ /", pos: "n.", definition: "a website where a person writes regularly about their life or interests", examples: ["She updates her blog weekly.", "I read an interesting blog."], lesson: 5 },
  { word: "channel", phonetic: "/ ˈtʃænl /", pos: "n.", definition: "a TV station or number of a TV station", examples: ["Change the TV channels.", "Channel 3 shows a quiz show."], lesson: 5 },
  { word: "quiz show", phonetic: "/ kwɪz ʃoʊ /", pos: "n.", definition: "a TV program in which people answer questions to win prizes", examples: ["We watched a quiz show last night.", "The quiz show was exciting."], lesson: 5 },
  { word: "participate", phonetic: "/ pɑːrˈtɪsɪpeɪt /", pos: "v.", definition: "to take part in an activity or event", examples: ["Participate in an online course.", "Everyone participated in the class."], lesson: 5 },

  // ─── درس ۶ — Health and Injuries ───
  { word: "accident", phonetic: "/ ˈæksɪdənt /", pos: "n.", definition: "an unexpected event that causes damage or injury", examples: ["Mina had an accident.", "They drove fast and had an accident."], lesson: 6 },
  { word: "bruise", phonetic: "/ bruːz /", pos: "n.", definition: "a dark mark on the skin after a hit", examples: ["He has some bruises on his face.", "The bruise on my arm hurts."], lesson: 6 },
  { word: "cast", phonetic: "/ kæst /", pos: "n.", definition: "a hard cover put on a broken arm or leg", examples: ["He has his leg in a cast.", "The cast stays for six weeks."], lesson: 6 },
  { word: "plaster", phonetic: "/ ˈplæstər /", pos: "n.", definition: "a small sticky cover for a small cut or wound", examples: ["Put a plaster on the wound.", "Stick the plaster on your finger."], lesson: 6 },
  { word: "scar", phonetic: "/ skɑːr /", pos: "n.", definition: "a mark left on the skin after a wound heals", examples: ["She has a scar on her face.", "The scar is from an old cut."], lesson: 6 },
  { word: "twist", phonetic: "/ twɪst /", pos: "v.", definition: "to turn something or part of your body too far and hurt it", examples: ["I twisted my ankle last winter.", "Be careful not to twist your knee."], lesson: 6 },
  { word: "wound", phonetic: "/ waʊnd /", pos: "n.", definition: "an injury where the skin is cut or broken", examples: ["Put a plaster on the wound.", "The wound took months to heal."], lesson: 6 },
  { word: "first aid", phonetic: "/ fɜːrst eɪd /", pos: "n.", definition: "simple medical help given before a doctor comes", examples: ["We attended first aid classes.", "Give the injured first aid."], lesson: 6 },
  { word: "ankle", phonetic: "/ ˈæŋkl /", pos: "n.", definition: "the joint between your leg and your foot", examples: ["She twisted her ankle.", "My ankle hurts a lot."], lesson: 6 },
];
