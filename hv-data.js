// Real Holiday Village facts for the test site, from the December 2026 Villager and holidayvillage55.com.
// The search box, the question buttons and "Coming up" all read from here, so a fact is written once.
const U = 'https://holidayvillage55.com/wp-content/uploads/';
const VILLAGER = { month: 'December 2026', href: U + '2026/11/December-2026-compressed-pdfa-3b.pdf' };

// d: the day it happens (or the last day, for drives). Sorted by date.
const EVENTS = [
  { d: '2026-12-01', t: 'Bingo night', when: 'First ball at 7 p.m.', where: 'Clubhouse', what: '$5 gets you 2 cards and 3 specials. 50/50 drawing and refreshments.', chip: ['pay', '$5 at the door'], join: 'No sign-up needed.' },
  { d: '2026-12-08', t: 'Books & Friends holiday party', when: '7 p.m.', where: 'Clubhouse', what: 'The Evening Book Club picks its 2027 books and plays book trivia. New readers welcome.', chip: ['', 'Free, just come'], join: '' },
  { d: '2026-12-08', t: 'Sign-up for Game Show trivia night', when: '6 to 7 p.m.', where: 'Clubhouse', what: 'Put your name down for the January 9 trivia night. 120 seats.', chip: ['', 'Sign-up night'], join: 'Guests $5, paid at sign-up.' },
  { d: '2026-12-10', t: 'Last day for Toys for Tots', when: 'Any time the clubhouse is open', where: 'Box by the Clubhouse lobby', what: 'New, unwrapped toys for children up to 12.', chip: ['give', 'Drop off'], join: '' },
  { d: '2026-12-15', t: 'Learn CPR: save a life', when: '4 p.m. or 6 p.m.', where: 'Clubhouse', what: 'A short Health & Welfare Committee class. Space is limited.', chip: ['', 'Sign up'], join: 'Sheet is in the Clubhouse.' },
  { d: '2026-12-18', t: "Women's Craft Group: build a snowman", when: '11 a.m.', where: 'Clubhouse', what: 'A winter craft morning. You get a list of what to bring.', chip: ['', 'Tell the group'], join: 'The office can pass on your name.' },
  { d: '2027-01-09', t: 'Game Show trivia night', when: '6:30 to 9 p.m.', where: 'Clubhouse', what: 'A real game show: 7 games, cash prizes, light snacks.', chip: ['', 'Free for residents'], join: 'Sign-up was Dec 8. Ask the office about seats.' },
  { d: '2027-01-12', t: 'Sign-up for pizza and dessert night', when: '6 to 7 p.m.', where: 'Clubhouse', what: 'For the February 6 night. $25 per person, checks to HVSC.', chip: ['pay', '$25'], join: '' },
  { d: '2027-02-06', t: 'Pizza and dessert night', when: '6 to 9 p.m.', where: 'Clubhouse', what: 'Pizza, dessert, soda and coffee. 50/50 drawing.', chip: ['pay', '$25 per person'], join: 'Sign up Jan 12.' },
];
const WEEKLY = [
  { day: 1, t: 'Chair yoga', when: '11:15 a.m.', where: 'Clubhouse' },
  { day: 3, t: 'Chair yoga', when: '9:30 a.m.', where: 'Clubhouse' },
];

// Everyday answers. "w" holds the other words people might type for the same thing.
const ANSWERS = [
  { id: 'trash', q: 'When does my trash go out?', w: 'trash garbage rubbish recycling recycle bins cans pickup collection tuesday bulk furniture',
    a: '<p><b>Trash: every Tuesday. Recycling: every other Tuesday.</b></p><p>Put cans at the curb after 4 p.m. the night before, and bring them in by the end of the day. Furniture and bedding can go out with regular trash.</p>',
    go: ['forms.html#trash', 'More about trash and recycling'] },
  { id: 'events', q: "What's on this week?", w: 'events whats on happening calendar activities this week today party bingo trivia club',
    a: 'EVENTS', go: ['whats-on.html', 'See everything that is on'] },
  { id: 'villager', q: "Where's this month's newsletter?", w: 'newsletter villager news magazine monthly paper read',
    a: `<p>The ${VILLAGER.month} Villager is out. It opens as a file your browser shows; there is nothing to install.</p>`,
    go: [VILLAGER.href, `Read the ${VILLAGER.month} Villager`] },
  { id: 'hours', q: 'When are the office and clubhouse open?', w: 'hours open opening office clubhouse times closed fob key',
    a: '<p><b>Office:</b> Monday, Tuesday, Wednesday and Friday 9 a.m. to 3 p.m., Thursday 9 a.m. to 4 p.m. Appointments by request.</p><p><b>Clubhouse:</b> every day, 6 a.m. to 11 p.m., with your key fob.</p>',
    go: ['contact.html', 'How to reach the office'] },
  { id: 'call', q: 'Who do I call?', w: 'call phone number contact office help condo associa township emergency 911 who',
    a: '<p><b>Most things:</b> the village office, <a href="tel:+18568661753">(856) 866-1753</a>.</p><p><b>Condo fees or your building:</b> Associa condo office, <a href="tel:+18888848490">888-884-8490</a>.</p><p><b>Street plowing:</b> Mount Laurel Public Works, <a href="tel:+18562342070">856-234-2070</a>.</p><p><b>Emergency:</b> 911.</p>',
    go: ['contact.html', 'Send the office a message'] },
  { id: 'snow', q: 'What happens when it snows?', w: 'snow plow plowing ice salt winter storm shovel driveway',
    a: '<p>After 3 inches or more, the village contractor clears driveways, aprons, walkways and sidewalks of single-family and court homes, within about two hours of the storm ending.</p><p>Ice is yours: use calcium chloride, not rock salt. Don\'t park at the clubhouse or on your lawn during a storm.</p>',
    go: ['news.html#latest', 'Read the full snow plan'] },
  { id: 'forms', q: 'I need a form', w: 'form forms application arb architectural change outside home fence patio census paperwork',
    a: `<p><b>Changing the outside of your home?</b> Use the Architectural Review Board application: <a href="${U}2025/10/ARB-Interactive_Application-2025.pdf">fill it in on screen</a> or <a href="${U}2025/09/ARB-Application-2025.pdf">print it</a>.</p><p><b>Census form:</b> <a href="${U}2025/10/Census-2025-Form-For-Newsletter.docx">open it</a>.</p>`,
    go: ['forms.html', 'See every form and rule'] },
  { id: 'pool', q: 'Can I bring a guest to the pool?', w: 'pool swim swimming guest guests visitor family grandchildren rules',
    a: '<p><b>Yes, as long as you are there with them.</b> A resident must be present with guests at all the amenities.</p>',
    go: [U + '2023/07/2023-Pool-Rules.pdf', 'Read the pool rules'] },
  { id: 'rules', q: 'Where are the rules?', w: 'rules regulations bylaws handbook clubhouse billiard shuffleboard community center policy',
    a: '<p>Every rule is on one page, with a search box: the pool, the clubhouse, billiards, shuffleboard, outside changes to your home, and the bylaws. Condo rules are on TownSq, the condo app.</p>',
    go: ['forms.html#rules', 'See the rules'] },
  { id: 'fees', q: 'My condo fees', w: 'fee fees hoa dues payment pay ach automatic late condo money',
    a: '<p>New condo fees start in January. Check you are paying the new amount. Automatic payment from your bank stops late fees; the form is on TownSq, or ask the Associa condo office at <a href="tel:+18888848490">888-884-8490</a>.</p>',
    go: ['news.html#latest', 'Read the condo news'] },
  { id: 'board', q: 'When does the Board meet?', w: 'board trustees meeting meetings minutes notes president election vote governance',
    a: '<p>Open meetings are usually on the second and fourth Tuesday of the month. Any resident may attend. The office can confirm the next date and time.</p>',
    go: ['board.html', 'See the Board and meeting notes'] },
  { id: 'myinfo', q: 'Change my phone or email', w: 'change update phone email address details profile account login password sign in my info',
    a: '<p>Sign in to My Info and press Change next to the line that is out of date. No sign-in yet, or forgot your password? Call the office and they will set it up with you on the phone.</p>',
    go: ['my-info.html', 'Go to My Info'] },
  { id: 'join', q: 'How do I join a club?', w: 'club clubs join committee volunteer book craft yoga travel social help',
    a: '<p>Just turn up, or call the office and they will pass your name on. Right now the Architectural Review Board and The Villager both need volunteers.</p>',
    go: ['whats-on.html#clubs', 'Meet the clubs'] },
  { id: 'new', q: "I've just moved in", w: 'new moved moving welcome newcomer start first settle',
    a: '<p>Welcome! There are six simple steps to feeling at home, starting with a hello at the office.</p>',
    go: ['new-here.html', 'Show me the six steps'] },
];
