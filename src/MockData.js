const MockData = {
  users: [
    {
      _id: 1,
      name: "Waring Karlicek",
      email: "test@test.com",
      address: "5 Bashford Way",
      password: "Abc123*",
      phone_number: "745-688-7132",
      rol: "user",
      photo_url: "http://dummyimage.com/214x100.png/cc0000/ffffff",
    },
    {
      _id: 2,
      name: "Evelyn Lehon",
      email: "elehon1@cbslocal.com",
      address: "367 Manufacturers Court",
      password: "Py7jTK6u",
      phone_number: "866-727-1736",
      rol: "user",
      photo_url: "http://dummyimage.com/109x100.png/dddddd/000000",
    },
    {
      _id: 3,
      name: "Kameko Eddleston",
      email: "keddleston2@ft.com",
      address: "6 Ridgeway Drive",
      password: "2336mXbKU",
      phone_number: "501-525-7257",
      rol: "user",
      photo_url: "http://dummyimage.com/228x100.png/ff4444/ffffff",
    },
    {
      _id: 4,
      name: "Cortie Attle",
      email: "cattle3@nbcnews.com",
      address: "9 Merchant Crossing",
      password: "fUcGldCl",
      phone_number: "361-509-4278",
      rol: "user",
      photo_url: "http://dummyimage.com/216x100.png/cc0000/ffffff",
    },
    {
      _id: 5,
      name: "Benedetto Linke",
      email: "blinke4@oracle.com",
      address: "91 Burning Wood Junction",
      password: "wwANcGV",
      phone_number: "475-236-9631",
      rol: "user",
      photo_url: "http://dummyimage.com/193x100.png/cc0000/ffffff",
    },
  ],
  foundations: [
    {
      _id: 1,
      name: "Riffpath",
      email: "dbraganca0@un.org",
      address: "007 David Pass",
      password: "30NRklDn",
      phone_number: "235-262-2735",
      photo_url: "http://dummyimage.com/197x100.png/5fa2dd/ffffff",
    },
    {
      _id: 2,
      name: "Avamm",
      email: "relegood1@eepurl.com",
      address: "48469 Randy Plaza",
      password: "uxVyEwbeX58",
      phone_number: "582-369-8187",
      photo_url: "http://dummyimage.com/194x100.png/cc0000/ffffff",
    },
    {
      _id: 3,
      name: "Divape",
      email: "pdooman2@msu.edu",
      address: "2201 Milwaukee Park",
      password: "dgynklsu8",
      phone_number: "971-616-6430",
      photo_url: "http://dummyimage.com/182x100.png/ff4444/ffffff",
    },
    {
      _id: 4,
      name: "Brightdog",
      email: "bbacksal3@wiley.com",
      address: "66 Oxford Place",
      password: "WQzTuyaiMX",
      phone_number: "951-915-6585",
      photo_url: "http://dummyimage.com/239x100.png/ff4444/ffffff",
    },
    {
      _id: 5,
      name: "Bluejam",
      email: "mnowak4@google.cn",
      address: "54601 Badeau Street",
      password: "6tRzNkU5TV",
      phone_number: "918-429-1332",
      photo_url: "http://dummyimage.com/100x100.png/dddddd/000000",
    },
  ],
  pets: [
    {
      _id: 1,
      name: "contingency",
      description: "Organic heuristic solution",
      photo_url: "http://dummyimage.com/228x100.png/ff4444/ffffff",
      foundation_id: 1,
      adopted: true,
    },
    {
      _id: 2,
      name: "Open-architected",
      description: "Configurable bottom-line neural-net",
      photo_url: "http://dummyimage.com/179x100.png/dddddd/000000",
      foundation_id: 4,
      adopted: false,
    },
    {
      _id: 3,
      name: "matrices",
      description: "Expanded 6th generation website",
      photo_url: "http://dummyimage.com/198x100.png/ff4444/ffffff",
      foundation_id: 1,
      adopted: false,
    },
    {
      _id: 4,
      name: "firmware",
      description: "Diverse exuding methodology",
      photo_url: "http://dummyimage.com/194x100.png/5fa2dd/ffffff",
      foundation_id: 5,
      adopted: false,
    },
    {
      _id: 5,
      name: "Grass-roots",
      description: "Pre-emptive user-facing data-warehouse",
      photo_url: "http://dummyimage.com/119x100.png/cc0000/ffffff",
      foundation_id: 2,
      adopted: false,
    },
    {
      _id: 6,
      name: "Innovative",
      description: "Front-line context-sensitive product",
      photo_url: "http://dummyimage.com/141x100.png/cc0000/ffffff",
      foundation_id: 1,
      adopted: false,
    },
    {
      _id: 7,
      name: "Progressive",
      description: "Cross-platform interactive moderator",
      photo_url: "http://dummyimage.com/110x100.png/cc0000/ffffff",
      foundation_id: 1,
      adopted: true,
    },
    {
      _id: 8,
      name: "Open-architected",
      description: "Grass-roots 4th generation implementation",
      photo_url: "http://dummyimage.com/184x100.png/5fa2dd/ffffff",
      foundation_id: 4,
      adopted: false,
    },
    {
      _id: 9,
      name: "3rd generation",
      description: "Phased neutral database",
      photo_url: "http://dummyimage.com/135x100.png/ff4444/ffffff",
      foundation_id: 1,
      adopted: false,
    },
    {
      _id: 10,
      name: "value-added",
      description: "Total dedicated encoding",
      photo_url: "http://dummyimage.com/145x100.png/dddddd/000000",
      foundation_id: 2,
      adopted: false,
    },
    {
      _id: 11,
      name: "portal",
      description: "Devolved solution-oriented algorithm",
      photo_url: "http://dummyimage.com/131x100.png/5fa2dd/ffffff",
      foundation_id: 5,
      adopted: false,
    },
    {
      _id: 12,
      name: "fresh-thinking",
      description: "Switchable actuating task-force",
      photo_url: "http://dummyimage.com/101x100.png/ff4444/ffffff",
      foundation_id: 5,
      adopted: false,
    },
    {
      _id: 13,
      name: "paradigm",
      description: "Enhanced methodical synergy",
      photo_url: "http://dummyimage.com/110x100.png/cc0000/ffffff",
      foundation_id: 5,
      adopted: false,
    },
    {
      _id: 14,
      name: "approach",
      description: "Organized actuating frame",
      photo_url: "http://dummyimage.com/148x100.png/cc0000/ffffff",
      foundation_id: 1,
      adopted: false,
    },
    {
      _id: 15,
      name: "hybrid",
      description: "Sharable disintermediate system engine",
      photo_url: "http://dummyimage.com/242x100.png/dddddd/000000",
      foundation_id: 5,
      adopted: true,
    },
  ],
  adoptionRegistry: [
    {
      _id: 1,
      user_id: 4,
      pet_id: 3,
      description: "streamline proactive synergies",
      response_status: "approved",
    },
    {
      _id: 2,
      user_id: 3,
      pet_id: 1,
      description: "e-enable revolutionary experiences",
      response_status: "approved",
    },
    {
      _id: 3,
      user_id: 4,
      pet_id: 3,
      description: "disintermediate world-class platforms",
      response_status: "pending",
    },
    {
      _id: 4,
      user_id: 5,
      pet_id: 2,
      description: "seize granular eyeballs",
      response_status: "pending",
    },
    {
      _id: 5,
      user_id: 5,
      pet_id: 3,
      description: "strategize synergistic mindshare",
      response_status: "rejected",
    },
    {
      _id: 6,
      user_id: 5,
      pet_id: 1,
      description: "incentivize interactive functionalities",
      response_status: "rejected",
    },
    {
      _id: 7,
      user_id: 2,
      pet_id: 1,
      description: "seize innovative niches",
      response_status: "approved",
    },
    {
      _id: 8,
      user_id: 1,
      pet_id: 3,
      description: "synthesize collaborative e-business",
      response_status: "approved",
    },
    {
      _id: 9,
      user_id: 3,
      pet_id: 3,
      description: "revolutionize strategic e-services",
      response_status: "rejected",
    },
    {
      _id: 10,
      user_id: 3,
      pet_id: 1,
      description: "facilitate ubiquitous channels",
      response_status: "approved",
    },
    {
      _id: 11,
      user_id: 3,
      pet_id: 1,
      description: "harness back-end synergies",
      response_status: "rejected",
    },
    {
      _id: 12,
      user_id: 1,
      pet_id: 2,
      description: "revolutionize sexy paradigms",
      response_status: "pending",
    },
    {
      _id: 13,
      user_id: 5,
      pet_id: 1,
      description: "facilitate cross-platform architectures",
      response_status: "rejected",
    },
    {
      _id: 14,
      user_id: 5,
      pet_id: 2,
      description: "evolve interactive mindshare",
      response_status: "pending",
    },
    {
      _id: 15,
      user_id: 4,
      pet_id: 3,
      description: "target collaborative portals",
      response_status: "rejected",
    },
  ],
};

export default MockData;
