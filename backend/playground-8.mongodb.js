// Create (or switch to) database
use("serviceFinder");

db.services.drop ();

// Create the services collection 78 services
db.createCollection("services", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "category", "location", "contact"],
      properties: {
        name: { bsonType: "string" },
        description: { bsonType: "string" },
        category: {
          bsonType: "array",
          items: { bsonType: "string" },
          description: "Category of service, one service could fall under multiple categories"
        },
        location: {
          bsonType: "object",
          required: ["district", "area"],
          properties: {
            district: { bsonType: "string" },
            area: { bsonType: "string" }
          }
        },
        contact: {
          bsonType: "object",
          required: ["phone"],
          properties: {
            phone: { bsonType: "string" },
          }
        },
        priceRange: { bsonType: "string" },
        rating: {
          bsonType: "object",
          properties: {
            average: { bsonType: "double", minimum: 0, maximum: 5 },
            count: { bsonType: "int", minimum: 0 }
          }
        },
        socials: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["platform", "url"],
            properties: {
              platform: {
                bsonType: "string",
                description: "Name of the social media platform"
              },
              url: {
                bsonType: "string",
                description: "Link to the social profile"
              }
            }
          }
        },
        createdAt: { bsonType: "date" }
      }
    }
  }
});

//data insertion

db.services.insertMany([
  {
    name: "Tshaby essentials",
    category: ["Braider", "Nails"],
    description: "Do your nails while getting your hair braided.",
    location: { district: "Maseru", area: "Roma, U-save complex" },
    contact: { phone: "+266 63412941" },
    priceRange: "M100 - M300",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/18YaJ5io12/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/tshaby_essentials?igsh=MTg2ajUzem1xY2FoOQ==" }
    ],
    createdAt: new Date()
  },
  {
    name: "Phomolo Beauty Showroom",
    category: ["Braider", "Wigs", "Nails", "Makeup"],
    description: "Beauty is our Duty.",
    location: { district: "Maseru", area: "88 building, room 3" },
    contact: { phone: "+266 57718822" },
    priceRange: "M80 - M400",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1AvRaBwA9q/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://instagram.com/example" }
    ],
    createdAt: new Date()
  },
  {
    name: "Poolie Phohleli",
    category: ["Nails", "Makeup"],
    description: "Makeup for all occassions and nails to go with.",
    location: { district: "Maseru", area: "NRH mall top floor room 2" },
    contact: { phone: "+266 63120547" },
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://facebook.com/pulane.phohleli" },
      { "platform": "instagram", "url": "https://www.instagram.com/flexi_collections?igsh=a2pxajVzdDNvbHJq" }
    ],
    createdAt: new Date()
  },
  {
    name: "Sweet treat nails",
    category: ["Nails"],
    description: "Gel nails.",
    location: { district: "Berea", area: "Lekhaloaneng" },
    contact: { phone: "+266 53831484" },
    priceRange: "M100 - M150",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/18UJgATZxx/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Blessing beauty hub",
    category: ["Braider"],
    description: "Re etsa moriri ebile re u ruta ho loha.",
    location: { district: "Mohale's Hoek", area: "Motse mocha, pela Likoena High School" },
    contact: { phone: "+266 58142443" },
    priceRange: "M100 - M250",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1B3ZniHbX5/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },

  {
    name: "The Gift Gods",
    category: ["Wigs"],
    description: "The hair that keeps giving.",
    location: { district: "Maseru", area: "Kingsway Mall" },
    contact: { phone: "+266 50895851" },
    priceRange: "M300 - M500",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1KsLK9FBX2/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/thegiftgods.ls?igsh=MWhidGQ1Y2hoeGluNQ==" }
    ],
    createdAt: new Date()
  },
  {
    name: "Musef sneakers cleaning clinic",
    category: ["Sneaker cleaning"],
    description: "Drop off or get your sneakers picked up for a cleaning.",
    location: { district: "Maseru", area: "Ha-Thetsane" },
    contact: { phone: "+266 58107961" },
    priceRange: "M60/pair",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/hubolieta?mibextid=wwXIfr&mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/musef_sneaker_cleaning_clinic?igsh=MWxtYThycndxdTYwdQ==" }
    ],
    createdAt: new Date()
  },
  {
    name: "Tsamaea Laundry",
    category: ["Laundry"],
    description: "Drop off or get your clothes picked up for a cleaning.",
    location: { district: "Maseru", area: "Ha-Thetsane" },
    contact: { phone: "+266 62696758" },
    priceRange: "M250",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1LVNmw8ow7/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/tsamaealaundry?igsh=MWt6b3p2a2lzemMxaw==" }
    ],
    createdAt: new Date()
  },
  {
    name: "Titan Lens Photography",
    category: ["Photographer"],
    description: "Professional grade photography and videography.",
    location: { district: "Maseru", area: "Maseru" },
    contact: { phone: "+266 58929317" },
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1CYKEqbJsf/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/titanlens?igsh=NTgzdTBzbHgza3I4" }
    ],
    createdAt: new Date()
  },
  {
    name: "Barber Di Studio",
    category: ["Barber"],
    description: "Beard grooming, haircuts and hair treatments.",
    location: { district: "Maseru", area: "Katlehong" },
    contact: { phone: "N/A" },
    priceRange: "M70 - M450",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/vixonton.sebonyane" },
      { "platform": "instagram", "url": "https://www.instagram.com/ls_barber_di?igsh=MWNzMzg1ZDkyaTJydA==" }
    ],
    createdAt: new Date()
  },
  {
    name: "My Secret Drawer",
    category: ["Wigs", "Makeup"],
    description: "Buy a wig, install a wig or get your facebeat.",
    location: { district: "Maseru", area: "Sea Point, Africa one" },
    contact: { phone: "+266 63856087" },
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/18yzYyAC6d/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/mysecretdrawerhair?igsh=a3U5YzhnZWdveHdx" }
    ],
    createdAt: new Date()
  },
  {
    name: "Victoria's blinky lashes",
    category: ["Lash tech"],
    description: "Your number one lash technician in town.",
    location: { district: "Maseru", area: "Temong" },
    contact: { phone: "+266 57372961" },
    priceRange: "M400 - M700",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/18RtdZQb4h/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/victoriasblinkylash?igsh=OGplMWJmN2JsMXB5" }
    ],
    createdAt: new Date()
  },
  {
    name: "Coach Palesa",
    category: ["Personal Trainer"],
    description: "Herbalife certified wellness coach.",
    location: { district: "Maseru", area: "Ha-Thetsane" },
    contact: { phone: "+27 638137427" },
    priceRange: "M150 - M400",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/profile.php?id=61561158243492&mibextid=wwXIfr&mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/_francisca.mareka?igsh=cjY5cDI3bnR6NXBu" }
    ],
    createdAt: new Date()
  },
  {
    name: "Barali Studios",
    category: ["Nails"],
    description: "Your go-to nail tech in the heart of Maseru.",
    location: { district: "Maseru", area: "Tradorette building" },
    contact: { phone: "+266 58774199" },
    priceRange: "M200 - M700",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/18XaEph7BW/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/boitumeloponoane?igsh=MXRuaTdmZ3V5OGJwNA==" }
    ],
    createdAt: new Date()
  },
  {
    name: "Beauty by Mabongi",
    category: ["Makeup"],
    description: "Your go-to makeup artist in Maftown.",
    location: { district: "Mafeteng", area: "Town centre" },
    contact: { phone: "N/A" },
    priceRange: "M200 - M700",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  }
]);


db.services.insertMany([
  {
    name: "Ntsoaki Moremoholo",
    category: ["Nails"],
    description: "Available for all your nail and hair installation needs.",
    location: { district: "Mafeteng", area: "Town centre" },
    contact: { phone: "+266 56224176" },
    priceRange: "M200 - M700",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1JSmkQznFT/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Mathabiso",
    category: ["Braider"],
    description: "Available for all your braiding needs.",
    location: { district: "Mafeteng", area: "Town centre" },
    contact: { phone: "+266 59621107" },
    priceRange: "M200 - M700",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Elite Blink ls",
    category: ["Lash tech"],
    description: "Your lash tech in downtown Maseru.",
    location: { district: "Maseru", area: "NRH Mall" },
    contact: { phone: "+266 53377475" },
    priceRange: "M250 - M500",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/profile.php?id=100092061740597&mibextid=wwXIfr&mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Seabata's Locs",
    category: ["Braider"],
    description: "For all your dreadlock needs .",
    location: { district: "Maseru", area: "Kingsway Mall" },
    contact: { phone: "+266 63219688" },
    priceRange: "M300 - M800",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Khahli's Hair Salon",
    category: ["Braider"],
    description: "From braid lines to box braids .",
    location: { district: "Maseru", area: "Fruits and veg mall" },
    contact: { phone: "+266 50488027" },
    priceRange: "M300 - M800",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "House of glam events and interior",
    category: ["Event planner"],
    description: "The ultimate style statement .",
    location: { district: "Maseru", area: "Maseru" },
    contact: { phone: "+266 63093475" },
    priceRange: "M300 - M800",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1AmAL4TC6e/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/house_of_glam_events?igsh=cTUwMzF6dXpveGU5" }
    ],
    createdAt: new Date()
  },
  {
    name: "Nailed by Anah",
    category: ["Nails", "Lash tech"], 
    description: "Mani-pedi and cluster lashes service .",
    location: { district: "Maseru", area: "Sefika complex" },
    contact: { phone: "+266 62580611" },
    priceRange: "M300 - M800",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1AjJvnFrb4/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Aggy Beauty Academy",
    category: ["Wigs"], 
    description: "Buy a wig from us and get free installation .",
    location: { district: "Maseru", area: "Old wool wagon building room 3" },
    contact: { phone: "+266 59091001" },
    priceRange: "M500 - M7000",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1L7vDB6tKX/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "NRH Beauty Parlour",
    category: ["Wigs", "Nails" , "Lash tech"],
    description: "We offer nail services and wig and lash installs .",
    location: { district: "Maseru", area: "NRH mall" },
    contact: { phone: "+266 58731734" },
    priceRange: "M70 - M400",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/18feznx9Nk/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Zenky's fashion&beauty",
    category: ["Makeup", "Nails" , "Lash tech"],
    description: "Makeup, nails and eyelash clusters .",
    location: { district: "Maseru", area: "Shoti building, opposite Lesotho High School" },
    contact: { phone: "+266 66106890" },
    priceRange: "M100 - M400",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1GeMRCGPPY/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Relebohile Seboka",
    category: ["Nails"],
    description: "Mobile nail tech offering house calls .",
    location: { district: "Maseru", area: "Ha-Thetsane" },
    contact: { phone: "+266 56712997" },
    priceRange: "M70 - M160",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1BAYNVx5xe/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  }
]);


db.services.insertMany([
  {
    name: "Mpolo Beauty Bar",
    category: ["Nails"],
    description: "Your favorite nail tech.",
    location: { district: "Mohale's Hoek", area: "Mohale's Hoek" },
    contact: { phone: "+27 637648445" },
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Roman Pictures",
    category: ["Photographer"],
    description: "Mobile photographer.",
    location: { district: "Quthing", area: "Quthing" },
    contact: { phone: "+266 56000643" },
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/profile.php?id=100065185192857&mibextid=wwXIfr&mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Delah Pictures",
    category: ["Photographer"],
    description: "Photoshoots around town.",
    location: { district: "Mohale's Hoek", area: "Mohale's Hoek" },
    contact: { phone: "+266 59432237"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Nokxie's Boutique",
    category: ["Event planner"],
    description: "Deco for all your events.",
    location: { district: "Berea", area: "Ha-Rasetimela" },
    contact: { phone: "+266 58070265"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1BKKciirk3/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Black Pearl Hair Salon",
    category: ["Braider", "Barber"],
    description: "Unisex hair salon.",
    location: { district: "Mohale's Hoek", area: "Red house, motse mocha" },
    contact: { phone: "+266 59588461"},
    priceRange: "M100 - M300",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Hair by Ntebo",
    category: ["Braider"],
    description: "Get all your braids from me.",
    location: { district: "Mohale's Hoek", area: "Mohale's Hoek" },
    contact: { phone: "N/A "},
    priceRange: "M150",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Matz Hair and Beauty",
    category: ["Wigs"],
    description: "Good quality hair delivered right to you.",
    location: { district: "Maseru", area: "Maseru" },
    contact: { phone: "+27 785482594 "},
    priceRange: "M1100 - M8000",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1ApGbzustY/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/matz_hair_and_beauty?igsh=aWV4bWVueTE0d203" }
    ],
    createdAt: new Date()
  },
  {
    name: "Keke's Hair",
    category: ["Braider"],
    description: "",
    location: { district: "Maseru", area: "Oxford building, room 10" },
    contact: { phone: "+266 59328125"},
    priceRange: "M150 - M300",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1KVokx3C78/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Limpho Pitse Mokubung",
    category: ["Braider"],
    description: "Available for house calls",
    location: { district: "Maseru", area: "Behind Econo" },
    contact: { phone: "+266 69305546"},
    priceRange: "M250 - M850",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1GREy8X6tz/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Grafa Beauty Salon",
    category: ["Lash tech" , " Braider", "Makeup", "Nails"],
    description: "Hairwash included with all hairstyles",
    location: { district: "Maseru", area: "Seipobi building" },
    contact: { phone: "+266 63145788"},
    priceRange: "MPrice is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/16u3npceht/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/grafa_beauty_salon?igsh=aWpwY2FydDdlaTQz" }
    ],
    createdAt: new Date()
  },
  {
    name: "Blush'N Glow With Amar'e",
    category: ["Makeup"],
    description: "Traveling makeup artist",
    location: { district: "Maseru", area: "Maseru" },
    contact: { phone: "+266 57979903"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1KcP1YJBrw/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/roux_pamel?igsh=aTAzdGd3ZjdrM2Zj" }
    ],
    createdAt: new Date()
  },
  {
    name: "The North Image Photography",
    category: ["Photographer"],
    description: "Studio shoots",
    location: { district: "Leribe", area: "Leribe" },
    contact: { phone: "+266 51983233"},
    priceRange: "M250 - M1500",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/17g5EbpgET/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Kissed By Tsoany",
    category: ["Makeup", "Wigs"],
    description: "Wig services and facebeats",
    location: { district: "Maseru", area: "Maseru East" },
    contact: { phone: "+266 58043424"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1DpsjDa5ma/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/kissedbytsoany?igsh=MWZkaDNleHNmaGZh" }
    ],
    createdAt: new Date()
  }
]);




db.services.insertMany([
  {
    name: "Lucy Mmamolemo",
    category: ["Braider"],
    description: "Essence and braiding",
    location: { district: "Thaba-Tseka", area: "Pela U-Save" },
    contact: { phone: "+266 59609638 "},
    priceRange: "M100 - M350",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/lucy.lucy.691196?mibextid=wwXIfr&mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Maletlotlo Koetle",
    category: ["Nails"],
    description: "",
    location: { district: "Thaba-Tseka", area: "Malaeneng kamora A2Z" },
    contact: { phone: "+266 62418170 "},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/mpapa.anacleda?mibextid=wwXIfr&mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Matsoso Photography",
    category: ["Photographer"],
    description: "Photo and video services",
    location: { district: "Maseru", area: "Maseru East" },
    contact: { phone: "+266 56272156 "},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1NjJ9g6Jec/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/matsoso_photography?igsh=aDZwdmFpNHd1bWJr" }
    ],
    createdAt: new Date()
  },
  {
    name: "Kat Khumalo",
    category: ["Tattoo and Piercings"],
    description: "New tattoos and tattoo cover-ups",
    location: { district: "Maseru", area: "Ha-Seoli" },
    contact: { phone: "+266 63603732"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1HbSoonThD/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Shekinah Hair and Beauty",
    category: ["Wigs", "Braider"],
    description: "",
    location: { district: "Maseru", area: "Olympic building" },
    contact: { phone: "+266 63335093 "},
    priceRange: "From M200",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/18jMgiP6Zf/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Beats By Lele",
    category: ["Makeup", "Wigs"],
    description: "Makeup and hair installations",
    location: { district: "Maseru", area: "Maseru" },
    contact: { phone: "+266 53962652"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1Gh46pxPfw/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/beats_by_lele_beauty_studio_?igsh=MWE2eHN3d2ttZDFndg==" }
    ],
    createdAt: new Date()
  },
  {
    name: "Ntebo Crowns",
    category: ["Wigs"],
    description: "Luxury human blend and synthetic wigs",
    location: { district: "Maseru", area: "Maseru" },
    contact: { phone: "+266 57087755"},
    priceRange: "M500 - M900",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/15k14z4rwuh/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Maps Beauty",
    category: ["Makeup", "Wigs"],
    description: "Hair and makeup",
    location: { district: "Maseru", area: "Sekamaneng" },
    contact: { phone: "+266 63105439 "},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1BLzERc2RV/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/maps_beauty_?igsh=YzViNXM5MXc3MWJ5" }
    ],
    createdAt: new Date()
  },
  {
    name: "Ntha Beauty Parlour",
    category: ["Makeup", "Lash tech", "Wigs"],
    description: "Own your glow",
    location: { district: "Maseru", area: "Fahida building" },
    contact: { phone: "+266 58562708"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/14ZAxpN1NFM/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Khosana Refiloe",
    category: ["Nails"],
    description: "Nail tech",
    location: { district: "Leribe", area: "Hlotse, above 225" },
    contact: { phone: "+266 69096690"},
    priceRange: "M120 - M200",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/18W6wWV5tC/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Pulane Rachele",
    category: ["Braider"],
    description: "Nail tech",
    location: { district: "Leribe", area: "Hlotse, above 225" },
    contact: { phone: "+266 57059944"},
    priceRange: "M120 - M200",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1CuMkcu8y7/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Likenkeng Ntisa",
    category:["Braider"],
    description: "Free hair wash for all styles",
    location: { district: "Butha-Buthe", area: "Ha-Kamoho" },
    contact: { phone: "+266 58358345 "},
    priceRange: "From M80",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1B8REy3ZmM/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Relebohile Rantemana",
    category: ["Braider", "Lash tech", "Nails"],
    description: "Free hair wash when you braid. M50 booking fee",
    location: { district: "Mohale's Hoek", area: "Opposite The ultimate lifestyle market" },
    contact: { phone: "+266 "},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/18ZmrwT5Rf/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  
  {
    name: "Ski DoSe",
    category: ["Braider"],
    description: "",
    location: { district: "Butha-Buthe", area: "Pela pep e ka tlase" },
    contact: { phone: "+266 56194784"},
    priceRange: "From M150",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Everything By Juju",
    category: ["Makeup"],
    description: "Makeup and gel hairstyles",
    location: { district: "Maseru", area: "Moshoeshoe II next to Domicilliary clinic" },
    contact: { phone: "+266 63481456"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1E6DmrAkMk/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/everything_by_juju_?igsh=YTlreGdzOGZsazJt" }
    ],
    createdAt: new Date()
  },
  {
    name: "Everything Hair",
    category: ["Braider"],
    description: "Braids and sew-ins",
    location: { district: "Maseru", area: "Maseru" },
    contact: { phone: "+266 63481456"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1AyT8WdBj9/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/everythinghair.beauty?igsh=MWI2Zm1sajlxMGV5MA==" }
    ],
    createdAt: new Date()
  },
  {
    name: "Mosa's Beauty Treats",
    category: ["Makeup", "Wigs"],
    description: "",
    location: { district: "Maseru", area: "Maseru" },
    contact: { phone: "+266 59822780"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1G6bAnBUwK/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Detail Gurus",
    category: ["Car wash"],
    description: "Mobile car wash ",
    location: { district: "Maseru", area: "Maseru" },
    contact: { phone: "+266 62001194"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1BFi5v2UD9/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Poppy Hair",
    category: ["Braider"],
    description: "Appointments only",
    location: { district: "Maseru", area: "Platinum building room 36" },
    contact: { phone: "+266 63196997"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Lebo's Beauty Parlor",
    category: ["Makeup"],
    description: "50% booking fee",
    location: { district: "Leribe", area: "Hlotse" },
    contact: { phone: "+266 50666299"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Braids by Bella",
    category: ["Braider"],
    description: "House calls available",
    location: { district: "Maseru", area: "Maseru" },
    contact: { phone: "+266 56978822"},
    priceRange: "From M120",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/18b7BUeMwR/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Sync Beauty Studio",
    category: ["Braider"],
    description: "Free Wi-Fi and hairwash",
    location: { district: "Maseru", area: "Sea Point, Africa One Complex" },
    contact: { phone: "+266 59373229"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/18LpiKRGDZ/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Touched By Her",
    category: ["Wigs"],
    description: "Buy a wig from us and get a discount on installation",
    location: { district: "Maseru", area: "NRH Mall" },
    contact: { phone: "+266 64096301"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1DJUik1rHv/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/__touchedbyher?igsh=Nms2MmNtcjlweDg3" }
    ],
    createdAt: new Date()
  },
  {
    name: "HerBeauty",
    category: ["Braider"],
    description: "",
    location: { district: "Maseru", area: "Bus stop, shoti building room 9" },
    contact: { phone: "+266 63188179"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/profile.php?id=100090800913356&mibextid=wwXIfr&mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Ledy Beauty Bar",
    category: ["Nails"],
    description: "M50 appointment fee required",
    location: { district: "Maseru", area: "Metcash building room 145D" },
    contact: { phone: "+266 62461094"},
    priceRange: "From M100",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1HZQZagnAP/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Wolf Og",
    category: ["Tattoo and Piercings"],
    description: "Tattoos and cover-ups",
    location: { district: "Maseru", area: "Maseru" },
    contact: { phone: "+266 63072378"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1CfPyfyBqB/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Uforia Inc",
    category: ["Tattoo and Piercings"],
    description: "Piercings and tattoos",
    location: { district: "Maseru", area: "Kingsway downtown" },
    contact: { phone: "+266 63071199"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/188Sokxznv/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/uforia_inc?igsh=Y3JhY3k5cmJpNmJm" }
    ],
    createdAt: new Date()
  },
  {
    name: "Tumi",
    category: ["Lash tech"],
    description: "",
    location: { district: "Leribe", area: "Maputsoe" },
    contact: { phone: "+266 50283909"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Kananelo",
    category: ["Makeup"],
    description: "",
    location: { district: "Leribe", area: "Maputsoe" },
    contact: { phone: "+266 57979903"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Mokanti",
    category: ["Braider"],
    description: "",
    location: { district: "Leribe", area: "Maputsoe" },
    contact: { phone: "+266 56886012"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Success Combined Salon",
    category: ["Braider"],
    description: "house calls available",
    location: { district: "Thaba-Tseka", area: "Thabong2" },
    contact: { phone: "+266 59660853"},
    priceRange: "M80 - M250",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1Dp6AgUHgD/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Aura and Alchemy Beauty Spa",
    category: ["Nails"],
    description: "affordable nails and nail training classes ",
    location: { district: "Maseru", area: "Old wool wargon building room 11" },
    contact: { phone: "+266 63723820"},
    priceRange: "M50 - M150",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/profile.php?id=61571422806129&mibextid=wwXIfr&mibextid=wwXIfr" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "TZ & E Seipobi Barber Shop",
    category: ["Barber"],
    description: "haircuts, hair dye, relaxer and unbraiding",
    location: { district: "Maseru", area: "Metcash complex room 132" },
    contact: { phone: "+266 62276395"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Full Beauty By Ceejay",
    category: ["Makeup", "Wigs"],
    description: "Get your makeup done and wig installed",
    location: { district: "Maseru", area: "Maseru" },
    contact: { phone: "+266 56974362"},
    priceRange: "M150 - M550",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1E8yNqS8u9/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://instagram.com/example" }
    ],
    createdAt: new Date()
  },
  {
    name: "Style Me Didie-Beauty",
    category: ["Lash tech", "Nails"],
    description: "Quality lashes and nails at an affordable price",
    location: { district: "Maseru", area: "NRH mall, room 6G" },
    contact: { phone: "+266 59352576"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1CcTV65mEQ/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://instagram.com/example" }
    ],
    createdAt: new Date()
  },
  {
    name: "Link Makeup",
    category: ["Makeup"],
    description: "Pro makeup artist",
    location: { district: "Maseru", area: "Maseru" },
    contact: { phone: "+266 53443025"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://facebook.com/LinkMakeup" },
      { "platform": "instagram", "url": "https://www.instagram.com/linkengm?igsh=YzJoenMxZzVpamlr" }
    ],
    createdAt: new Date()
  },
  {
    name: "The Owners Corner Lesotho",
    category: ["Makeup", "Braider", "Nails", "Lash tech", "Barber"],
    description: "All your beauty needs in one place",
    location: { district: "Maseru", area: "NRH mall" },
    contact: { phone: "+266 62121000"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://facebook.com/ownerscorner" },
      { "platform": "instagram", "url": "https://instagram.com/example" }
    ],
    createdAt: new Date()
  },
  {
    name: "Brow & Lash Bar",
    category: ["Lash tech"],
    description: "Realistic brows and lashes",
    location: { district: "Maseru", area: "Borokhoaneng, M&A business complex" },
    contact: { phone: "+266 56049111"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://facebook.com/BrowAndLashbarLS" },
      { "platform": "instagram", "url": "https://instagram.com/example" }
    ],
    createdAt: new Date()
  },
  {
    name: "Nail Nirvana",
    category: ["Nails"],
    description: "",
    location: { district: "Maseru", area: "Z&Z Centre room 3, behind oxford building" },
    contact: { phone: "+266 69375664"},
    priceRange: "M220",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://facebook.com/reitumetse.machache" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Zie Nailed It",
    category: ["Nails"],
    description: "",
    location: { district: "Maseru", area: "Ha-Leqele" },
    contact: { phone: "+266 62193662"},
    priceRange: "M220",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "https://www.instagram.com/zienailedit?igsh=cGx4NmlobjF0amV6" }
    ],
    createdAt: new Date()
  },
  {
    name: "Maryanne Makhubela",
    category: ["Makeup"],
    description: "Get your face beat by us",
    location: { district: "Maseru", area: "Maseru" },
    contact: { phone: "+266 57074285"},
    priceRange: "M250",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://facebook.com/maryanne.makhubela" },
      { "platform": "instagram", "url": "https://instagram.com/example" }
    ],
    createdAt: new Date()
  },
  {
    name: "The Owners Corner Lesotho",
    category: ["Makeup", "Braider", "Nails", "Lash tech", "Barber"],
    description: "Your go to place for all your beauty needs",
    location: { district: "Leribe", area: "Maputsoe, pele metropolitan opposite kfc" },
    contact: { phone: "+266 62121000"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/ownerscorner" },
      { "platform": "instagram", "url": "https://www.instagram.com/owners_corner_lesotho?igsh=MXdheWNnaWl5ZHptbw==" }
    ], 
    createdAt: new Date()
  },
  {
    name: "AlterEgo: Hair & Nails Beauty",
    category: ["Makeup", "Nails", "Wigs"],
    description: "The experts at taking care of your hair and nails",
    location: { district: "Maseru", area: "Fako street" },
    contact: { phone: "+266 59686894"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/AlterEgoBeautyLS" },
      { "platform": "instagram", "url": "https://instagram.com/example" }
    ],
    createdAt: new Date()
  },
  {
    name: "Phano Ea Bophelo",
    category: ["Braider", "Nails"],
    description: "Provides hair, nails, massages and facials",
    location: { district: "Maseru", area: "Khubetsoana" },
    contact: { phone: "+266 59102783"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/Phanoeabophelo" },
      { "platform": "instagram", "url": "https://www.instagram.com/phano_ea_bophelo?igsh=Yjhzd3c1Y2dmNmZn" }
    ],
    createdAt: new Date()
  },
  {
    name: "Khanya Beauty Studio",
    category: ["Makeup", "Wigs", "Lashes"],
    description: "",
    location: { district: "Maseru", area: "Maseru" },
    contact: { phone: "+266 56640973"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://www.facebook.com/share/1HNVRJ7eto/?mibextid=wwXIfr" },
      { "platform": "instagram", "url": "https://www.instagram.com/khanya_beauty_studio?igsh=N25sYnB0MHUwaWk0" }
    ],
    createdAt: new Date()
  },
  {
    name: "Chopho",
    category: ["Gardener"],
    description: "",
    location: { district: "Maseru", area: "Ha-Thetsane" },
    contact: { phone: "+266 57095020"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Kaerish Mohlokoane",
    category: ["Braider"],
    description: "Re ea loha ebile re u ruta ho loha",
    location: { district: "Maseru", area: "Ha-Makhalanyane Mochaochele complex" },
    contact: { phone: "+266 59379938"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://facebook.com/selloane.mohlokoane.16" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Khata Khotso",
    category: ["Nails"],
    description: "Manala a matle",
    location: { district: "Maseru", area: "Ha-Makhalanyane Mochaochele complex" },
    contact: { phone: "+266 57967745"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://facebook.com/khatakhotso" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  },
  {
    name: "Thuto Private Tutoring",
    category: ["Tutor"],
    description: "From primary to tertiary level tutoring services",
    location: { district: "Maseru", area: "Katlehong" },
    contact: { phone: "+266 67171592"},
    priceRange: "Price is N/A",
    rating: {
      "average": 4.5,
      "count": 120
    },
    socials: [
      { "platform": "facebook", "url": "https://facebook.com/" },
      { "platform": "instagram", "url": "" }
    ],
    createdAt: new Date()
  }
]);
