import type { DictEntry } from "../types";

/**
 * دیکشنری انگلیسی به انگلیسی جزوه هفتم — واژگان کلیدی ستاره‌دار هر درس
 * (تلفظ، نوع، تعریف انگلیسی ساده و دو مثال) بر اساس مرور صفحات ۴۱-۴۲ و
 * واژگان درس‌های ۱ تا ۸ (صفحات ۴۳، ۵۱، ۵۷، ۶۶، ۷۶، ۸۵، ۹۱ و ۹۸ جزوه).
 */
export const DICTIONARY: DictEntry[] = [
  // ─── درس ۰ — مرور واژگان قبل از درس اول ───
  { word: "welcome", phonetic: "/ ˈwelkəm /", pos: "v.", definition: "to say hello to someone in a friendly way when they arrive", examples: ["Welcome to our school.", "They welcome the new student."], lesson: 0 },
  { word: "classroom", phonetic: "/ ˈklæsruːm /", pos: "n.", definition: "a room in a school where students sit and learn", examples: ["Our classroom is big and clean.", "The students sit in the classroom."], lesson: 0 },
  { word: "blackboard", phonetic: "/ ˈblækbɔːrd /", pos: "n.", definition: "a dark board in the classroom that the teacher writes on", examples: ["The teacher writes new words on the blackboard.", "Please look at the blackboard."], lesson: 0 },
  { word: "notebook", phonetic: "/ ˈnoʊtbʊk /", pos: "n.", definition: "a small book for writing your notes and homework", examples: ["I write new words in my notebook.", "She puts her notebook in her backpack."], lesson: 0 },
  { word: "backpack", phonetic: "/ ˈbækpæk /", pos: "n.", definition: "a bag that you carry on your back for school things", examples: ["My backpack is heavy today.", "Ali has a new blue backpack."], lesson: 0 },
  { word: "eraser", phonetic: "/ ɪˈreɪzər /", pos: "n.", definition: "a small thing you use to remove pencil marks from paper", examples: ["May I borrow your eraser, please?", "This white eraser is mine."], lesson: 0 },
  { word: "dictionary", phonetic: "/ ˈdɪkʃəneri /", pos: "n.", definition: "a book that explains the meaning of words", examples: ["Look up the new word in a dictionary.", "My English dictionary helps me a lot."], lesson: 0 },

  // ─── درس ۱ — Greetings ───
  { word: "greeting", phonetic: "/ ˈɡriːtɪŋ /", pos: "n.", definition: "something you say or do to say hello to people", examples: ["'Hello' and 'Hi' are common greetings.", "'Good morning' is a friendly greeting."], lesson: 1 },
  { word: "teacher", phonetic: "/ ˈtiːtʃər /", pos: "n.", definition: "a person who teaches students at a school", examples: ["Our English teacher is very kind.", "The teacher writes on the blackboard."], lesson: 1 },
  { word: "student", phonetic: "/ ˈstuːdnt /", pos: "n.", definition: "a person who studies at a school or university", examples: ["There are twenty students in my class.", "She is a good student."], lesson: 1 },
  { word: "spell", phonetic: "/ spel /", pos: "v.", definition: "to say or write the letters of a word one by one", examples: ["How do you spell 'apple'?", "Spell your first name, please."], lesson: 1 },
  { word: "answer", phonetic: "/ ˈænsər /", pos: "v.", definition: "to say or write something back when someone asks you", examples: ["Answer the question in English, please.", "I know the answer to this question."], lesson: 1 },
  { word: "grade", phonetic: "/ ɡreɪd /", pos: "n.", definition: "a level of school, or a mark that shows how good your work is", examples: ["My brother is in grade seven.", "She got a good grade in English."], lesson: 1 },
  { word: "Excuse me", phonetic: "/ ɪkˈskjuːz mi /", pos: "phr.", definition: "a polite phrase you say to get attention or to say sorry", examples: ["Excuse me, what's your name?", "Excuse me, teacher, may I come in?"], lesson: 1 },

  // ─── درس ۲ — My Classmates ───
  { word: "classmate", phonetic: "/ ˈklæsmeɪt /", pos: "n.", definition: "a student who is in the same class as you", examples: ["Erfan is our new classmate.", "I play with my classmates after class."], lesson: 2 },
  { word: "librarian", phonetic: "/ laɪˈbreriən /", pos: "n.", definition: "a person whose job is to work in a library", examples: ["The librarian gives me a library card.", "You can ask the librarian for help."], lesson: 2 },
  { word: "library", phonetic: "/ ˈlaɪbreri /", pos: "n.", definition: "a place with many books that you can read or borrow", examples: ["We read books in the school library.", "The library is quiet in the morning."], lesson: 2 },
  { word: "introduce", phonetic: "/ ˌɪntrəˈduːs /", pos: "v.", definition: "to tell someone another person's name for the first time", examples: ["Let me introduce my friend Ali.", "She introduces her brother to the teacher."], lesson: 2 },
  { word: "practice", phonetic: "/ ˈpræktɪs /", pos: "v.", definition: "to do something again and again to become better at it", examples: ["Practice English every day.", "We practice conversations in pairs."], lesson: 2 },
  { word: "sure", phonetic: "/ ʃʊr /", pos: "adv.", definition: "yes, of course; not having any doubt", examples: ["'Can I help you?' — 'Sure!'", "I'm sure he is at home now."], lesson: 2 },

  // ─── درس ۳ — My Birthday ───
  { word: "birthday", phonetic: "/ ˈbɜːrθdeɪ /", pos: "n.", definition: "the day of the year when you were born", examples: ["Happy birthday to you!", "Her birthday is in Mehr."], lesson: 3 },
  { word: "age", phonetic: "/ eɪdʒ /", pos: "n.", definition: "the number of years a person has lived", examples: ["What's your age? — I'm 12.", "The two boys are the same age."], lesson: 3 },
  { word: "month", phonetic: "/ mʌnθ /", pos: "n.", definition: "one of the twelve parts of a year", examples: ["A year has twelve months.", "Farvardin is the first month of the year."], lesson: 3 },
  { word: "week", phonetic: "/ wiːk /", pos: "n.", definition: "a period of seven days", examples: ["There are seven days in a week.", "We go to school five days a week."], lesson: 3 },
  { word: "kind", phonetic: "/ kaɪnd /", pos: "adj.", definition: "friendly, generous, and caring about other people", examples: ["She is kind to everyone.", "A kind man helps old people."], lesson: 3 },
  { word: "dentist", phonetic: "/ ˈdentɪst /", pos: "n.", definition: "a doctor who takes care of your teeth", examples: ["My tooth hurts, so I go to the dentist.", "The dentist works in a small clinic."], lesson: 3 },

  // ─── درس ۴ — My Family ───
  { word: "family", phonetic: "/ ˈfæməli /", pos: "n.", definition: "a group of people who are related, like parents and children", examples: ["There are five people in my family.", "My family lives in Tabriz."], lesson: 4 },
  { word: "member", phonetic: "/ ˈmembər /", pos: "n.", definition: "a person who belongs to a group", examples: ["There are four members in my family.", "She is a member of the school team."], lesson: 4 },
  { word: "grandfather", phonetic: "/ ˈɡrænfɑːðər /", pos: "n.", definition: "the father of your mother or your father", examples: ["My grandfather is seventy years old.", "I visit my grandfather on Fridays."], lesson: 4 },
  { word: "housewife", phonetic: "/ ˈhaʊswaɪf /", pos: "n.", definition: "a woman who works at home and takes care of her family", examples: ["My mother is a housewife.", "The housewife cooks delicious food."], lesson: 4 },
  { word: "engineer", phonetic: "/ ˌendʒɪˈnɪr /", pos: "n.", definition: "a person who designs and builds machines, buildings or roads", examples: ["My uncle is an engineer.", "The engineer works in a big company."], lesson: 4 },
  { word: "mechanic", phonetic: "/ məˈkænɪk /", pos: "n.", definition: "a person whose job is to repair cars and machines", examples: ["The mechanic fixes our car.", "Ali's brother is a good mechanic."], lesson: 4 },

  // ─── درس ۵ — Appearance ───
  { word: "appearance", phonetic: "/ əˈpɪrəns /", pos: "n.", definition: "the way a person or a thing looks", examples: ["We can describe people's appearance.", "Her appearance is neat and clean."], lesson: 5 },
  { word: "tall", phonetic: "/ tɔːl /", pos: "adj.", definition: "having a big height; not short", examples: ["My brother is tall.", "That tall boy plays basketball."], lesson: 5 },
  { word: "wear", phonetic: "/ wer /", pos: "v.", definition: "to have clothes, shoes or glasses on your body", examples: ["She wears a scarf at school.", "What do you wear in winter?"], lesson: 5 },
  { word: "manteau", phonetic: "/ mænˈtoʊ /", pos: "n.", definition: "a long coat that Iranian women wear over their clothes", examples: ["My sister wears a green manteau.", "Iranian girls wear manteaus at school."], lesson: 5 },
  { word: "chador", phonetic: "/ tʃəˈdɔːr /", pos: "n.", definition: "a long cloth that some Iranian women wear over the head and body", examples: ["My grandmother wears a chador.", "Some women wear a black chador."], lesson: 5 },
  { word: "scarf", phonetic: "/ skɑːrf /", pos: "n.", definition: "a piece of cloth that you wear on your head or neck", examples: ["She has a beautiful scarf.", "Many women wear scarves in Iran."], lesson: 5 },
  { word: "airport", phonetic: "/ ˈeərpɔːrt /", pos: "n.", definition: "a place where planes take off and land", examples: ["We meet our guests at the airport.", "The plane lands at the airport."], lesson: 5 },

  // ─── درس ۶ — My House ───
  { word: "kitchen", phonetic: "/ ˈkɪtʃən /", pos: "n.", definition: "the room where you cook food", examples: ["Mom is cooking in the kitchen.", "Our kitchen is small but clean."], lesson: 6 },
  { word: "bedroom", phonetic: "/ ˈbedruːm /", pos: "n.", definition: "the room where you sleep", examples: ["I study in my bedroom.", "There are two bedrooms in our house."], lesson: 6 },
  { word: "hungry", phonetic: "/ ˈhʌŋɡri /", pos: "adj.", definition: "feeling that you want to eat", examples: ["I'm hungry; let's eat lunch.", "The children are hungry after school."], lesson: 6 },
  { word: "thirsty", phonetic: "/ ˈθɜːrsti /", pos: "adj.", definition: "feeling that you want to drink", examples: ["I'm thirsty; I need some water.", "After football, he is hot and thirsty."], lesson: 6 },
  { word: "fix", phonetic: "/ fɪks /", pos: "v.", definition: "to repair something that is broken", examples: ["Dad fixes the car in the garage.", "Can you fix my bike, please?"], lesson: 6 },
  { word: "famous", phonetic: "/ ˈfeɪməs /", pos: "adj.", definition: "known by many people", examples: ["Isfahan is a famous city in Iran.", "Hafez is a famous Iranian poet."], lesson: 6 },

  // ─── درس ۷ — Address & Contact ───
  { word: "address", phonetic: "/ əˈdres /", pos: "n.", definition: "the place where you live, with the name of the street and city", examples: ["What's your address?", "Write your address on the form, please."], lesson: 7 },
  { word: "mobile", phonetic: "/ ˈmoʊbaɪl /", pos: "n.", definition: "a small phone that you carry with you", examples: ["Call me on my mobile.", "My mobile number is new."], lesson: 7 },
  { word: "information", phonetic: "/ ˌɪnfərˈmeɪʃn /", pos: "n.", definition: "facts that tell you about someone or something", examples: ["Give your information to the clerk.", "This book has good information about Iran."], lesson: 7 },
  { word: "metro", phonetic: "/ ˈmetroʊ /", pos: "n.", definition: "an underground train that travels in a big city", examples: ["We go to school by metro.", "The metro station is near our house."], lesson: 7 },
  { word: "visit", phonetic: "/ ˈvɪzɪt /", pos: "v.", definition: "to go and see a person or a place", examples: ["We visit our grandmother on Fridays.", "Tourists visit Persepolis every year."], lesson: 7 },
  { word: "before", phonetic: "/ bɪˈfɔːr /", pos: "prep.", definition: "earlier than something or someone", examples: ["Wash your hands before lunch.", "I do my homework before dinner."], lesson: 7 },
  { word: "after", phonetic: "/ ˈæftər /", pos: "prep.", definition: "later than something or someone", examples: ["We play football after school.", "After dinner, I watch TV."], lesson: 7 },

  // ─── درس ۸ — Food & Health ───
  { word: "favorite", phonetic: "/ ˈfeɪvərɪt /", pos: "adj.", definition: "the one that you like more than all the others", examples: ["What's your favorite food?", "My favorite fruit is pineapple."], lesson: 8 },
  { word: "suggest", phonetic: "/ səˈdʒest /", pos: "v.", definition: "to tell people your idea about what they should do", examples: ["What food do you suggest for lunch?", "I suggest tea with honey."], lesson: 8 },
  { word: "healthy", phonetic: "/ ˈhelθi /", pos: "adj.", definition: "strong and well; good for your body", examples: ["Fruit and vegetables are healthy food.", "Breakfast keeps you healthy."], lesson: 8 },
  { word: "strong", phonetic: "/ strɔːŋ /", pos: "adj.", definition: "having a lot of power; not weak", examples: ["Milk makes your bones strong.", "My father is tall and strong."], lesson: 8 },
  { word: "enough", phonetic: "/ ɪˈnʌf /", pos: "adj.", definition: "as much as you need; not less and not more", examples: ["We have enough food for dinner.", "Is there enough milk in the fridge?"], lesson: 8 },
  { word: "coconut", phonetic: "/ ˈkoʊkənʌt /", pos: "n.", definition: "a large brown fruit with white flesh and sweet water inside", examples: ["I like coconut in my cake.", "Coconut water is sweet."], lesson: 8 },
  { word: "pineapple", phonetic: "/ ˈpaɪnæpl /", pos: "n.", definition: "a big sweet fruit with yellow flesh and green leaves on top", examples: ["Pineapple is my favorite fruit.", "This pineapple juice is delicious."], lesson: 8 },
];
