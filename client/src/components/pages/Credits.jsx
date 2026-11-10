// File -> client/src/components/pages/Credits.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Credits Page -> the source, author and licence of every photo, video and icon not made by me

// Photos and video -> what it is, who made it, the source link and the licence
const mediaCredits = [
  {
    item: "Bob (Staff Photo)",
    author: "Gustavo Fring",
    link: "https://www.pexels.com/photo/6870324/",
    licence: "Pexels",
  },
  {
    item: "Alice (Staff Photo)",
    author: "Zulfugar Karimov",
    link: "https://unsplash.com/@zulfugarkarimov",
    licence: "Unsplash",
  },
  {
    item: "James (Staff Photo)",
    author: "Artem Podrez",
    link: "https://www.pexels.com/photo/8985457/",
    licence: "Pexels",
  },
  {
    item: "Tim (Staff Photo)",
    author: "Bulat843",
    link: "https://www.pexels.com/photo/38264261/",
    licence: "Pexels",
  },
  {
    item: "About Page Video",
    author: "WeStarMoney Rec",
    link: "https://www.pexels.com/video/cars-competing-on-a-racing-track-10825298/",
    licence: "Pexels",
  },
  {
    item: "Home Hero Photo",
    author: "David Leonard",
    link: "https://unsplash.com/photos/a-group-of-men-standing-next-to-a-blue-sports-car-EZaVE8yFLTQ",
    licence: "Unsplash",
  },
];

// Icon sets -> the set, who made it, the link and the licence
const iconCredits = [
  {
    item: "Font Awesome",
    author: "Fonticons",
    link: "https://fontawesome.com/license/free",
    licence: "CC BY 4.0",
  },
  {
    item: "Material Design Icons",
    author: "Google",
    link: "https://github.com/google/material-design-icons",
    licence: "Apache 2.0",
  },
  {
    item: "Ionicons",
    author: "Ionic",
    link: "https://ionic.io/ionicons",
    licence: "MIT",
  },
  {
    item: "Heroicons",
    author: "Tailwind Labs",
    link: "https://github.com/tailwindlabs/heroicons",
    licence: "MIT",
  },
  {
    item: "Lucide",
    author: "Lucide Contributors",
    link: "https://lucide.dev/",
    licence: "ISC",
  },
  {
    item: "Phosphor Icons",
    author: "Phosphor Icons",
    link: "https://github.com/phosphor-icons/core",
    licence: "MIT",
  },
  {
    item: "Boxicons",
    author: "Atisa",
    link: "https://github.com/atisawd/boxicons",
    licence: "MIT",
  },
  {
    item: "Remix Icon",
    author: "Remix Design",
    link: "https://github.com/Remix-Design/RemixIcon",
    licence: "Apache 2.0",
  },
  {
    item: "Typicons",
    author: "Stephen Hutchings",
    link: "http://s-ings.com/typicons/",
    licence: "CC BY-SA 3.0",
  },
];

// CreditList component -> one card per credit
// Props -> credits: an array of { item, author, link, licence }
function CreditList({ credits }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {credits.map((credit) => (
        <li key={credit.item} className="card p-4">
          <p className="font-semibold">{credit.item}</p>
          <p className="text-muted">
            By {credit.author} ({credit.licence} Licence) ·{" "}
            <a
              href={credit.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link underline"
            >
              Source
            </a>
          </p>
        </li>
      ))}
    </ul>
  );
}

// Credits component -> page heading, then the photo and video credits and the icon credits
export default function Credits() {
  return (
    <section className="my-6">
      <title>Credits - Bob's Garage</title>
      <h1 className="mb-2 text-3xl font-bold">Credits</h1>
      <p className="mb-8 text-muted">
        The Photos, Video and Icons Used on This Site and Who Made Them. Service
        Photos Are Added by the Admin and Belong to Their Owners
      </p>

      <h2 className="mb-4 text-2xl">Photos and Video</h2>
      <CreditList credits={mediaCredits} />

      <h2 className="mt-10 mb-4 text-2xl">Icons</h2>
      <CreditList credits={iconCredits} />
    </section>
  );
}
